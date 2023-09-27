import React from "react";
import CaretRightFill from "./../svgs/caret-right-fill";
import PauseFill from "./../svgs/pause-fill";
import ArrowClockwise from "./../svgs/arrow-clockwise";
import useSound from "use-sound";

import startSfx from "./../assets/sounds/start-sound.mp3";

function ChuanBi({ second = 60, title = "" }) {
  const [play] = useSound(startSfx);
  const [timeLeft, setTimeLeft] = React.useState(second);
  const [isRunning, setIsRunning] = React.useState(false);

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
        <div
          style={{
            letterSpacing: "1rem",
          }}
          className="text-center h-100 m-0 d-flex justify-content-center align-items-center"
        >
          <div style={{ fontSize: "50vh", fontFamily: "Kanit-SemiBold" }}>
            {timeLeft === 60 ? "01" : "00"}
          </div>
          <div style={{ fontSize: "25vh" }}>&#58;</div>
          <div style={{ fontSize: "50vh", fontFamily: "Kanit-SemiBold" }}>
            {timeLeft === 60 ? "00" : timeLeft < 10 ? `0${timeLeft}` : timeLeft}
          </div>
        </div>
        <div className="position-absolute bottom-0 start-0 d-flex gap-2 flex-column p-2 border border-start-0 rounded-end border-2">
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
      </div>
    </React.Fragment>
  );
}

export default ChuanBi;
