class GiaoDich {
  constructor(id, loai, danhMuc, soTien, ngay, ghiChu) {
    this.id = id;
    this.loai = loai;
    this.danhMuc = danhMuc;
    this.soTien = soTien;
    this.ngay = ngay;
    this.ghiChu = ghiChu;
  }
}

function layDuLieuGiaoDich() {
  let duLieu = localStorage.getItem("GiaoDichClass");

  if (!duLieu || duLieu === "undefined") {
    return [];
  }

  let mangTam = JSON.parse(duLieu);

  return mangTam.map(item =>
    new GiaoDich(
      item.id,
      item.loai,
      item.danhMuc,
      item.soTien || 0,
      item.ngay,
      item.ghiChu || ""
    )
  );
}
function luuDuLieuGiaoDich() {
  localStorage.setItem("GiaoDichClass", JSON.stringify(giaoDich));
}

let giaoDich = layDuLieuGiaoDich();
console.log(giaoDich);

function veTrangchu() {
  console.log("Đã vào trang chủ");
  let chuoiHtml = `
    <h1>Trang chủ</h1>
    <h2 onclick="thuChi()">Chi tiêu</h2>
    <h2>Tiết kiệm</h2>
  <button onClick="dangXuat()">Đăng xuất</button>

    <table border="1">
        <tr>
            <th>ID</th>
            <th>Ngày</th>
            <th>Loại</th>
            <th>Danh mục</th>
            <th>Số tiền</th>
            <th>Ghi chú</th>
            <th></th>
            <th></th>
        </tr>
    `;

  for (let i = 0; i < giaoDich.length; i++) {
    let item = giaoDich[i];

    chuoiHtml += `
        <tr>
            <td>${item.id}</td>
            <td>${item.ngay}</td>
            <td>${item.loai}</td>
            <td>${item.danhMuc}</td>
            <td>${item.soTien}</td>
            <td>${item.ghiChu}</td>
            <td><button onclick="xoaGiaoDich(${item.id})">Xóa</button></td>
            <td><button onclick="toiTrangSua(${item.id})">Sửa</button></td>
        </tr>
        `;
  }

  chuoiHtml += "</table>";

  document.getElementById("main").innerHTML = chuoiHtml;
}

function thuChi() {
  document.getElementById("main").innerHTML = `
    <h3>Chi tiết thu chi</h3>
    <input type="date" placeholder="Nhập ngày" id="themNgay">
    <select name="loai" id="loai">
  <option value="chon">---Chọn loại---</option>
  <option value="chi">Chi</option>
  <option value="thu">Thu</option>
</select>
    <input type="text" placeholder="Nhập danh mục chi thu" id="danhMuc">
    <input type="number" placeholder="Nhập số tiền" id="soTien">
    <input type="text" placeholder="Ghi chú thông tin nếu cần" id="ghiChu">
    <br>
    <button class="luu-btn" onclick="themVaoTrangChu()">Thêm</button>
    <button class="huy-btn" onclick="veTrangchu()">Hủy</button>
`;
}

function themVaoTrangChu()   {
  let id = giaoDich.length + 1;
  let ngay = document.getElementById("themNgay").value;
  let danhMuc = document.getElementById("danhMuc").value;
  let loai = document.getElementById("loai").value;
  let soTien = Number(document.getElementById("soTien").value);
  let ghiChu = document.getElementById("ghiChu").value;
  if (soTien <= 0) {
    alert("Vui lòng nhập đúng số tiền");
    return;
  }
  giaoDich.push(new GiaoDich(id, loai, danhMuc, soTien, ngay, ghiChu))
  luuDuLieuGiaoDich()
  veTrangchu();
  thongBao("✅ Đã thêm giao dịch!", "green")

}

function thongBao(noiDung, mauSac) {
  let tb = document.createElement("div");
  tb.innerText = noiDung;
  tb.style.cssText = `
        position: fixed; top: 20px; right: 20px;
        background: ${mauSac}; color: white;
        padding: 10px 20px; border-radius: 5px;
`;
  document.body.appendChild(tb);
  setTimeout(function () {
    tb.remove()
  }, 2000);
}

function toiTrangSua(id) {
  let viTriSua = giaoDich.findIndex(gd => gd.id === id);
  if (viTriSua === -1) {
    alert("Không tìm thấy giao dịch");
    return;
  }
  let giaoDichCanSua = giaoDich[viTriSua];
  document.getElementById("main").innerHTML = `
<h2>Sửa giao dịch</h2>
<p>Loại</p>
<select name="suaLoai" id="suaLoai" >
<option value="chonSua">---Chọn loại---</option>
<option value="${giaoDichCanSua.loai}">Chi</option>
<option value="${giaoDichCanSua.loai}">Thu</option>
</select>
<label>Danh mục</label>
<input type="text" placeholder="Nhập danh mục thu chi" id="suaDanhMuc" value="${giaoDichCanSua.danhMuc}">
<label>Số tiền</label>
<input type="number" id="suaSoTien" placeholder="Nhập số tiền" value="${giaoDichCanSua.soTien}">
<label>Ngày</label>
<input type="date" value="${giaoDichCanSua.ngay}" id="suaNgay">
<label>Ghi chú</label>
<input type="text" value="${giaoDichCanSua.ghiChu}" id="suaGhiChu">
<br><br>
<button onclick="luuGiaoDich(${id})" class="nutLuuThem">Lưu</button>
<button onclick="veTrangchu()" class="nutHuy">Hủy</button>
  `
}

function luuGiaoDich(id) {
  let viTriSua = giaoDich.findIndex(gd => gd.id === id);
  let loaiMoi = document.getElementById("suaLoai").value;
  let danhMucMoi = document.getElementById("suaDanhMuc").value.trim();
  let soTienMoi = Number(document.getElementById("suaSoTien").value);
  let ngayMoi = document.getElementById("suaNgay").value;
  let ghiChuMoi = document.getElementById("suaGhiChu").value;
  if (ngayMoi === "" || danhMucMoi === "") {
    alert("Nhập thiếu thông tin! Nhập tiếp!");
    return;
  }
  if (soTienMoi === "" || soTienMoi <= 0) {
    alert("Nhập lại số tiền");
    return;
  }
  if (loaiMoi === "---Chọn loại---") {
    alert("Chọn loại giao dịch");
    return;
  }
  giaoDich[viTriSua] = new GiaoDich(id, loaiMoi, danhMucMoi, soTienMoi, ngayMoi, ghiChuMoi);
  luuDuLieuGiaoDich();
  veTrangchu();
  thongBao("Đã sửa thành công", "blue")
}

function xoaGiaoDich(id) {
  let viTriXoa = giaoDich.findIndex(gd => gd.id === id);
  if (viTriXoa === -1) return;
  let xoaGiaoDich = giaoDich[viTriXoa].danhMuc;
  let hoi = confirm(`Bạn có chắc muốn xóa ${xoaGiaoDich}`);
  if (hoi) {
    giaoDich.splice(viTriXoa, 1);
    luuDuLieuGiaoDich();
    veTrangchu();
    thongBao("🗑️ Đã xóa!", "red")
  }

}
