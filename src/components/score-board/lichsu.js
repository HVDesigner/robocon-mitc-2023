import React from "react";
import NavBar from "./navbar";

function LichSu() {
  return (
    <React.Fragment>
      <div className="d-flex mt-3">
        <NavBar />
        <h1
          style={{ fontFamily: "Anton" }}
          className="text-uppercase text-center mb-0 flex-fill"
        >
          Lịch sử trận
        </h1>
      </div>
    </React.Fragment>
  );
}

export default LichSu;
