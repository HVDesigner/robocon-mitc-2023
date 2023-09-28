import React from "react";
import NavBar from "./navbar";

function BangDiem() {
  return (
    <React.Fragment>
      <div className="d-flex mt-3">
        <NavBar />
        <h1
          style={{ fontFamily: "Anton" }}
          className="text-uppercase text-center mb-0 flex-fill"
        >
          Bảng điểm
        </h1>
      </div>
      <div className="h-100 p-2">
        <div className="border rounded-3 border-2 h-100 p-3">
          <table className="table table-striped">
            <thead>
              <tr>
                <th></th>
                <th
                  className="w-50 text-center text-primary h3"
                  style={{ fontFamily: "Kanit-Medium" }}
                >
                  E-MAX45
                </th>
                <th
                  className="w-50 text-center text-danger h3"
                  style={{ fontFamily: "Kanit-Medium" }}
                >
                  DT-45
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th className="text-nowrap">Nhiệm vụ 1</th>
                <td>
                  <div className="d-flex justify-content-center gap-3">
                    <div>
                      <p className="text-center mb-2 fw-semibold">10</p>
                      <div className="d-flex align-items-center gap-1">
                        <span
                          className="badge rounded-pill text-bg-success"
                          role="button"
                        >
                          +10
                        </span>
                      </div>
                    </div>
                    <div className="border-start"></div>
                    <div className="d-flex align-items-center gap-1">
                      <span
                        className="badge rounded-pill text-bg-light"
                        role="button"
                      >
                        +10
                      </span>
                      <span
                        className="badge rounded-pill text-bg-light"
                        role="button"
                      >
                        +10
                      </span>
                    </div>
                  </div>
                </td>
                <td>0</td>
              </tr>
              <tr>
                <th className="text-nowrap">Nhiệm vụ 2</th>
                <td>0</td>
                <td>0</td>
              </tr>
              <tr>
                <th className="text-nowrap">Nhiệm vụ 3</th>
                <td>0</td>
                <td>0</td>
              </tr>
              <tr>
                <th className="text-nowrap">Nhiệm vụ 4</th>
                <td>0</td>
                <td>0</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </React.Fragment>
  );
}

export default BangDiem;
