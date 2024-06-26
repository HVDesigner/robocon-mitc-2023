import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Spinner } from "react-bootstrap";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";
import "moment/locale/vi";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

const ScoreBoard = React.lazy(() => import("./ScoreBoard"));
const AuthLayout = React.lazy(() => import("./Auth"));

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBYykqEKCRCSYqN4jmQtQqLVB--UgaFur4",
  authDomain: "tuyensinh-mitc.firebaseapp.com",
  projectId: "tuyensinh-mitc",
  storageBucket: "tuyensinh-mitc.appspot.com",
  messagingSenderId: "722343127322",
  appId: "1:722343127322:web:82a6e3efba4f1bdbb164a3",
  measurementId: "G-TFPXGRG62B",
  databaseURL:
    "https://tuyensinh-mitc-default-rtdb.asia-southeast1.firebasedatabase.app",
};

const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const database = getDatabase(app);
const auth = getAuth(app);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Suspense
      fallback={
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ height: "100vh", width: "100vw" }}
        >
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      }
    >
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route
              index
              element={
                <AuthLayout auth={auth}>
                  <App database={database} />
                </AuthLayout>
              }
            />
            <Route
              path="score-board"
              element={
                <AuthLayout auth={auth}>
                  <ScoreBoard database={database} />
                </AuthLayout>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </Suspense>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
