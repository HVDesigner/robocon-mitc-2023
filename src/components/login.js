import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";

const Login = ({ auth }) => {
  const [email, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = () => {
    if (email && password) {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // alert("Đăng nhập thành công!");
        })
        .catch((error) => {
          // const errorCode = error.code;
          // const errorMessage = error.message;
          alert("Đăng nhập không thành công. Vui lòng kiểm tra lại thông tin.");
        });
    } else {
    }
  };

  return (
    <div className="d-flex gap-2 p-3" style={{ height: "100vh" }}>
      <h1
        style={{ fontFamily: "Anton" }}
        className="text-uppercase text-nowrap mb-0 flex-fill"
      >
        Đăng nhập
      </h1>
      <input
        type="text"
        className="form-control align-self-end"
        style={{ outline: "none", boxShadow: "none" }}
        placeholder="Tên đăng nhập"
        value={email}
        onChange={handleUsernameChange}
      />
      <input
        type="password"
        className="form-control align-self-end"
        style={{ outline: "none", boxShadow: "none" }}
        placeholder="Mật khẩu"
        value={password}
        onChange={handlePasswordChange}
      />
      <button
        className="btn btn-success text-nowrap fw-semibold align-self-end"
        onClick={handleLogin}
      >
        Đăng nhập
      </button>
    </div>
  );
};

export default Login;
