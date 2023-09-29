import React from "react";
import "./ScoreBoard.css";
import BangDiem from "./components/score-board/bangdiem";
import DanhSachCacDoi from "./components/score-board/danhsachdoi";
import LichSu from "./components/score-board/lichsu";

function ScoreBoard({ database }) {
  return (
    <React.Fragment>
      <Layout id="bang-diem">
        <BangDiem database={database} />
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
      className="d-flex flex-column bg-light"
    >
      {children}
    </div>
  );
}

export default ScoreBoard;
