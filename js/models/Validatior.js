function Validator() {

    //Phương thức kiểm tra rỗng
    this.kiemTraRong = function (value, spanId, mess) {
        if (!value) {
            getEle(spanId).innerHTML = mess
            getEle(spanId).style.display = 'block'
            return false
        }

        getEle(spanId).innerHTML = ' '
        getEle(spanId).style.display = 'none'
        return true
    }
    //Phương thức kiểm tra trùng ký tự
    this.kiemTraTrungTK = function (value, spanId, mess, arrDSNV) {
      if(arrDSNV.length > 0){
           for (var i = 0; i < arrDSNV.length; i++) {
            if (value === arrDSNV[i].tkNv) {
                console.log(arrDSNV[i].tkNv)
                getEle(spanId).innerHTML = mess
                getEle(spanId).style.display = 'block'
                return false
            }
        }
    }
    getEle(spanId).innerHTML = ' '
    getEle(spanId).style.display = 'none'
    return true
}

    //Phương thức kiểm tra độ dài kí tự
    this.kiemTraDoDaiKiTu = function (value, spanId, mess, min, max) {
        if (value.length < min || value.length > max) {
            getEle(spanId).innerHTML = mess
            getEle(spanId).style.display = 'block'
            return false
        }

        getEle(spanId).innerHTML = ' '
        getEle(spanId).style.display = 'none'
        return true
    }
    //Phương thức kiếm tra chuỗi tiếng việt
    this.kiemTraTiengViet = function (value, spanId, mess) {
        var pattern = new RegExp("^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" +
            "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" +
            "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$")
        if (pattern.test(value)) {
            getEle(spanId).innerHTML = ' '
            getEle(spanId).style.display = 'none'
            return true
        }
        getEle(spanId).innerHTML = mess
        getEle(spanId).style.display = 'block'
        return false
    }
    //Phương thức kiểm tra mật khẩu
    this.kiemTraMatKhau = function (value, spanId, mess) {
        var pattern = new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,10}$")
        if (pattern.test(value)) {
            getEle(spanId).innerHTML = ' '
            getEle(spanId).style.display = 'none'
            return true
        }
        getEle(spanId).innerHTML = mess
        getEle(spanId).style.display = 'block'
        return false
    }
    //Phương thức kiểm tra email

    this.kiemTraEmail = function (value, spanId, mess) {
        var pattern = new RegExp("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")
        if (pattern.test(value)) {
            getEle(spanId).innerHTML = ' '
            getEle(spanId).style.display = 'none'
            return true
        }
        getEle(spanId).innerHTML = mess
        getEle(spanId).style.display = 'block'
        return false
    }
    //Phương thức kiểm tra ngày dạng dd/mm/yyy

    this.kiemTraNgay = function (value, spanId, mess) {
        var pattern = new RegExp("^((0?[1-9]|1[012])[- /.](0?[1-9]|[12][0-9]|3[01])[- /.](19|20)?[0-9]{2})*$")
        if (pattern.test(value)) {
            getEle(spanId).innerHTML = ' '
            getEle(spanId).style.display = 'none'
            return true
        }
        getEle(spanId).innerHTML = mess
        getEle(spanId).style.display = 'block'
        return false
    }
    // Phương thức kiểm tra lương cơ bản
    this.kiemTraSo = function (value, spanId, mess, min, max) {
        if (value >= min && value <= max) {
            getEle(spanId).innerHTML = ' '
            getEle(spanId).style.display = 'none'
            return true
        }
        getEle(spanId).innerHTML = mess
        getEle(spanId).style.display = 'block'
        return false
    }
    // Phương thức kiểm tra chức vụ
    this.kiemTraChucVu = function (value, spanId, mess) {
        if (value === "Chọn chức vụ") {
            getEle(spanId).innerHTML = mess
            getEle(spanId).style.display = 'block'
            return false
        }
        getEle(spanId).innerHTML = ' '
        getEle(spanId).style.display = 'none'
        return true
    }
}