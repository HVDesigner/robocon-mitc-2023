import React, { useState } from "react";
import "./ScoreBoard.css";
import BangDiem from "./components/score-board/bangdiem";
import DanhSachCacDoi from "./components/score-board/danhsachdoi";
import LichSu from "./components/score-board/lichsu";

function ScoreBoard({ database }) {
  const [board, setBoard] = useState([
    { title: "Nhiệm vụ 1" },
    { title: "Nhiệm vụ 2" },
    { title: "Nhiệm vụ 3" },
    { title: "Nhiệm vụ 4" },
  ]);

  return (
    <React.Fragment>
      <Layout id="bang-diem">
        <BangDiem />
      </Layout>
      <Layout id="danh-sach-cac-doi">
        <DanhSachCacDoi database={database} />
      </Layout>
      <Layout id="lich-su">
        <LichSu />
      </Layout>
    </React.Fragment>
  );
}

function Layout({ children, id = "" }) {
  return (
    <div
      style={{ height: "100vh", width: "100vw", maxHeight: "100vh" }}
      id={id}
      className="d-flex flex-column"
    >
      {children}
    </div>
  );
}

export default ScoreBoard;
