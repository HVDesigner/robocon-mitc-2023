import React, { useState } from "react";
import NavBar from "./navbar";
import { ref, onValue, set, update } from "firebase/database";
import Form from "react-bootstrap/Form";
import Spinner from "react-bootstrap/Spinner";

function BangDiem({ database }) {
  const [hasMatch, setHasMatch] = useState(false);
  const [teams, setTeams] = useState([]);
  const [match, setMatch] = useState({});

  const [loadTeam, setLoadTeam] = useState(true);
  const [loadMatch, setLoadMatch] = useState(true);

  React.useEffect(() => {
    const teamsRef = ref(database, "danh-sach-cac-doi");

    onValue(teamsRef, (snapshot) => {
      const data = snapshot.val();
      let x = [];

      for (const key in data) {
        if (Object.hasOwnProperty.call(data, key)) {
          const element = data[key];
          x = [...x, { id: key, name: element }];
        }
      }
      setTeams(x);
      setLoadTeam(false);
    });
  }, [database]);

  React.useEffect(() => {
    const matchRef = ref(database, "tran-dau");

    onValue(matchRef, (snapshot) => {
      const data = snapshot.val();
      setHasMatch(data ? true : false);

      setMatch(data);
      setLoadMatch(false);
    });
  }, [database]);

  const onSubmit = (e) => {
    e.preventDefault();

    if (
      e.target.blue.value &&
      e.target.red.value &&
      e.target.red.value !== e.target.blue.value
    ) {
      set(ref(database, "tran-dau"), {
        "blue-team": {
          mission1: { history: {}, point: 0 },
          mission2: { history: {}, point: 0 },
          mission3: { history: {}, point: 0 },
          mission4: { history: {}, point: 0 },
          name: e.target.blue.value,
        },
        "red-team": {
          mission1: { history: {}, point: 0 },
          mission2: { history: {}, point: 0 },
          mission3: { history: {}, point: 0 },
          mission4: { history: {}, point: 0 },
          name: e.target.red.value,
        },
      });
    }
  };

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
        <div className="border rounded-3 border-2 h-100 p-3 bg-white">
          {loadMatch ? (
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          ) : hasMatch ? (
            <React.Fragment>
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th></th>
                    <th
                      className="w-50 text-center text-primary h3"
                      style={{ fontFamily: "Kanit-Medium" }}
                    >
                      {match["blue-team"].name}
                    </th>
                    <th
                      className="w-50 text-center text-danger h3"
                      style={{ fontFamily: "Kanit-Medium" }}
                    >
                      {match["red-team"].name}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th className="text-nowrap">Nhiệm vụ 1</th>
                    <td>
                      <Mission1Point
                        point={match["blue-team"].mission1.point}
                        history={match["blue-team"].mission1.history}
                        team={"blue-team"}
                        database={database}
                      />
                    </td>
                    <td>
                      <Mission1Point
                        point={match["red-team"].mission1.point}
                        history={match["red-team"].mission1.history}
                        team={"red-team"}
                        database={database}
                      />
                    </td>
                  </tr>
                  <tr>
                    <th className="text-nowrap">Nhiệm vụ 2</th>
                    <td>
                      <Mission2Point
                        point={match["blue-team"].mission2.point}
                        history={match["blue-team"].mission2.history}
                        team={"blue-team"}
                        database={database}
                      />
                    </td>
                    <td>
                      <Mission2Point
                        point={match["red-team"].mission2.point}
                        history={match["red-team"].mission2.history}
                        team={"red-team"}
                        database={database}
                      />
                    </td>
                  </tr>
                  <tr>
                    <th className="text-nowrap">Nhiệm vụ 3</th>
                    <td>
                      <Mission3Point
                        point={match["blue-team"].mission3.point}
                        history={match["blue-team"].mission3.history}
                        team={"blue-team"}
                        database={database}
                      />
                    </td>
                    <td>
                      <Mission3Point
                        point={match["red-team"].mission3.point}
                        history={match["red-team"].mission3.history}
                        team={"red-team"}
                        database={database}
                      />
                    </td>
                  </tr>
                  <tr>
                    <th className="text-nowrap">Nhiệm vụ 4</th>
                    <td>
                      <Mission4Point
                        point={match["blue-team"].mission4.point}
                        history={match["blue-team"].mission4.history}
                        team={"blue-team"}
                        database={database}
                      />
                    </td>
                    <td>
                      <Mission4Point
                        point={match["red-team"].mission4.point}
                        history={match["red-team"].mission4.history}
                        team={"red-team"}
                        database={database}
                      />
                    </td>
                  </tr>
                  <tr>
                    <th className="text-nowrap">Phạm quy</th>
                    <td>
                      <ViolationOfRules
                        point={match["blue-team"].mission4.point}
                        history={match["blue-team"].mission4.history}
                        team={"blue-team"}
                        database={database}
                      />
                    </td>
                    <td>
                      <ViolationOfRules
                        point={match["red-team"].mission4.point}
                        history={match["red-team"].mission4.history}
                        team={"red-team"}
                        database={database}
                      />
                    </td>
                  </tr>
                  <tr>
                    <th className="text-nowrap">Kết quả</th>
                    <td>
                      <p className="mb-0 text-center fw-semibold">
                        {match["blue-team"].mission1.point +
                          match["blue-team"].mission2.point +
                          match["blue-team"].mission3.point +
                          match["blue-team"].mission4.point}
                      </p>
                    </td>
                    <td>
                      <p className="mb-0 text-center fw-semibold">
                        {match["red-team"].mission1.point +
                          match["red-team"].mission2.point +
                          match["red-team"].mission3.point +
                          match["red-team"].mission4.point}
                      </p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </React.Fragment>
          ) : (
            <form
              className="d-flex flex-column gap-3 align-items-center"
              onSubmit={onSubmit}
            >
              <div className="d-flex gap-3 w-100">
                <div className="w-100 d-flex flex-column align-items-center">
                  <h3
                    className="text-center text-primary"
                    style={{ fontFamily: "Kanit-Medium" }}
                  >
                    Đội xanh
                  </h3>
                  {loadTeam ? (
                    <Spinner animation="border" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </Spinner>
                  ) : (
                    <Form.Select style={{ boxShadow: "none" }} name="blue">
                      <option value={""}>Chọn đội xanh</option>
                      {teams.map((v) => (
                        <option key={v.id} value={v.name}>
                          {v.name}
                        </option>
                      ))}
                    </Form.Select>
                  )}
                </div>
                <div className="w-100 d-flex flex-column align-items-center">
                  <h3
                    className="text-center text-danger"
                    style={{ fontFamily: "Kanit-Medium" }}
                  >
                    Đội đỏ
                  </h3>
                  {loadTeam ? (
                    <Spinner animation="border" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </Spinner>
                  ) : (
                    <Form.Select style={{ boxShadow: "none" }} name="red">
                      <option value={""}>Chọn đội đỏ</option>
                      {teams.map((v) => (
                        <option key={v.id} value={v.name}>
                          {v.name}
                        </option>
                      ))}
                    </Form.Select>
                  )}
                </div>
              </div>
              <div>
                <button type="submit" className="btn btn-primary fw-semibold">
                  Tạo trận
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </React.Fragment>
  );
}

function Mission1Point({ point = 0, history = {}, team = "", database }) {
  const [historyList, setHistoryList] = useState([]);

  React.useEffect(() => {
    let x = [];
    for (const key in history) {
      if (Object.hasOwnProperty.call(history, key)) {
        const element = history[key];

        if (element.status === "active") {
          x = [...x, { ...element, id: key }];
        }
      }
    }
    setHistoryList(x);
  }, [history]);

  const onClickPoint = () => {
    update(ref(database), {
      [`tran-dau/${team}/mission1/point`]: parseInt(point) + 10,
      [`tran-dau/${team}/mission1/history/${Date.now()}/point`]: 10,
      [`tran-dau/${team}/mission1/history/${Date.now()}/status`]: "active",
    });
  };

  const onRemovePoint = (id) => {
    update(ref(database), {
      [`tran-dau/${team}/mission1/point`]: parseInt(point) - 10,
      [`tran-dau/${team}/mission1/history/${id}/status`]: "remove",
    });
  };

  return (
    <div className="d-flex justify-content-center gap-3">
      <div>
        <p className="text-center mb-0 fw-semibold">{point}</p>
        <div className="d-flex align-items-center gap-1">
          {historyList.map((v) => (
            <span
              key={v.id}
              className="badge rounded-pill text-bg-success mt-2"
              role="button"
              onClick={() => onRemovePoint(v.id)}
            >
              +{v.point}
            </span>
          ))}
        </div>
      </div>
      <div
        className={`border-start border-secondary border-3 ${
          historyList.length >= 3 ? "d-none" : ""
        }`}
      ></div>
      <div
        className={`d-flex align-items-center gap-1 ${
          historyList.length >= 3 ? "d-none" : ""
        }`}
      >
        <span
          className="badge rounded-pill text-bg-light"
          role="button"
          onClick={onClickPoint}
        >
          +10
        </span>
      </div>
    </div>
  );
}

function Mission2Point({ point = 0, history = {}, team = "", database }) {
  const [historyList, setHistoryList] = useState([]);

  React.useEffect(() => {
    let x = [];
    for (const key in history) {
      if (Object.hasOwnProperty.call(history, key)) {
        const element = history[key];

        if (element.status === "active") {
          x = [...x, { ...element, id: key }];
        }
      }
    }
    setHistoryList(x);
  }, [history]);

  const onClickPoint = () => {
    update(ref(database), {
      [`tran-dau/${team}/mission2/point`]: parseInt(point) + 15,
      [`tran-dau/${team}/mission2/history/${Date.now()}/point`]: 15,
      [`tran-dau/${team}/mission2/history/${Date.now()}/status`]: "active",
    });
  };

  const onRemovePoint = (id) => {
    update(ref(database), {
      [`tran-dau/${team}/mission2/point`]: parseInt(point) - 15,
      [`tran-dau/${team}/mission2/history/${id}/status`]: "remove",
    });
  };

  return (
    <div className="d-flex justify-content-center gap-3">
      <div>
        <p className="text-center mb-0 fw-semibold">{point}</p>
        <div className="d-flex align-items-center gap-1">
          {historyList.map((v) => (
            <span
              key={v.id}
              className="badge rounded-pill text-bg-success mt-2"
              role="button"
              onClick={() => onRemovePoint(v.id)}
            >
              +{v.point}
            </span>
          ))}
        </div>
      </div>
      <div
        className={`border-start border-secondary border-3 ${
          historyList.length >= 3 ? "d-none" : ""
        }`}
      ></div>
      <div
        className={`d-flex align-items-center gap-1 ${
          historyList.length >= 3 ? "d-none" : ""
        }`}
      >
        <span
          className="badge rounded-pill text-bg-light"
          role="button"
          onClick={onClickPoint}
        >
          +15
        </span>
      </div>
    </div>
  );
}

function Mission3Point({ point = 0, history = {}, team = "", database }) {
  const [historyList, setHistoryList] = useState([]);

  React.useEffect(() => {
    let x = [];
    for (const key in history) {
      if (Object.hasOwnProperty.call(history, key)) {
        const element = history[key];

        if (element.status === "active") {
          x = [...x, { ...element, id: key }];
        }
      }
    }
    setHistoryList(x);
  }, [history]);

  const onClickPoint = (type, p) => {
    update(ref(database), {
      [`tran-dau/${team}/mission3/point`]: p,
      [`tran-dau/${team}/mission3/history/${Date.now()}/point`]: 15,
      [`tran-dau/${team}/mission3/history/${Date.now()}/status`]: "active",
      [`tran-dau/${team}/mission3/history/${Date.now()}/type`]: type,
    });
  };

  const onRemovePoint = (id, type) => {
    update(ref(database), {
      [`tran-dau/${team}/mission3/point`]:
        type === "positive" ? parseInt(point) - 15 : parseInt(point) + 15,
      [`tran-dau/${team}/mission3/history/${id}/status`]: "remove",
    });
  };

  return (
    <div className="d-flex justify-content-center gap-3">
      <div>
        <p className="text-center mb-0 fw-semibold">{point}</p>
        <div className="d-flex align-items-center gap-1">
          {historyList.map((v) => (
            <span
              key={v.id}
              className={`badge rounded-pill text-bg-${
                v.type === "positive" ? "success" : "danger"
              } mt-2`}
              role="button"
              onClick={() => onRemovePoint(v.id, v.type)}
            >
              {`${v.type === "positive" ? "+" : "-"}${v.point}`}
            </span>
          ))}
        </div>
      </div>
      <div className={`border-start border-secondary border-3`}></div>
      <div className={`d-flex align-items-center gap-1`}>
        <span
          className="badge rounded-pill text-bg-light"
          role="button"
          onClick={() => onClickPoint("positive", parseInt(point) + 15)}
        >
          +15
        </span>
        <span
          className="badge rounded-pill text-bg-danger"
          role="button"
          onClick={() => onClickPoint("negative", parseInt(point) - 15)}
        >
          -15
        </span>
      </div>
    </div>
  );
}

function Mission4Point({ point = 0, history = {}, team = "", database }) {
  const [historyList, setHistoryList] = useState([]);

  React.useEffect(() => {
    let x = [];
    for (const key in history) {
      if (Object.hasOwnProperty.call(history, key)) {
        const element = history[key];

        if (element.status === "active") {
          x = [...x, { ...element, id: key }];
        }
      }
    }
    setHistoryList(x);
  }, [history]);

  const onClickPoint = (type, p) => {
    update(ref(database), {
      [`tran-dau/${team}/mission4/point`]: p,
      [`tran-dau/${team}/mission4/history/${Date.now()}/point`]: p,
      [`tran-dau/${team}/mission4/history/${Date.now()}/status`]: "active",
      [`tran-dau/${team}/mission4/history/${Date.now()}/type`]: type,
    });
  };

  const onRemovePoint = (id, type) => {
    update(ref(database), {
      [`tran-dau/${team}/mission4/point`]: 0,
      [`tran-dau/${team}/mission4/history/${id}/status`]: "remove",
    });
  };

  return (
    <div className="d-flex justify-content-center gap-3">
      <div>
        <p className="text-center mb-0 fw-semibold">{point}</p>
        <div className="d-flex align-items-center gap-1">
          {historyList.map((v) => (
            <span
              key={v.id}
              className={`badge rounded-pill text-uppercase text-bg-${
                v.type === "winner" ? "warning" : "success"
              } mt-2`}
              role="button"
              onClick={() => onRemovePoint(v.id, v.type)}
            >
              {`${v.type === "winner" ? "Ra khơi" : `+${v.point}`}`}
            </span>
          ))}
        </div>
      </div>
      <div className={`border-start border-secondary border-3`}></div>
      <div className={`d-flex align-items-center gap-1`}>
        <span
          className="badge rounded-pill text-bg-light"
          role="button"
          onClick={() => onClickPoint("", 15)}
        >
          +15
        </span>
        <span
          className="badge rounded-pill text-bg-warning text-uppercase"
          role="button"
          onClick={() => onClickPoint("winner", 25)}
        >
          Ra khơi
        </span>
      </div>
    </div>
  );
}

function ViolationOfRules({ point = 0, history = {}, team = "", database }) {
  const [historyList, setHistoryList] = useState([]);

  React.useEffect(() => {
    let x = [];
    for (const key in history) {
      if (Object.hasOwnProperty.call(history, key)) {
        const element = history[key];

        if (element.status === "active") {
          x = [...x, { ...element, id: key }];
        }
      }
    }
    setHistoryList(x);
  }, [history]);

  const onClickPoint = (type, p) => {
    update(ref(database), {
      [`tran-dau/${team}/mission4/point`]: p,
      [`tran-dau/${team}/mission4/history/${Date.now()}/point`]: p,
      [`tran-dau/${team}/mission4/history/${Date.now()}/status`]: "active",
      [`tran-dau/${team}/mission4/history/${Date.now()}/type`]: type,
    });
  };

  const onRemovePoint = (id, type) => {
    update(ref(database), {
      [`tran-dau/${team}/mission4/point`]: 0,
      [`tran-dau/${team}/mission4/history/${id}/status`]: "remove",
    });
  };

  return (
    <div className="d-flex justify-content-center gap-3">
      <div>
        <p className="text-center mb-0 fw-semibold">{point}</p>
        <div className="d-flex align-items-center gap-1">
          {historyList.map((v) => (
            <span
              key={v.id}
              className={`badge rounded-pill text-uppercase text-bg-${
                v.type === "winner" ? "warning" : "success"
              } mt-2`}
              role="button"
              onClick={() => onRemovePoint(v.id, v.type)}
            >
              {`${v.type === "winner" ? "Ra khơi" : `+${v.point}`}`}
            </span>
          ))}
        </div>
      </div>
      <div className={`border-start border-secondary border-3`}></div>
      <div className={`d-flex align-items-center gap-1`}>
        <span
          className="badge rounded-pill text-bg-danger"
          role="button"
          onClick={() => onClickPoint("", 15)}
        >
          -5
        </span>
        <span
          className="badge rounded-pill text-bg-danger"
          role="button"
          onClick={() => onClickPoint("", 15)}
        >
          -10
        </span>
      </div>
    </div>
  );
}

export default BangDiem;
