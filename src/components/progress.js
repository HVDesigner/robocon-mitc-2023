function Progress({ now = "0%" }) {
  return (
    <div className="position-relative m-4 w-50 align-self-center">
      <div
        className="progress"
        role="progressbar"
        aria-label="Progress"
        aria-valuenow={50}
        aria-valuemin={0}
        aria-valuemax={100}
        style={{ height: "2px" }}
      >
        <div className="progress-bar" style={{ width: now }} />
      </div>
      <a
        className="fw-bold position-absolute top-0 start-0 translate-middle btn btn-sm btn-primary rounded-pill"
        href="#chuanbi"
        style={{ width: "2rem", height: "2rem" }}
        role="button"
      >
        1
      </a>
      <a
        className={`fw-bold position-absolute top-0 start-50 translate-middle btn btn-sm btn-${
          now === "50%" || now === "100%" ? "primary" : "secondary"
        } rounded-pill`}
        href="#thidau"
        style={{ width: "2rem", height: "2rem" }}
        role="button"
      >
        2
      </a>
      <a
        className={`fw-bold position-absolute top-0 start-100 translate-middle btn btn-sm btn-${
          now === "100%" ? "primary" : "secondary"
        } rounded-pill`}
        href="#ketthuc"
        style={{ width: "2rem", height: "2rem" }}
        role="button"
      >
        3
      </a>
    </div>
  );
}

export default Progress;
