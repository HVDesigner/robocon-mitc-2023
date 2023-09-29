import React from "react";
// import { ref, onValue } from "firebase/database";

function Scores({ title = "Kết quả", database }) {
  // React.useEffect(() => {
  //   const starCountRef = ref(database, "tran-dau");

  //   onValue(starCountRef, (snapshot) => {
  //     const data = snapshot.val();
  //     console.log(snapshot);
  //     // let x = [];
  //     // for (const key in data) {
  //     //   if (Object.hasOwnProperty.call(data, key)) {
  //     //     const element = data[key];
  //     //     x = [...x, { id: key, name: element }];
  //     //   }
  //     // }
  //   });
  // }, [database]);


  return (
    <React.Fragment>
      <h1
        style={{ fontFamily: "Anton" }}
        className="text-uppercase text-center mt-3 mb-0"
      >
        {title}
      </h1>
      <div className="h-100 position-relative overflow-auto">
        <table className="table table-striped">
          <thead>
            <tr>
              <th></th>
              <th className="w-50 text-center">
                <h3 className="mb-0" style={{ fontFamily: "Kanit-SemiBold" }}>
                  E-MAX45
                </h3>
              </th>
              <th className="w-50 text-center">
                <h3 className="mb-0" style={{ fontFamily: "Kanit-SemiBold" }}>
                  DT-45
                </h3>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="text-nowrap text-end fw-semibold p-3">
                <h5 className="mb-0 fw-bold">Nhiệm vụ 1</h5>
                <small className="text-muted">Nơi khởi nguồn nhịp đập</small>
              </td>
              <td className="w-50 text-center">
                <h5>30</h5>
                <div className="d-flex justify-content-center gap-1">
                  <span className="badge rounded-pill text-bg-success">
                    +10
                  </span>
                  <span className="badge rounded-pill text-bg-success">
                    +10
                  </span>
                  <span className="badge rounded-pill text-bg-success">
                    +10
                  </span>
                </div>
              </td>
              <td className="w-50 text-center">
                <h5>30</h5>
                <div className="d-flex justify-content-center gap-1">
                  <span className="badge rounded-pill text-bg-success">
                    +10
                  </span>
                  <span className="badge rounded-pill text-bg-success">
                    +10
                  </span>
                  <span className="badge rounded-pill text-bg-success">
                    +10
                  </span>
                </div>
              </td>
            </tr>
            <tr>
              <td className="text-nowrap text-end fw-semibold p-3">
                <h5 className="mb-0 fw-bold">Nhiệm vụ 2</h5>
                <small className="text-muted">Ba lần vượt "bão"</small>
              </td>
              <td className="w-50 text-center">
                <h5>45</h5>
                <div className="d-flex justify-content-center gap-1">
                  <span className="badge rounded-pill text-bg-success">
                    +15
                  </span>
                  <span className="badge rounded-pill text-bg-success">
                    +15
                  </span>
                  <span className="badge rounded-pill text-bg-success">
                    +15
                  </span>
                </div>
              </td>
              <td className="w-50 text-center">
                <h5>45</h5>
                <div className="d-flex justify-content-center gap-1">
                  <span className="badge rounded-pill text-bg-success">
                    +15
                  </span>
                  <span className="badge rounded-pill text-bg-success">
                    +15
                  </span>
                  <span className="badge rounded-pill text-bg-success">
                    +15
                  </span>
                </div>
              </td>
            </tr>
            <tr>
              <td className="text-nowrap text-end fw-semibold p-3">
                <h5 className="mb-0 fw-bold">Nhiệm vụ 3</h5>
                <small className="text-muted">Vững bước đi lên</small>
              </td>
              <td className="w-50 text-center">
                <h5>15</h5>
                <div className="d-flex justify-content-center gap-1">
                  <span className="badge rounded-pill text-bg-success">
                    +15
                  </span>
                  <span className="badge rounded-pill text-bg-danger">-15</span>
                  <span className="badge rounded-pill text-bg-success">
                    +15
                  </span>
                </div>
              </td>
              <td className="w-50 text-center">
                <h5>15</h5>
                <div className="d-flex justify-content-center gap-1">
                  <span className="badge rounded-pill text-bg-success">
                    +15
                  </span>
                </div>
              </td>
            </tr>
            <tr>
              <td className="text-nowrap text-end fw-semibold p-3">
                <h5 className="mb-0 fw-bold">Nhiệm vụ 4</h5>
                <small className="text-muted">Vươn mình ra khơi</small>
              </td>
              <td className="w-50 text-center">
                <h5>25</h5>
                <div className="d-flex justify-content-center gap-1">
                  <span className="badge rounded-pill text-bg-success">
                    +25
                  </span>
                </div>
              </td>
              <td className="w-50 text-center">
                <h5>15</h5>
                <div className="d-flex justify-content-center gap-1">
                  <span className="badge rounded-pill text-bg-success">
                    +15
                  </span>
                </div>
              </td>
            </tr>
            <tr>
              <td className="text-nowrap text-end fw-semibold p-3">
                <h5 className="mb-0 fw-bold">Kết quả</h5>
              </td>
              <td className="w-50 text-center p-3">
                <h5
                  className="mb-0 fw-bold text-uppercase text-danger"
                  style={{ fontFamily: "Kanit-SemiBold" }}
                >
                  Ra khơi
                </h5>
                <small className="fw-semibold text-muted">
                  Chiến thắng tuyệt đối
                </small>
              </td>
              <td className="w-50 text-center"></td>
            </tr>
          </tbody>
        </table>
      </div>
    </React.Fragment>
  );
}

export default Scores;
