var renderTableSV = function(result) {
    var noiDung = '';
    //Duyệt kết quả sinh viên trả về
    for (var i = 0; i < result.data.length; i++) {
        var sinhVien = result.data[i];
        //Hàm làm tròn .toFixed => lấy ra 2 số làm tròn
        var dtb = ((sinhVien.DiemToan + sinhVien.DiemLy + sinhVien.DiemHoa) / 3).toFixed(2);
        //Mỗi lần duyệt dùng dữ liệu 1 sinh viên tạo ra 1 tr sinh viên tương ứng
        noiDung += `
            <tr>
                <td>${sinhVien.MaSV}</td>
                <td>${sinhVien.HoTen}</td>
                <td>${sinhVien.Email}</td>
                <td>${sinhVien.SoDT}</td>
                <td>${sinhVien.CMND}</td>
                <td>${sinhVien.DiemToan}</td>
                <td>${sinhVien.DiemLy}</td>
                <td>${sinhVien.DiemHoa}</td>
                <td>${dtb}</td>
                <td>
                    <button class="btn btn-primary btnSua" onclick="suaSinhVien('${sinhVien.MaSV}')">Sửa</button>
                    <button class="btn btn-danger btnXoa" onclick="xoaSinhVien('${sinhVien.MaSV}')">Xoá</button>
                </td>
            </tr>
        `;
    }
    document.querySelector('#tblSinhVien').innerHTML = noiDung;
}

var suaSinhVien = function(maSV) {
    // Bước 1 : mở popup lên
    document.querySelector("#btnThemSinhVien").click();
    // Bước 2 : chỉnh sửa title và nhấn xử lý của modal
    document.querySelector(".modal-title").innerHTML = 'Cập nhật thông tin sinh viên';
    document.querySelector(".modal-footer").innerHTML = `
        <button class='btn btn-primary btnCapNhat' onclick='CapNhatSinhVien()'>Lưu</button>
    `;
    // Bước 3 : dùng mã sinh viên để lấy thông tin sinh viên từ server qua API
    sinhVienService.LayThongTinSinhVien(maSV).then(function(res) {
        // Lấy đối tượng sinh viên từ server trả về gán cho biến sinh viên
        var sinhVien = res.data;
        // Bước 4 : sau khi lấy data server về load lại các control input
        domselector('#MaSV').value = sinhVien.MaSV;
        domselector('#HoTen').value = sinhVien.HoTen;
        domselector('#Email').value = sinhVien.Email;
        domselector('#CMND').value = sinhVien.CMND;
        domselector('#SoDT').value = sinhVien.SoDT;
        domselector('#DiemToan').value = sinhVien.DiemToan;
        domselector('#DiemLy').value = sinhVien.DiemLy;
        domselector('#DiemHoa').value = sinhVien.DiemHoa;

    }).catch(function(err) {
        console.log(err);

    })
}
var domselector = function(selector) {
    return document.querySelector(selector);
}
var CapNhatSinhVien = function() {
    // Khi bấm lưu thì sẽ lấy thông tin từ người dùng nhập vào sau khi sửa => gọi phương thức lưu API
    var MaSV = document.querySelector('#MaSV').value;
    var HoTen = document.querySelector('#HoTen').value;
    var Email = document.querySelector('#MaSV').value;
    var SoDT = document.querySelector('#SoDT').value;
    var CMND = document.querySelector('#CMND').value;
    var DiemToan = document.querySelector('#DiemToan').value;
    var DiemLy = document.querySelector('#DiemLy').value;
    var DiemHoa = document.querySelector('#DiemHoa').value;

    //Tạo object chứa thông tin người dùng
    var svUpdate = new SinhVien(MaSV, HoTen, Email, SoDT, CMND, DiemToan, DiemLy, DiemHoa);
    console.log('dataUpdate', svUpdate);
    sinhVienService.CapNhatSinhVien(svUpdate).then(function(res) {
        console.log(res);

        // Thành công thì load lại trang web
        location.reload()
    }).catch(function(err) {
        log(err)
    })

}
var xoaSinhVien = function(maSV) {
    var cfDialog = confirm(`Bạn có muốn xoá sinh viên ${maSV} này không ?`);
    if (cfDialog === true) {
        sinhVienService.xoaSinhVien(maSV).then(function(result) {
            location.reload();
        }).catch(function(err) {
            alert('xoá thất bại');
        })
    }
}


//tạo đối tượng  từ lớp đối tượng QuanLySinhVienService để gọi api
var sinhVienService = new QuanLySinhVienService();
var promiseGetSinhVien = sinhVienService.LayDanhSachSinhVien();
promiseGetSinhVien.then(renderTableSV).catch(function(err) {

})


//Cài đặt tính năng cho nút thêm sinh viên
document.querySelector('#btnThemSinhVien').onclick = function() {

    //Thay đổi model heading
    document.querySelector('.modal-title').innerHTML = 'THÊM SINH VIÊN';
    //Thêm nút thêm sinh viên
    document.querySelector('.modal-footer').innerHTML = `
        <button class='btn btn-success btnTaoMoiSinhVien' onclick="themMoiNhanVien()">Tạo mới SV</button>
    `
}

// document.querySelector('.btnTaoMoiSinhVien').addEventListener('click', function (){
//     alert(1);
// })


var themMoiNhanVien = function() {
    //Lấy thông tin  người dùng nhập từ giao diện vào
    var MaSV = document.querySelector('#MaSV').value;
    var HoTen = document.querySelector('#HoTen').value;
    var Email = document.querySelector('#MaSV').value;
    var SoDT = document.querySelector('#SoDT').value;
    var CMND = document.querySelector('#CMND').value;
    var DiemToan = document.querySelector('#DiemToan').value;
    var DiemLy = document.querySelector('#DiemLy').value;
    var DiemHoa = document.querySelector('#DiemHoa').value;

    //Tạo object chứa thông tin người dùng
    var sv = new SinhVien(MaSV, HoTen, Email, SoDT, CMND, DiemToan, DiemLy, DiemHoa);

    //Gọi api BE đưa thông tin lên server lưu trữ
    sinhVienService.ThemSinhVien(sv).then(function(result) {
        console.log('thành công');
        //Load lại trang để gọi lại api layDanhSachSinhVien kiểm tra
        location.reload();
    }).catch(function(err) {
        console.log(err.response.data);
        //Load lại trang để gọi lại api layDanhSachSinhVien kiểm tra
        location.reload();

    })
}