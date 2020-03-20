var QuanLySinhVienService = function() {
    //Lớp đối tượng chứa các phương thức giao tiếp với server (BE)
    this.LayDanhSachSinhVien = function() {
        //promise
        return axios({
            url: 'http://svcy.myclass.vn/api/SinhVien/LayDanhSachSinhVien',
            method: 'GET',
        })
    }

    this.ThemSinhVien = function(sinhVien) {
        return axios({
            url: 'http://svcy.myclass.vn/api/SinhVien/ThemSinhVien',
            method: 'POST',
            data: sinhVien //Thuộc tính chứa dữ liệu đưa server (Lưu ý phải đúng object mẫu BE cung cấp)
        })
    }

    this.xoaSinhVien = function(maSinhVien) {
        return axios({
            url: 'http://svcy.myclass.vn/api/SinhVien/XoaSinhVien/' + maSinhVien,
            method: 'DELETE',
        })
    }
    this.CapNhatSinhVien = function(sinhVien) {
        return axios({
            url: 'http://svcy.myclass.vn/api/SinhVien/CapNhatThongTinSinhVien',
            method: 'PUT',
            data: sinhVien
        })
    }
    this.LayThongTinSinhVien = function(maSinhVien) {
        return axios({
            url: 'http://svcy.myclass.vn/api/SinhVien/laythongtinsinhvien/' + maSinhVien,
            method: 'GET',
        })
    }
}