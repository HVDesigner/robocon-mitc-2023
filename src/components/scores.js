import React from "react";
import { ref, onValue } from "firebase/database";
import Logo from "./../assets/images/logo.png";
import Progress from "./progress";

function Scores({ title = "Kết quả", database }) {
  const [match, setMatch] = React.useState({});
  const [loadMatch, setLoadMatch] = React.useState(true);
  const [hasMatch, setHasMatch] = React.useState(false);

  React.useEffect(() => {
    const indexRef = ref(database, "tran-dau-gan-day");

    onValue(indexRef, (snapshot) => {
      const data = snapshot.val();
      setMatch(data);
      setHasMatch(data != null ? true : false);
      setLoadMatch(false);
    });
  }, [database]);

  return (
    <div className="overflow-auto h-100">
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
              {loadMatch ? (
                ""
              ) : hasMatch ? (
                <React.Fragment>
                  <h2 className="mb-0 text-center">
                    {match["blue-team"].name}
                  </h2>
                  <h1
                    style={{ fontSize: "10vh" }}
                    className="fw-bold mb-0 text-center"
                  >
                    {match["blue-team"].mission1.point +
                      match["blue-team"].mission2.point +
                      match["blue-team"].mission3.point +
                      match["blue-team"].mission4.point +
                      match["blue-team"].VOR.point}
                    {match["blue-team"].mission4.point === 25 ? (
                      <span>
                        <span className="text-muted">&nbsp;/&nbsp;</span>RA KHƠI
                      </span>
                    ) : (
                      ""
                    )}
                  </h1>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <h2 className="mb-0 text-white">0</h2>
                  <h1
                    style={{ fontSize: "10vh" }}
                    className="fw-bold mb-0 text-white"
                  >
                    0
                  </h1>
                </React.Fragment>
              )}
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
              {loadMatch ? (
                ""
              ) : hasMatch ? (
                <React.Fragment>
                  <h2 className="mb-0 text-center">{match["red-team"].name}</h2>
                  <h1
                    style={{ fontSize: "10vh" }}
                    className="fw-bold mb-0 text-center"
                  >
                    {match["red-team"].mission1.point +
                      match["red-team"].mission2.point +
                      match["red-team"].mission3.point +
                      match["red-team"].mission4.point +
                      match["red-team"].VOR.point}
                    {match["red-team"].mission4.point === 25 ? (
                      <span>
                        <span className="text-muted">&nbsp;/&nbsp;</span>RA KHƠI
                      </span>
                    ) : (
                      ""
                    )}
                  </h1>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <h2 className="mb-0 text-white">0</h2>
                  <h1
                    style={{ fontSize: "10vh" }}
                    className="fw-bold mb-0 text-white"
                  >
                    0
                  </h1>
                </React.Fragment>
              )}
            </td>
          </tr>
          <tr className="h-100">
            <td className="w-100 position-relative overflow-auto" colSpan={3}>
              {loadMatch ? (
                ""
              ) : hasMatch ? (
                <table className="table table-striped overflow-auto mb-0">
                  <thead>
                    <tr>
                      <th></th>
                      <th className="w-50 text-center">
                        <h3
                          className="mb-0 text-primary"
                          style={{ fontFamily: "Kanit-SemiBold" }}
                        >
                          {match["blue-team"].name}
                        </h3>
                      </th>
                      <th className="w-50 text-center">
                        <h3
                          className="mb-0 text-danger"
                          style={{ fontFamily: "Kanit-SemiBold" }}
                        >
                          {match["red-team"].name}
                        </h3>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="text-nowrap text-end fw-semibold p-3">
                        <h5 className="mb-0 fw-bold">Nhiệm vụ 1</h5>
                        <small className="text-muted">
                          Nơi khởi nguồn nhịp đập
                        </small>
                      </td>
                      <td className="w-50 text-center">
                        <h5>{match["blue-team"].mission1.point}</h5>
                        <Mission1
                          history={match["blue-team"].mission1.history}
                        />
                      </td>
                      <td className="w-50 text-center">
                        <h5>{match["red-team"].mission1.point}</h5>
                        <Mission1
                          history={match["red-team"].mission1.history}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td className="text-nowrap text-end fw-semibold p-3">
                        <h5 className="mb-0 fw-bold">Nhiệm vụ 2</h5>
                        <small className="text-muted">Ba lần vượt "bão"</small>
                      </td>
                      <td className="w-50 text-center">
                        <h5>{match["blue-team"].mission2.point}</h5>
                        <Mission2
                          history={match["blue-team"].mission2.history}
                        />
                      </td>
                      <td className="w-50 text-center">
                        <h5>{match["red-team"].mission2.point}</h5>
                        <Mission2
                          history={match["red-team"].mission2.history}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td className="text-nowrap text-end fw-semibold p-3">
                        <h5 className="mb-0 fw-bold">Nhiệm vụ 3</h5>
                        <small className="text-muted">Vững bước đi lên</small>
                      </td>
                      <td className="w-50 text-center">
                        <h5>{match["blue-team"].mission3.point}</h5>
                        <Mission3
                          history={match["blue-team"].mission3.history}
                        />
                      </td>
                      <td className="w-50 text-center">
                        <h5>{match["red-team"].mission3.point}</h5>
                        <Mission3
                          history={match["red-team"].mission3.history}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td className="text-nowrap text-end fw-semibold p-3">
                        <h5 className="mb-0 fw-bold">Nhiệm vụ 4</h5>
                        <small className="text-muted">Vươn mình ra khơi</small>
                      </td>
                      <td className="w-50 text-center">
                        <h5>{match["blue-team"].mission4.point}</h5>
                        <Mission4
                          history={match["blue-team"].mission4.history}
                        />
                      </td>
                      <td className="w-50 text-center">
                        <h5>{match["red-team"].mission4.point}</h5>
                        <Mission4
                          history={match["red-team"].mission4.history}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td className="text-nowrap text-end fw-semibold p-3">
                        <h5 className="mb-0 fw-bold">Phạm quy</h5>
                      </td>
                      <td className="w-50 text-center">
                        <h5>{match["blue-team"].VOR.point}</h5>
                        <ViolationOfRules
                          history={match["blue-team"].VOR.history}
                        />
                      </td>
                      <td className="w-50 text-center">
                        <h5>{match["red-team"].VOR.point}</h5>
                        <ViolationOfRules
                          history={match["red-team"].VOR.history}
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              ) : (
                <h1
                  style={{ fontFamily: "Anton" }}
                  className="text-uppercase text-center text-primary mt-3 mb-0"
                >
                  Chưa diễn ra trận đấu nào
                </h1>
              )}
            </td>
          </tr>
          <tr>
            <td colSpan={3} className="border-3 border-dark">
              <div className="d-flex justify-content-center align-items-end h-100">
                <Progress now="100%" />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

function changeToArr(data) {
  let x = [];
  for (const key in data) {
    if (Object.hasOwnProperty.call(data, key)) {
      const element = data[key];
      if (element.status === "active") {
        x = [...x, { ...element, id: key }];
      }
    }
  }
  return x;
}

function Mission1_({ history = {} }) {
  return (
    <div className="d-flex justify-content-center gap-1">
      {changeToArr(history).map((v) => (
        <span key={v.id} className="badge rounded-pill text-bg-success">
          +10
        </span>
      ))}
    </div>
  );
}

const Mission1 = React.memo(Mission1_);

function Mission2_({ history = {} }) {
  return (
    <div className="d-flex justify-content-center gap-1">
      {changeToArr(history).map((v) => (
        <span key={v.id} className="badge rounded-pill text-bg-success">
          +15
        </span>
      ))}
    </div>
  );
}

const Mission2 = React.memo(Mission2_);

function Mission3_({ history = {} }) {
  return (
    <div className="d-flex justify-content-center gap-1">
      {changeToArr(history).map((v) => (
        <span
          key={v.id}
          className={`badge rounded-pill text-bg-${
            v.type === "positive" ? "success" : "danger"
          }`}
        >
          {v.type === "positive" ? "+" : "-"}15
        </span>
      ))}
    </div>
  );
}

const Mission3 = React.memo(Mission3_);

function Mission4_({ history = {} }) {
  return (
    <div className="d-flex justify-content-center gap-1">
      {changeToArr(history).map((v) => (
        <span
          key={v.id}
          className={`badge rounded-pill text-bg-${
            v.type === "winner" ? "warning" : "success"
          }`}
        >
          {v.type === "winner" ? "RA KHƠI" : "+15"}
        </span>
      ))}
    </div>
  );
}

const Mission4 = React.memo(Mission4_);

function ViolationOfRules_({ history = {} }) {
  return (
    <div className="d-flex justify-content-center gap-1">
      {changeToArr(history).map((v) => (
        <span key={v.id} className="badge rounded-pill text-bg-danger">
          {`${v.point}`}
        </span>
      ))}
    </div>
  );
}

const ViolationOfRules = React.memo(ViolationOfRules_);

export default Scores;
