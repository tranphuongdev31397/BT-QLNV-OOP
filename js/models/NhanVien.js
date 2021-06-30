function NhanVien(_tkNv, _hoTenNv, _email, _matKhau, _ngayLam, _luongCoBan, _chucVu, _gioLam, ) {
    this.tkNv = _tkNv;
    this.hoTenNv = _hoTenNv;
    this.email = _email;
    this.matKhau = _matKhau;
    this.ngayLam = _ngayLam;
    this.luongCoBan = _luongCoBan;
    this.chucVu = _chucVu;
    this.gioLam = _gioLam;

    // this.xepLoai = _xepLoai


    //Phương thức tính tổng luong
    this.tinhTongLuong = function(chucVu, luongCoBan){
       var tongLuong = 0
        if(chucVu === "Sếp"){
            tongLuong = luongCoBan * 3
        }else if(chucVu === "Trưởng phòng"){
            tongLuong = luongCoBan * 2
        }else{
            tongLuong = luongCoBan
        }
    return tongLuong.toLocaleString()
    }
    this.tongLuong = this.tinhTongLuong(this.chucVu, this.luongCoBan)

    //Phương thức xếp loại nhân viên
  this.xepLoaiNV = function (gioLam){
      var xepLoai = '';
      if (gioLam >= 192){
          xepLoai = "Nhân viên xuất sắc"
      }else if (gioLam >= 176 && gioLam < 192){
          xepLoai = "Nhân viên giỏi"
      }else if (gioLam >= 160){
          xepLoai = "Nhân viên khá"
      }else{
          xepLoai = "Nhân viên trung bình"
      }
      return xepLoai
  }
  this.xepLoai = this.xepLoaiNV(this.gioLam)
}