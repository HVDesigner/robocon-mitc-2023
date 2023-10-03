import React from "react";
import CaretRightFill from "./../svgs/caret-right-fill";
import PauseFill from "./../svgs/pause-fill";
import ArrowClockwise from "./../svgs/arrow-clockwise";
import useSound from "use-sound";
import Progress from "./progress";

import startSfx from "./../assets/sounds/start-sound.mp3";
import warningSfx from "./../assets/sounds/warning-sound.mp3";

import Logo from "./../assets/images/logo.png";

function ChuanBi({ second = 60, title = "" }) {
  const [play] = useSound(startSfx);
  const [warning] = useSound(warningSfx);
  const [timeLeft, setTimeLeft] = React.useState(second);
  const [isRunning, setIsRunning] = React.useState(false);

  React.useEffect(() => {
    if ((timeLeft < 5 || timeLeft === 5) && timeLeft > 0) {
      warning();
    }
  }, [warning, timeLeft]);

  React.useEffect(() => {
    if (timeLeft === 0) {
      play();
    }
  }, [play, timeLeft]);

  React.useEffect(() => {
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
        <tr>
          <td
            className="text-primary border-3 border-dark"
            style={{
              fontFamily: "Kanit-Bold",
              width: "30vw",
              maxWidth: "30vw",
            }}
          >
            <h2 className="mb-0 text-white">0</h2>
            <h1
              style={{ fontSize: "10vh" }}
              className="fw-bold mb-0 text-white"
            >
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
          <td
            className="text-danger border-3 border-dark"
            style={{
              fontFamily: "Kanit-Bold",
              width: "30vw",
              maxWidth: "30vw",
            }}
          >
            <h2 className="mb-0 text-white">0</h2>
            <h1
              style={{ fontSize: "10vh" }}
              className="fw-bold mb-0 text-white"
            >
              0
            </h1>
          </td>
        </tr>
        <tr className="h-100">
          <td className="w-100 position-relative" colSpan={3}>
            <div
              style={{
                letterSpacing: "1rem",
                lineHeight: 1,
              }}
              className="text-center h-100 m-0 d-flex justify-content-center align-items-center"
            >
              <div className="fw-bold" style={{ fontSize: "50vh" }}>
                {timeLeft === 60 ? "01" : "00"}
              </div>
              <div className="fw-bold" style={{ fontSize: "25vh" }}>
                &#58;
              </div>
              <div className="fw-bold" style={{ fontSize: "50vh" }}>
                {timeLeft === 60
                  ? "00"
                  : timeLeft < 10
                  ? `0${timeLeft}`
                  : timeLeft}
              </div>
            </div>
            <div className="position-absolute top-50 start-0 translate-middle-y d-flex gap-2 flex-column p-2 border border-start-0 rounded-end border-2">
              {second > timeLeft ? (
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
              <Progress />
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  );
}

export default ChuanBi;
