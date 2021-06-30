function DanhSachNhanVien (){
    // Thuộc tính danh sách nhân viên được lưu trong mảng
    this.arrDSNV = [],

    //Khởi tạo phương thức thêm nhân viên mới vào thuộc tính arrDSNV

    this.themNhanVien = function(nhanVien){
        this.arrDSNV.push(nhanVien)
    }

}
//Phương thức tìm vị trí nhân viên  bằng prototype
DanhSachNhanVien.prototype.timViTri = function(tkNV){
     return this.arrDSNV.findIndex(function(nv){
       return tkNV === nv.tkNv  
    })
}

//Phương thức xóa nhân viên

DanhSachNhanVien.prototype.xoaNhanVien = function(tkNV){
    var viTri = this.timViTri(tkNV)
    if(viTri !== -1){
    return this.arrDSNV.splice(viTri,1)
    }
}

//Phương thức sửa nhân viên

DanhSachNhanVien.prototype.layThongTinNV = function(tkNV){
    var viTri = this.timViTri(tkNV)
    if (viTri !== -1){
        return this.arrDSNV [viTri]
    }
}
DanhSachNhanVien.prototype.suaNhanVien = function(nhanVienSua){
    var viTri = this.timViTri(nhanVienSua.tkNv)
    if (viTri !== -1){
      return  this.arrDSNV [viTri] = nhanVienMoiSua 
    }
}
//Phương thức tìm nhân viên theo loại, trả về 1 mảng chứa chuỗi tìm kiếm
DanhSachNhanVien.prototype.timNhanVienTheoLoai = function(arrDSNV, chuoiTimKiem){
   return arrDSNV.filter(function(nv){
      return  nv.xepLoai.toLowerCase().indexOf(chuoiTimKiem.toLowerCase()) !== -1
    })

}