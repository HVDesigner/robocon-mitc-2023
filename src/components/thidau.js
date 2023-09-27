import React from "react";
import CaretRightFill from "./../svgs/caret-right-fill";
import PauseFill from "./../svgs/pause-fill";
import ArrowClockwise from "./../svgs/arrow-clockwise";
import useSound from "use-sound";

import startSfx from "./../assets/sounds/start-sound.mp3";
import warningSfx from "./../assets/sounds/warning-sound.mp3";

function ThiDau({ title = "Thi đấu", second = 300 }) {
  const [play] = useSound(startSfx);
  const [warning] = useSound(warningSfx);
  const [timeLeft, setTimeLeft] = React.useState(second);
  const [isRunning, setIsRunning] = React.useState(false);

  React.useEffect(() => {
    if (
      (timeLeft === 30 || timeLeft === 20 || timeLeft <= 10) &&
      timeLeft !== 0
    ) {
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
    <React.Fragment>
      <h1
        style={{ fontFamily: "Anton" }}
        className="text-uppercase text-center mt-3 mb-0"
      >
        {title}
      </h1>
      <div className="h-100 position-relative">
        <div className="position-absolute top-0 start-50 translate-middle-x w-75 d-flex justify-content-between">
          <div>
            <h1
              style={{ fontFamily: "Kanit-Bold" }}
              className="text-uppercase text-center mt-3 mb-0 text-primary"
            >
              E-MAX45
            </h1>
          </div>
          <div>
            <h1
              style={{ fontFamily: "Kanit-Bold" }}
              className="text-uppercase text-center mt-3 mb-0 text-danger"
            >
              DT-45
            </h1>
          </div>
        </div>
        <div
          style={{
            letterSpacing: "1rem",
          }}
          className="text-center h-100 m-0 d-flex justify-content-center align-items-center"
        >
          <div style={{ fontSize: "50vh", fontFamily: "Kanit-SemiBold" }}>
            {timeLeft / 60 < 10
              ? `0${Math.floor(timeLeft / 60)}`
              : Math.floor(timeLeft / 60)}
          </div>
          <div style={{ fontSize: "25vh" }}>&#58;</div>
          <div style={{ fontSize: "50vh", fontFamily: "Kanit-SemiBold" }}>
            {timeLeft % 60 < 10 ? `0${timeLeft % 60}` : timeLeft % 60}
          </div>
        </div>
        <div className="position-absolute bottom-0 start-0 d-flex gap-2 flex-column p-2 border border-start-0 rounded-end border-2">
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
      </div>
    </React.Fragment>
  );
}

export default ThiDau;
