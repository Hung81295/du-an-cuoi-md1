let nguoiDung = layDuLieuNguoiDung();

function luuDuLieuNguoiDung() {
  localStorage.setItem("NguoiDungClass", JSON.stringify(nguoiDung));
}

function layDuLieuNguoiDung() {
  let duLieu = localStorage.getItem("NguoiDungClass");
  if (duLieu) {
    return JSON.parse(duLieu);
  }
  return [];
}

function dangNhap() {
  let tenNguoiDung = document.getElementById("tenTaiKhoan").value;
  let matKhau = document.getElementById("matKhau").value;
  let timThay = false;
  for (let i = 0; i < nguoiDung.length; i++) {
    if (tenNguoiDung === nguoiDung[i].nguoiDung && matKhau === nguoiDung[i].matKhau) {
      timThay = true;
    }
  }
  if (timThay) {
    alert("Đăng nhập thành công");
    document.getElementById("login").style.display = "none";
    document.getElementById("main").style.display = "block";

    veTrangchu();
    return;

  } else {
    alert("Sai tên đăng nhập hoặc mật khẩu");
  }
}

function moTrangDangNhap() {
  document.getElementById("login").innerHTML =
    `
    <div><h1>Đăng nhập</h1>
      <input type="text" class="dangNhap" id="tenTaiKhoan" placeholder="Tên đăng nhập, id, số điện thoại">
      <br><br>
      <input type="password" class="dangNhap" id="matKhau" placeholder="Nhập mật khẩu">
      <br><br>
      <button class="nutDN" onclick="dangNhap()">Đăng nhập</button>
      <p>Bạn chưa có tài khoản? <span onclick="moTrangDangKy()">Đăng ký</span></p>
    </div>
`;
}

function moTrangDangKy() {
  document.getElementById("login").innerHTML =
    `
      <div><h1> Đăng ký</h1>
        <input type="text" class="dangKy" id="tenTaiKhoan" placeholder="Điền tên đăng ký số điện thoại">
        <br><br>
        <input type="password" class="dangKy" id="matKhau" placeholder="Điền mật khẩu">
        <br><br>
        <button class="nutDK" onclick="dangKy()">Đăng ký</button>
        <p>Bạn đã có tài khoản? <span onclick="moTrangDangNhap()">Đăng nhập</span></p>
      </div>
 `
}

function dangKy() {
  let tenNguoiDung = document.getElementById("tenTaiKhoan").value;
  let matKhau = document.getElementById("matKhau").value;
  if (tenNguoiDung.trim() === "" || matKhau.trim() === "") {
    alert("Không được để trống");
    return;
  }
  let nguoiDungMoi = {
    nguoiDung: tenNguoiDung,
    matKhau: matKhau,
  }
  nguoiDung.push(nguoiDungMoi);
  luuDuLieuNguoiDung();
  alert("Đăng ký thành công");
  moTrangDangNhap();
}

function dangXuat() {
  document.getElementById("main").style.display = "none";
  document.getElementById("login").style.display = "block";
  moTrangDangNhap();
}
moTrangDangNhap();
