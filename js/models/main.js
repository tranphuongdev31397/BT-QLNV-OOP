function getEle(id) {
    return document.getElementById(id)
}
// Khởi tạo đối tượng dsnv từ lớp đối tượng DanhSachNhanVien
var dsnv = new DanhSachNhanVien();
//Khởi tạo đối tượng Validator từ lớp đối tượng Validator
var validator = new Validator();
// Hàm hiển thị danh sách nhân viên
var hienThiDanhSachNV = function (arrDSNV) {
    var hienThiNv = '';


    arrDSNV.map(function (nv, index) {

        hienThiNv += `
    <tr>
        <td>
         ${nv.tkNv}
        </td>
        <td>
        ${nv.hoTenNv}
        </td>
        <td>
        ${nv.email}
        </td>
        <td>
        ${nv.ngayLam}
        </td>
        <td>
        ${nv.chucVu}
        </td>
        <td>
        ${nv.tongLuong}
        </td>
        <td>
        ${nv.xepLoai}
        </td>
        <td>
        <button type="button" class="btn btn-success" onclick="layThongTinNV('${nv.tkNv}')">Sửa</button>
        <button type="button" class="btn btn-danger" onclick="_xoaNhanVien('${nv.tkNv}')">Xóa</button>
        </td>
    
    </tr>
    
                `
    })

    getEle('tableDanhSach').innerHTML = hienThiNv

}

//Lấy thông tin từ Local
var setLocalStorage = function () {
    localStorage.setItem('DSNV', JSON.stringify(dsnv.arrDSNV))
}
var getLocalStorage = function () {
    if (localStorage.getItem('DSNV')) {
        dsnv.arrDSNV = JSON.parse(localStorage.getItem('DSNV'));
        hienThiDanhSachNV(dsnv.arrDSNV)
    }
}

getLocalStorage()


function _xoaNhanVien(tkNV) {
    dsnv.xoaNhanVien(tkNV);
    hienThiDanhSachNV(dsnv.arrDSNV);
    setLocalStorage()
}

function layThongTinNV(tkNV) {
    nv = dsnv.layThongTinNV(tkNV)

 
    getEle('tknv').value = nv.tkNv
    getEle('name').value = nv.hoTenNv
    getEle('email').value = nv.email
    getEle('password').value = nv.matKhau
    getEle('datepicker').value = nv.ngayLam
    getEle('luongCB').value = nv.luongCoBan
    getEle('gioLam').value = nv.gioLam
    getEle('btnThemNV').style.display = "none"
    getEle('btnCapNhat').style.display = "block"


    //Tạo sự kiện click vào nút sửa thì gọi modal

    $('#myModal').modal('show')

}

//Hàm validation

//Tắt nút cập nhật trong modal thêm nhân viên
getEle('btnThem').addEventListener('click', function () {
    getEle('formThem').reset()
    getEle('btnCapNhat').style.display = "none"
    getEle('btnThemNV').style.display = "block"
})

//Hàm validation có sửa
function validation(tkNV, tenNV, passNV, emailNV, ngayLamNV, luongCbNV, gioLamNV, chucVuNV) {
    //Validation 
    var isValid = true;
    // Kiểm tra tài khoản
    isValid &= validator.kiemTraRong(tkNV, 'tbTKNV', '(*) Tài khoản không được để trống')
        && validator.kiemTraDoDaiKiTu(tkNV, 'tbTKNV', '(*) Tài khoản phải có độ dài từ 4-6 kí tự', 4, 6)
        && validator.kiemTraTrungTK(tkNV, 'tbTKNV', '(*) Tài khoản nhân viên bị trùng, vui lòng điền tài khoản khác', dsnv.arrDSNV)
    //Kiểm tra họ tên
    isValid &= validator.kiemTraRong(tenNV, 'tbTen', '(*) Tên nhân viên không được để trống')
        && validator.kiemTraTiengViet(tenNV, 'tbTen', '(*) Tên nhân viên phải là dạng chuỗi');
    //Kiểm tra mật khẩu
    isValid &= validator.kiemTraRong(passNV, 'tbMatKhau', '(*) Mật khẩu không được để trống')
        && validator.kiemTraMatKhau(passNV, 'tbMatKhau', '(*) Mật khẩu  phải từ 6-10 ký tự (chứa ít nhất 1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc biệt)')
    //Kiểm tra email
    isValid &= validator.kiemTraRong(emailNV, 'tbEmail', '(*) Email không được để trống')
        && validator.kiemTraEmail(emailNV, 'tbEmail', '(*) Email không đúng định dạng')
    //Kiểm tra ngày làm dạng dd/mm/yyyy
    isValid &= validator.kiemTraRong(ngayLamNV, 'tbNgay', '(*) Ngày làm không được để trống')
        && validator.kiemTraNgay(ngayLamNV, 'tbNgay', '(*) Ngày làm không đúng định dạng')
    // Kiểm tra lương cơ bản
    isValid &= validator.kiemTraRong(luongCbNV, 'tbLuongCB', '(*) Lương cơ bản không được để trống')
        && validator.kiemTraSo(luongCbNV, 'tbLuongCB', '(*) Lương cơ bản phải từ 1.000.000 đến 20.000.000', 1000000, 20000000);
    // Kiểm tra giờ làm
    isValid &= validator.kiemTraRong(gioLamNV, 'tbGiolam', '(*) Giờ làm không được để trống')
        && validator.kiemTraSo(gioLamNV, 'tbGiolam', '(*) Giờ làm phải từ 80 giờ đến 200 giờ', 80, 200);
    //Kiểm tra chức vụ
    isValid &= validator.kiemTraChucVu(chucVuNV, 'tbChucVu', '(*) Vui lòng chọn chức vụ')
    return isValid

}
getEle('btnThemNV').addEventListener('click', function () {

    //Lấy thông tin người dùng
    var tkNV = getEle('tknv').value
    var tenNV = getEle('name').value
    var emailNV = getEle('email').value
    var passNV = getEle('password').value
    var ngayLamNV = getEle('datepicker').value
    var luongCbNV = Number(getEle('luongCB').value)
    var chucVuNV = getEle('chucvu').value
    var gioLamNV = getEle('gioLam').value
    //Validation


    if (!validation(tkNV, tenNV, passNV, emailNV, ngayLamNV, luongCbNV, gioLamNV, chucVuNV)) return
    //Khởi tạo đối tượng nhanVien từ lớp đối tượng NhanVien



    var nhanVien = new NhanVien(tkNV, tenNV, emailNV, passNV, ngayLamNV, luongCbNV, chucVuNV, gioLamNV)

    //Thêm nhân viên vào dsnv
    dsnv.themNhanVien(nhanVien)
    //Hiển thị nhân viên vào bảng

    hienThiDanhSachNV(dsnv.arrDSNV)
    setLocalStorage()

})
getEle('btnCapNhat').addEventListener('click', function () {
    //Xoa form

    //Lay thong tin nhan vien
    var tkNV = getEle('tknv').value
    var tenNV = getEle('name').value
    var emailNV = getEle('email').value
    var passNV = getEle('password').value
    var ngayLamNV = getEle('datepicker').value
    var luongCbNV = Number(getEle('luongCB').value)
    var chucVuNV = getEle('chucvu').value
    var gioLamNV = getEle('gioLam').value

    //Validation 
    var isValid = true;
    // Kiểm tra tài khoản
    isValid &= validator.kiemTraRong(tkNV, 'tbTKNV', '(*) Tài khoản không được để trống')
        && validator.kiemTraDoDaiKiTu(tkNV, 'tbTKNV', '(*) Tài khoản phải có độ dài từ 4-6 kí tự', 4, 6)
    // && validator.kiemTraTrungTK(tkNV, 'tbTKNV', '(*) Tài khoản nhân viên bị trùng, vui lòng điền tài khoản khác',dsnv.arrDSNV)
    //Kiểm tra họ tên
    isValid &= validator.kiemTraRong(tenNV, 'tbTen', '(*) Tên nhân viên không được để trống')
        && validator.kiemTraTiengViet(tenNV, 'tbTen', '(*) Tên nhân viên phải là dạng chuỗi');
    //Kiểm tra mật khẩu
    isValid &= validator.kiemTraRong(passNV, 'tbMatKhau', '(*) Mật khẩu không được để trống')
        && validator.kiemTraMatKhau(passNV, 'tbMatKhau', '(*) Mật khẩu  phải từ 6-10 ký tự (chứa ít nhất 1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc biệt)')
    //Kiểm tra email
    isValid &= validator.kiemTraRong(emailNV, 'tbEmail', '(*) Email không được để trống')
        && validator.kiemTraEmail(emailNV, 'tbEmail', '(*) Email không đúng định dạng')
    //Kiểm tra ngày làm dạng dd/mm/yyyy
    isValid &= validator.kiemTraRong(ngayLamNV, 'tbNgay', '(*) Ngày làm không được để trống')
        && validator.kiemTraNgay(ngayLamNV, 'tbNgay', '(*) Ngày làm không đúng định dạng')
    // Kiểm tra lương cơ bản
    isValid &= validator.kiemTraRong(luongCbNV, 'tbLuongCB', '(*) Lương cơ bản không được để trống')
        && validator.kiemTraSo(luongCbNV, 'tbLuongCB', '(*) Lương cơ bản phải từ 1.000.000 đến 20.000.000', 1000000, 20000000);
    // Kiểm tra giờ làm
    isValid &= validator.kiemTraRong(gioLamNV, 'tbGiolam', '(*) Giờ làm không được để trống')
        && validator.kiemTraSo(gioLamNV, 'tbGiolam', '(*) Giờ làm phải từ 80 giờ đến 200 giờ', 80, 200);
    //Kiểm tra chức vụ
    isValid &= validator.kiemTraChucVu(chucVuNV, 'tbChucVu', '(*) Vui lòng chọn chức vụ')
    if (!isValid) return;



    //Tạo đối tượng nhân viên mới (object)   từ lớp đối tượng nhân viên 
    var nhanVienSua = new NhanVien(tkNV, tenNV, emailNV, passNV, ngayLamNV, luongCbNV, chucVuNV, gioLamNV)
    dsnv.suaNhanVien(nhanVienSua)
    hienThiDanhSachNV(dsnv.arrDSNV)
    setLocalStorage()

    //Ẩn modal sau khi cập nhật thành công

    getEle('btnDong').click()
})

getEle('searchName').addEventListener('keyup', function () {
    var chuoiTimKiem = getEle('searchName').value

    var mangSauTimKiem = dsnv.timNhanVienTheoLoai(dsnv.arrDSNV, chuoiTimKiem)

    hienThiDanhSachNV(mangSauTimKiem);
})
