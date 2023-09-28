function Navbar() {
  return (
    <div className="d-flex gap-3 align-items-center ps-3">
      <a
        className="text-muted link-offset-2 link-underline link-underline-opacity-0"
        href="#bang-diem"
        style={{ fontFamily: "Kanit-Medium" }}
      >
        Bảng điểm
      </a>
      <a
        className="text-muted link-offset-2 link-underline link-underline-opacity-0"
        href="#danh-sach-cac-doi"
        style={{ fontFamily: "Kanit-Medium" }}
      >
        Danh sách các đội
      </a>
      <a
        className="text-muted link-offset-2 link-underline link-underline-opacity-0"
        href="#lich-su"
        style={{ fontFamily: "Kanit-Medium" }}
      >
        Lịch sử
      </a>
    </div>
  );
}

export default Navbar;
