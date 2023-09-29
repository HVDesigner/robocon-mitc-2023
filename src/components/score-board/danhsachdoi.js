import React, { useEffect, useState } from "react";
import { ref, onValue, set, update } from "firebase/database";
import NavBar from "./navbar";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Spinner from "react-bootstrap/Spinner";

function DanhSachDoi({ database }) {
  const [list, setList] = useState([]);
  const [rawList, setRawList] = useState({});
  const [onLoading, setOnLoading] = useState(true);

  useEffect(() => {
    const starCountRef = ref(database, "danh-sach-cac-doi");

    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      let x = [];
      setRawList(data);
      for (const key in data) {
        if (Object.hasOwnProperty.call(data, key)) {
          const element = data[key];
          x = [...x, { id: key, name: element }];
        }
      }
      setList(x);
      setOnLoading(false);
    });
  }, [database]);

  const onSubmit = (e) => {
    e.preventDefault();

    if (e.target.teamName.value.trim() !== "") {
      set(ref(database, "danh-sach-cac-doi"), {
        ...rawList,
        [Date.now()]: e.target.teamName.value.trim(),
      }).then(() => {
        e.target.teamName.value = "";
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
          Danh sách các đội
        </h1>
      </div>
      <div className="h-100 p-2 flex-fill overflow-auto">
        <div className="border rounded-3 border-2 h-100 p-3 overflow-auto bg-white">
          {onLoading ? (
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          ) : (
            <React.Fragment>
              <form onSubmit={onSubmit}>
                <div className="d-flex gap-3 mb-3">
                  <input
                    type="text"
                    className="form-control"
                    style={{ outline: "none", boxShadow: "none" }}
                    name="teamName"
                    autoComplete="off"
                  />
                  <button type="submit" className="btn btn-primary fw-semibold">
                    Thêm
                  </button>
                </div>
              </form>
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
                    <tr key={v.id}>
                      <th className="text-nowrap">{k + 1}</th>
                      <TeamNameItem
                        name={v.name}
                        id={v.id}
                        database={database}
                      />
                    </tr>
                  ))}
                </tbody>
              </table>
            </React.Fragment>
          )}
        </div>
      </div>
    </React.Fragment>
  );
}

function TeamNameItem({ name, database, id }) {
  const [isChange, setIsChange] = React.useState(false);

  const onSubmit = (e) => {
    e.preventDefault();

    update(ref(database), {
      [`/danh-sach-cac-doi/${id}`]: e.target.newTeamName.value.trim(),
    }).then(() => {
      setIsChange(false);
    });
  };

  return (
    <React.Fragment>
      <td>{name}</td>
      <td className="text-nowrap text-end">
        <small
          className="text-muted"
          role="button"
          onClick={() => setIsChange(true)}
        >
          thay đổi
        </small>
        <Modal
          aria-labelledby="contained-modal-title-vcenter"
          centered
          show={isChange}
          onHide={() => setIsChange(false)}
          contentClassName="border-0"
        >
          <Modal.Header closeButton></Modal.Header>
          <form onSubmit={onSubmit}>
            <Modal.Body className="bg-light">
              <input
                type="text"
                className="form-control"
                defaultValue={name}
                style={{ outline: "none", boxShadow: "none" }}
                name="newTeamName"
              />
            </Modal.Body>
            <Modal.Footer>
              <button type="submit" className="btn btn-success fw-semibold">
                Lưu
              </button>
              <Button
                onClick={() => setIsChange(false)}
                className="fw-semibold"
              >
                Hủy
              </Button>
            </Modal.Footer>
          </form>
        </Modal>
      </td>
    </React.Fragment>
  );
}

export default DanhSachDoi;
