import React, { useEffect, useState } from "react";
import CaretRightFill from "./../svgs/caret-right-fill";
import PauseFill from "./../svgs/pause-fill";
import ArrowClockwise from "./../svgs/arrow-clockwise";
import useSound from "use-sound";
import { ref, onValue } from "firebase/database";
import Spinner from "react-bootstrap/Spinner";
import Progress from "./../components/progress";

import startSfx from "./../assets/sounds/start-sound.mp3";
import warningSfx from "./../assets/sounds/warning-sound.mp3";

import Logo from "./../assets/images/logo.png";

function ThiDau({ database, title = "Thi đấu", second = 300 }) {
  const [play] = useSound(startSfx);
  const [warning] = useSound(warningSfx);
  const [timeLeft, setTimeLeft] = React.useState(second);
  const [isRunning, setIsRunning] = React.useState(false);

  useEffect(() => {
    if ((timeLeft === 20 || timeLeft <= 10) && timeLeft !== 0) {
      warning();
    }
  }, [warning, timeLeft]);

  useEffect(() => {
    if (timeLeft === 0) {
      play();
    }
  }, [play, timeLeft]);

  useEffect(() => {
    let timerInterval;
    // Kiểm tra nếu thời gian đã hết

    if (timeLeft === 0) {
      setIsRunning(false);
    }

    // Tạo một interval để giảm thời gian còn lại đi 1 giây sau mỗi giây
    if (isRunning) {
      timerInterval = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else {
      clearInterval(timerInterval);
    }

    // Hủy interval khi component bị unmount hoặc khi thời gian hết
    return () => {
      clearInterval(timerInterval);
    };
  }, [timeLeft, isRunning]);

  const restartCountdown = () => {
    setTimeLeft(second);
  };

  return (
    <table className="table mb-0" style={{ height: "100vh" }}>
      <tbody>
        <Top title={title} database={database} />
        <tr className="h-100">
          <td className="w-100 position-relative" colSpan={3}>
            <div
              style={{
                letterSpacing: "1rem",
              }}
              className="text-center h-100 w-100 m-0 d-flex justify-content-center align-items-center"
            >
              <div
                style={{ fontSize: "50vh", lineHeight: 1 }}
                className="fw-bold d-flex align-items-center"
              >
                {timeLeft / 60 < 10
                  ? `0${Math.floor(timeLeft / 60)}`
                  : Math.floor(timeLeft / 60)}
                <div style={{ fontSize: "25vh" }}>&#58;</div>
                {timeLeft % 60 < 10 ? `0${timeLeft % 60}` : timeLeft % 60}
              </div>
            </div>
            <div className="position-absolute top-50 start-0 translate-middle-y d-flex gap-2 flex-column p-2 border border-start-0 rounded-end border-2">
              {timeLeft < second ? (
                <ArrowClockwise
                  height={20}
                  width={20}
                  role={"button"}
                  onClick={restartCountdown}
                />
              ) : (
                ""
              )}
              <span className="d-flex">
                {isRunning ? (
                  <PauseFill
                    height={20}
                    width={20}
                    role={"button"}
                    onClick={() => setIsRunning(false)}
                  />
                ) : (
                  <CaretRightFill
                    height={20}
                    width={20}
                    role={"button"}
                    onClick={() => setIsRunning(true)}
                  />
                )}
              </span>
            </div>
          </td>
        </tr>
        <tr>
          <td colSpan={3} className="border-3 border-dark">
            <div className="d-flex justify-content-center align-items-end h-100">
              <Progress now="50%" />
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  );
}

function Top({ database, title = "" }) {
  const [match, setMatch] = useState({});
  const [loading, setLoading] = useState(true);
  const [hasMatch, setHasMatch] = useState(true);

  useEffect(() => {
    const matchRef = ref(database, "tran-dau");

    onValue(matchRef, (snapshot) => {
      const data = snapshot.val();
      setHasMatch(data ? true : false);
      setMatch(data);
      setLoading(false);
    });
  }, [database]);

  if (loading) {
    return (
      <tr>
        <td colSpan={3} className="border-3 border-dark">
          <div className="d-flex justify-content-center align-items-center p-3">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        </td>
      </tr>
    );
  }

  if (!hasMatch) {
    return (
      <tr>
        <td
          colSpan={2}
          className="text-primary border-3 border-dark"
          style={{ fontFamily: "Kanit-Bold" }}
        >
          <h2 className="mb-0 text-center text-primary text-uppercase">
            Chưa có trận đấu
          </h2>
          <h1 style={{ fontSize: "10vh" }} className="fw-bold mb-0 text-white">
            0
          </h1>
        </td>
        <td className="border-3 border-dark">
          <div className="d-flex gap-2 flex-column align-items-center">
            <h1
              style={{ fontFamily: "Anton" }}
              className="text-uppercase text-center mt-3 mb-0"
            >
              {title}
            </h1>
            <img style={{ maxHeight: "40px" }} src={Logo} alt="logo" />
          </div>
        </td>
      </tr>
    );
  }

  return (
    <tr>
      <td
        className="text-primary border-3 border-dark"
        style={{ fontFamily: "Kanit-Bold", width: "30vw", maxWidth: "30vw" }}
      >
        <h2 className="mb-0 text-center">{match["blue-team"].name}</h2>
        <h1 style={{ fontSize: "10vh" }} className="fw-bold mb-0 text-center">
          {match["blue-team"].mission1.point +
            match["blue-team"].mission2.point +
            match["blue-team"].mission3.point +
            match["blue-team"].mission4.point +
            match["blue-team"].VOR.point}
          {match["blue-team"].mission4.point === 25 ? (
            <span>
              <span className="text-muted">&nbsp;/&nbsp;</span>RA KHƠI
            </span>
          ) : (
            ""
          )}
        </h1>
      </td>
      <td className="border-3 border-dark">
        <div className="d-flex gap-2 flex-column align-items-center">
          <h1
            style={{ fontFamily: "Anton" }}
            className="text-uppercase text-center mt-3 mb-0"
          >
            {title}
          </h1>
          <img style={{ maxHeight: "40px" }} src={Logo} alt="logo" />
        </div>
      </td>
      <td
        className="text-danger border-3 border-dark"
        style={{ fontFamily: "Kanit-Bold", width: "30vw", maxWidth: "30vw" }}
      >
        <h2 className="mb-0 text-center">{match["red-team"].name}</h2>
        <h1 style={{ fontSize: "10vh" }} className="fw-bold mb-0 text-center">
          {match["red-team"].mission1.point +
            match["red-team"].mission2.point +
            match["red-team"].mission3.point +
            match["red-team"].mission4.point +
            match["red-team"].VOR.point}
          {match["red-team"].mission4.point === 25 ? (
            <span>
              <span className="text-muted">&nbsp;/&nbsp;</span>RA KHƠI
            </span>
          ) : (
            ""
          )}
        </h1>
      </td>
    </tr>
  );
}

export default ThiDau;
