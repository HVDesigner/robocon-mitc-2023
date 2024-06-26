import React, { useEffect } from "react";
import "./App.css";
import ChuanBi from "./components/chuanbi";
import ThiDau from "./components/thidau";
import Scores from "./components/scores";

function App({ database }) {
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === "1") {
        // Chuyển hướng khi nhấn phím số 1
        window.location.href = "/#chuanbi";
      } else if (event.key === "2") {
        // Chuyển hướng khi nhấn phím số 2
        window.location.href = "/#thidau";
      } else if (event.key === "3") {
        // Chuyển hướng khi nhấn phím số 3
        window.location.href = "/#ketthuc";
      }
    };

    document.addEventListener("keydown", handleKeyPress);
  }, []);

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        maxHeight: "100vh",
        maxWidth: "100vw",
      }}
    >
      <Layout id="chuanbi">
        <ChuanBi title="Thời gian chuẩn bị" />
      </Layout>
      <Layout id="thidau">
        <ThiDau database={database} />
      </Layout>
      <Layout id="ketthuc">
        <Scores database={database} />
      </Layout>
    </div>
  );
}

function Layout({ children, id = "chuanbi" }) {
  return (
    <div
      id={id}
      className="d-flex flex-column overflow-auto"
      style={{ maxHeight: "100vh", height: "100vh" }}
    >
      {children}
    </div>
  );
}

export default App;
