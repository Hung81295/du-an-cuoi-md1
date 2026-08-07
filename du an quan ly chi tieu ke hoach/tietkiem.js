class KeHoach {
  constructor(id, tenMucTieu, soTienCan, soTienDaCo, hanChot) {
    this.id = id;
    this.tenMucTieu = tenMucTieu;
    this.soTienCan = soTienCan;
    this.soTienDaCo = soTienDaCo;
    this.hanChot = hanChot;
  }
}

function layDuLieuKeHoach() {
  let duLieu = localStorage.getItem("KeHoach_" + nguoiDungHienTai());

  if (!duLieu || duLieu === "undefined") {
    return [];
  }
  let mangTam = JSON.parse(duLieu);

  return mangTam.map(item => new KeHoach(item.id, item.tenMucTieu, item.soTienCan, item.soTienDaCo || 0, item.hanChot,));
}

function luuDuLieuKeHoach() {
  localStorage.setItem("KeHoach_" + nguoiDungHienTai(), JSON.stringify(keHoach));
}

let keHoach = [];

function trangKeHoach() {
  document.getElementById("main").style.display = "none";
  document.getElementById("tietKiem").style.display = "block";

  let chuoiHtml = `
<h1 onclick="veTrangchu()">Trang chủ</h1>
<h2 class="tieu-de-trang">Tiết kiệm</h2>
<br>
<h3 class="tieu-de-hanh-dong" onclick="themKeHoach()">Thêm kế hoạch tiết kiệm</h3>`;

  for (let kh of keHoach) {

    let soNgayConLai = Math.ceil((new Date(kh.hanChot) - new Date()) / (1000 * 60 * 60 * 24));
    let lopDemNguoc = "con-nhieu";
    let chuY=`Còn ${soNgayConLai} ngày`;
    if (soNgayConLai < 0) {
      lopDemNguoc = "qua-han";
      chuY=`⚠ Quá hạn ${Math.abs(soNgayConLai)} ngày`;
    } else if (soNgayConLai <= 7) {
      lopDemNguoc = "sap-het";
      chuY=`⏰ Còn ${soNgayConLai} ngày`
    }
    let phanTram = kh.soTienCan > 0 ? Math.min((kh.soTienDaCo / kh.soTienCan) * 100, 100) : 0;

    chuoiHtml += `
      <div>
        <strong>${kh.tenMucTieu}</strong>
<span class="dem-nguoc ${lopDemNguoc}">${chuY}</span>
        <p>${kh.soTienDaCo.toLocaleString("vi-VN")}đ /
        ${kh.soTienCan.toLocaleString("vi-VN")}đ
        <div style="width:100%; height:20px; background:#e2e8f0; border-radius:5px; overflow:hidden;">
    <div style="width:${phanTram}%; height:100%; background:${kh.soTienDaCo > kh.soTienCan ? "red" : "green"};"></div>
  </div>
  </p>

        <button class="luu-btn" onclick="napTienKeHoach(${kh.id})">Nạp tiền</button>
        <button class="sua-btn" onclick="toiTrangSuaKeHoach(${kh.id})">Sửa</button>
        <button class="huy-btn" onclick="xoaKeHoach(${kh.id})">Xóa</button>
      </div>
    `;
  }

  document.getElementById("tietKiem").innerHTML = chuoiHtml;
}

function themKeHoach() {
  document.getElementById("tietKiem").innerHTML = `
<div>
<h2 class="tieu-de-trang">Kế hoạch tiết kiệm cho tương lai</h2>     <p>Mục tiêu tiết kiệm</p>
     <input type="text" id="mucTieu" placeholder="Nhập mục tiêu tiết kiệm tiền">
     <p>Số tiền dự tính cần tiết kiệm</p>
     <input type="number" id="canNap" placeholder="Nhập số tiền cần tiết kiêm">
     <p>Hạn cuối phải hoàn thành của kế hoạch</p>
     <input type="date" id="hanChot" placeholder="Nhập hạn hoàn thành vào đây"><br><br>
     <button class="luu-btn" onclick="themVaoTrangKeHoach()">Lưu</button>
     <button class="huy-btn" onclick="trangKeHoach()">Hủy</button>
</div>
`;
}

function themVaoTrangKeHoach() {
  let id = Date.now();
  let mucTieu = document.getElementById("mucTieu").value.trim();
  let soTien = Number(document.getElementById("canNap").value);
  let soTienCan = 0;
  let han = document.getElementById("hanChot").value;
  if (!(soTien > 0)) {
    alert("Nhập số tiền sai! Nhập lại!");
    return
  }
  if (mucTieu.trim() === "") {
    alert("Vui lòng nhập muc tiêu!");
    return;
  }
  if (han === "") {
    alert("Vui lòng chọn ngày!");
    return;
  }
  keHoach.push(new KeHoach(id, mucTieu, soTien, soTienCan, han))
  luuDuLieuKeHoach()
  trangKeHoach();
  thongBao("✅ Đã thêm kế hoạch!", "green")
}

function xoaKeHoach(id) {
  let viTriXoa = keHoach.findIndex(kh => kh.id === id);
  if (viTriXoa === -1) return;
  let xoaKeHoach = keHoach[viTriXoa].tenMucTieu;
  let hoi = confirm(`Bạn có chắc muốn xóa ${xoaKeHoach}`);
  if (hoi) {
    keHoach.splice(viTriXoa, 1);
    luuDuLieuKeHoach();
    trangKeHoach();
    thongBao("🗑️ Đã xóa!", "red")
  }
}

function toiTrangSuaKeHoach(id) {
  let viTriSua = keHoach.findIndex(kh => kh.id === id);
  if (viTriSua === -1) {
    alert("Không tìm thấy kế hoạch");
    return;
  }
  let keHoachCanSua = keHoach[viTriSua];
  document.getElementById("tietKiem").innerHTML = `
<div><h2 class="tieu-de-trang">Sửa kế hoạch</h2>
  <p>Mục tiêu tiết kiệm tiền</p>
  <input type="text" value="${keHoachCanSua.tenMucTieu}" id="suaMucTieu">
  <p>Số tiền cần tiết kiệm</p>
  <input type="number" value="${keHoachCanSua.soTienCan}" id="suaSoTien">
  <p>Hạn hoàn thành mục tiên tiết kiệm</p>
  <input type="date" value="${keHoachCanSua.hanChot}" id="suaHan">
  <br><br>
  <button class="luu-btn" onclick="luuKeHoachDaSua(${id})">Lưu</button>
  <button class="huy-btn" onclick="trangKeHoach()">Hủy</button></div>
`
}

function luuKeHoachDaSua(id) {
  let viTriSua = keHoach.findIndex(kh => kh.id === id);
  let mucTieuMoi = document.getElementById("suaMucTieu").value.trim();
  let soTienCanMoi = Number(document.getElementById("suaSoTien").value);
  let hanMoi = document.getElementById("suaHan").value;   // ⚠️ id đúng là "suaHan", bạn đang gõ "han" — sai id, sẽ đọc ra null

  if (mucTieuMoi === "" || hanMoi === "") {
    alert("Nhập thiếu thông tin! Nhập lại");
    return;
  }
  if (!(soTienCanMoi > 0)) {
    alert("Vui lòng nhập đúng số tiền");
    return;
  }

  let soTienDaCoCu = keHoach[viTriSua].soTienDaCo;   // giữ nguyên số đã tiết kiệm
  keHoach[viTriSua] = new KeHoach(id, mucTieuMoi, soTienCanMoi, soTienDaCoCu, hanMoi);
  luuDuLieuKeHoach();
  trangKeHoach();
  thongBao("✅ Đã sửa thành công", "blue");
}

function napTienKeHoach(id) {
  let viTri = keHoach.findIndex(kh => kh.id === id);
  if (viTri === -1) return;

  let soTienNap = Number(prompt("Nhập số tiền muốn nạp thêm:"));
  if (!soTienNap || soTienNap <= 0) {
    alert("Số tiền không hợp lệ");
    return;
  }

  keHoach[viTri].soTienDaCo += soTienNap;
  luuDuLieuKeHoach();
  trangKeHoach();
  thongBao("💰 Đã nạp tiền!", "green");
}

function chuyenVaoTietKiem(soTien) {
  if (soTien <= 0) {
    alert("Không đủ số dư để tiết kiệm");
    return;
  }
  if (keHoach.length === 0) {
    alert("Bạn chưa có kế hoạch tiết kiệm nào")
    return;
  }
  let danhSachTen = keHoach.map(kh => kh.tenMucTieu).join(",");
  let tenChon = prompt(`Chuyển ${soTien.toLocaleString("vi-VN")}đ vào kế hoạch nào?\n(${danhSachTen})`)
  let keHoachCanTim = keHoach.findIndex(kh => kh.tenMucTieu === tenChon);
  if (keHoachCanTim === -1) {
    alert("Không tìm thấy kế hoạch");
    return;
  }
  keHoach[keHoachCanTim].soTienDaCo += soTien;
  let ngayDemTietKiem = new Date().toISOString().slice(0, 10);
  giaoDich.push(new GiaoDich(Date.now(), "chi", "Chuyển tiền tiết kiệm " + tenChon, soTien, ngayDemTietKiem, ""));
  luuDuLieuGiaoDich()
  luuDuLieuKeHoach();
  veTrangchu(locTheoThang());
  thongBao("💰 Đã chuyển vào tài khoản tiết kiệm!", "green");


}

kiemTraDangNhap();
