import React, { useEffect, useState } from "react";
import NavBar from "./navbar";
import { ref, onValue } from "firebase/database";
import Spinner from "react-bootstrap/Spinner";
import moment from "moment";
import ChevronDown from "./../../svgs/chevron-down";
import ChevronUp from "./../../svgs/chevron-up";

function LichSu({ database }) {
  const [list, setList] = useState([]),
    [loading, setLoading] = useState(true);

  useEffect(() => {
    const starCountRef = ref(database, "lich-su-tran-dau");

    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();

      let x = [];
      for (const key in data) {
        if (Object.hasOwnProperty.call(data, key)) {
          const element = data[key];
          x = [...x, { ...element, id: key }];
        }
      }
      setList(x);
      setLoading(false);
    });
  }, [database]);

  return (
    <React.Fragment>
      <div className="d-flex gap-2 mt-3 pe-3">
        <NavBar />
        <h1
          style={{ fontFamily: "Anton" }}
          className="text-uppercase text-center mb-0 flex-fill"
        >
          Lịch sử trận
        </h1>
      </div>
      <div className="h-100 p-2 overflow-auto">
        <div className="border rounded-3 border-2 h-100 p-3 bg-white overflow-auto">
          {loading ? (
            <div className="d-flex justify-content-center align-items-center h-100">
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </div>
          ) : (
            <div className="d-flex flex-column gap-2">
              {list.map((v) => (
                <div
                  key={v.id}
                  className="border-2 border rounded p-3 bg-light"
                >
                  <Item v={v} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </React.Fragment>
  );
}

function Item({ v }) {
  const [show, setShow] = useState(false);
  return (
    <React.Fragment>
      <div className="d-flex justify-content-between align-items-center text-center">
        <div
          style={{ fontFamily: "Anton", width: "15vw" }}
          className="text-primary"
        >
          {v.match["blue-team"].name}
        </div>
        <h3
          style={{ fontFamily: "Kanit-Bold", width: "5vw" }}
          className="text-primary mb-0"
        >
          {v.match["blue-team"].mission1.point +
            v.match["blue-team"].mission2.point +
            v.match["blue-team"].mission3.point +
            v.match["blue-team"].mission4.point +
            v.match["blue-team"].VOR.point}
        </h3>
        <div className="text-center" style={{ width: "15vw" }}>
          <div
            style={{ fontFamily: "Anton" }}
            className={v.status === "remove" ? "text-muted" : "text-success"}
          >
            {v.status === "remove" ? "Hủy trận" : "Kết thúc"}
          </div>
          <small className="fw-semibold text-muted">
            {moment(parseInt(v.id)).format("DD MMMM YYYY, h:mm A")}
          </small>
        </div>
        <h3
          style={{ fontFamily: "Kanit-Bold", width: "5vw" }}
          className="text-danger mb-0"
        >
          {v.match["red-team"].mission1.point +
            v.match["red-team"].mission2.point +
            v.match["red-team"].mission3.point +
            v.match["red-team"].mission4.point +
            v.match["red-team"].VOR.point}
        </h3>
        <div
          style={{ fontFamily: "Anton", width: "15vw" }}
          className="text-danger"
        >
          {v.match["red-team"].name}
        </div>
        {show ? (
          <ChevronUp role={"button"} onClick={() => setShow((x) => !x)} />
        ) : (
          <ChevronDown role={"button"} onClick={() => setShow((x) => !x)} />
        )}
      </div>
      {show ? <MatchDetail match={v.match} /> : ""}
    </React.Fragment>
  );
}

function MatchDetail({ match }) {
  return (
    <React.Fragment>
      <div className="mt-3"></div>
      <table className="table table-striped bg-white mb-0 mt-3">
        <thead>
          <tr>
            <th></th>
            <th className="w-50 text-center pt-3">
              <h3
                className="mb-0 text-primary"
                style={{ fontFamily: "Kanit-SemiBold" }}
              >
                {match["blue-team"].name}
              </h3>
            </th>
            <th className="w-50 text-center pt-3">
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
              <p className="mb-0 fw-bold">Nhiệm vụ 1</p>
              <small className="text-muted">Nơi khởi nguồn nhịp đập</small>
            </td>
            <td className="w-50 text-center">
              <p className="mb-0 fw-semibold">
                {match["blue-team"].mission1.point}
              </p>
              <Mission1 history={match["blue-team"].mission1.history} />
            </td>
            <td className="w-50 text-center">
              <p className="mb-0 fw-semibold">
                {match["red-team"].mission1.point}
              </p>
              <Mission1 history={match["red-team"].mission1.history} />
            </td>
          </tr>
          <tr>
            <td className="text-nowrap text-end fw-semibold p-3">
              <p className="mb-0 fw-bold">Nhiệm vụ 2</p>
              <small className="text-muted">Ba lần vượt "bão"</small>
            </td>
            <td className="w-50 text-center">
              <p className="mb-0 fw-semibold">
                {match["blue-team"].mission2.point}
              </p>
              <Mission2 history={match["blue-team"].mission2.history} />
            </td>
            <td className="w-50 text-center">
              <p className="mb-0 fw-semibold">
                {match["red-team"].mission2.point}
              </p>
              <Mission2 history={match["red-team"].mission2.history} />
            </td>
          </tr>
          <tr>
            <td className="text-nowrap text-end fw-semibold p-3">
              <p className="mb-0 fw-bold">Nhiệm vụ 3</p>
              <small className="text-muted">Vững bước đi lên</small>
            </td>
            <td className="w-50 text-center">
              <p className="mb-0 fw-semibold">
                {match["blue-team"].mission3.point}
              </p>
              <Mission3 history={match["blue-team"].mission3.history} />
            </td>
            <td className="w-50 text-center">
              <p className="mb-0 fw-semibold">
                {match["red-team"].mission3.point}
              </p>
              <Mission3 history={match["red-team"].mission3.history} />
            </td>
          </tr>
          <tr>
            <td className="text-nowrap text-end fw-semibold p-3">
              <p className="mb-0 fw-bold">Nhiệm vụ 4</p>
              <small className="text-muted">Vươn mình ra khơi</small>
            </td>
            <td className="w-50 text-center">
              <p className="mb-0 fw-semibold">
                {match["blue-team"].mission4.point}
              </p>
              <Mission4 history={match["blue-team"].mission4.history} />
            </td>
            <td className="w-50 text-center">
              <p className="mb-0 fw-semibold">
                {match["red-team"].mission4.point}
              </p>
              <Mission4 history={match["red-team"].mission4.history} />
            </td>
          </tr>
          <tr>
            <td className="text-nowrap text-end fw-semibold p-3">
              <p className="mb-0 fw-bold">Phạm quy</p>
            </td>
            <td className="w-50 text-center">
              <p className="mb-0 fw-semibold">{match["blue-team"].VOR.point}</p>
              <ViolationOfRules history={match["blue-team"].VOR.history} />
            </td>
            <td className="w-50 text-center">
              <p className="mb-0 fw-semibold">{match["red-team"].VOR.point}</p>
              <ViolationOfRules history={match["red-team"].VOR.history} />
            </td>
          </tr>
        </tbody>
      </table>
    </React.Fragment>
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
    <div className="d-flex justify-content-center mt-1 gap-1">
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
    <div className="d-flex justify-content-center mt-1 gap-1">
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
    <div className="d-flex justify-content-center mt-1 gap-1">
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
    <div className="d-flex justify-content-center mt-1 gap-1">
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
    <div className="d-flex justify-content-center mt-1 gap-1">
      {changeToArr(history).map((v) => (
        <span key={v.id} className="badge rounded-pill text-bg-danger">
          {`${v.point}`}
        </span>
      ))}
    </div>
  );
}

const ViolationOfRules = React.memo(ViolationOfRules_);

export default LichSu;
