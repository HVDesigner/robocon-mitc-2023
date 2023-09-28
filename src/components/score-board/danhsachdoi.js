import React, { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import NavBar from "./navbar";

function DanhSachDoi({ database }) {
  const [list, setList] = useState([]);

  useEffect(() => {
    const starCountRef = ref(database, "danh-sach-cac-doi");

    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      let x = [];
      for (const key in data) {
        if (Object.hasOwnProperty.call(data, key)) {
          const element = data[key];
          x = [...x, element];
        }
      }
      setList(x);
    });
  }, []);

  return (
    <React.Fragment>
      <div className="d-flex mt-3">
        <NavBar />
        <h1
          style={{ fontFamily: "Anton" }}
          className="text-uppercase text-center mb-0 flex-fill"
        >
          Danh sách các đội
        </h1>
      </div>
      <div className="h-100 p-2 flex-fill overflow-auto">
        <div className="border rounded-3 border-2 h-100 p-3 overflow-auto">
          <table className="table table-striped">
            <thead>
              <tr>
                <th></th>
                <th className="w-100">Tên đội</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {list.map((v, k) => (
                <tr>
                  <th className="text-nowrap">{k}</th>
                  <td>{v}</td>
                  <td>0</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </React.Fragment>
  );
}

export default DanhSachDoi;
