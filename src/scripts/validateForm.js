// kiểm tra mssv có đúng 8 chữ số
export const validateMssv = (mssv, students) => {
    const regex = /^\d{8}$/; // Kiểm tra có đúng 8 chữ số
    const duplicateStudent = students.find((student) => student.mssv === mssv)

    if (!mssv) {
      return "Vui lòng điền mã sinh viên"
    } else if (!regex.test(mssv)) {
      return "Mã sinh viên không hợp lệ. Mã sinh viên chỉ có 8 chữ số"
    } else if (duplicateStudent) {
      return "Mã sinh viên đã tồn tại"
    }
    
    return null;
  }
  
  // kiểm tra họ tên sinh viên
  export const validateName = (name) => {
    if (!name) {
      return "Vui lòng điền họ tên"
    } else if (name.length > 100) {
      return "Dộ dài không được quá 100 ký tự"
    }
    
    return null;
  }
  
  // kiểm tra quê quán
  export const validateAddress = (address) => {
    if (!address) {
      return "Vui lòng điền quê quán"
    } else if (address.length > 100) {
      return "Dộ dài không được quá 100 ký tự"
    }
    
    return null;
  }
  
  // kiểm tra ngày sinh
  export const validateBirthday = (birthday) => {
    if (!birthday) {
      return "Vui lòng nhập ngày tháng năm sinh"
    } 
    const regex = /^\d{2}\/\d{2}\/\d{4}$/; // Kiểm tra định dạng dd/mm/yyyy
    if (!regex.test(birthday)) {
      return "Định dạng ngày sinh không hợp lệ";
    }
    
    const day = parseInt(birthday.substring(0,2));
    const month = parseInt(birthday.substring(3,5));
    const year = parseInt(birthday.substring(6));

    if (!isValidBirthday(day, month, year)) {
      return "Ngày tháng năm sinh không hợp lệ";
    }

    return null;
  }

  const isValidBirthday = (day, month, year) => {
    if (month < 1 || month > 12) {
      return false;
    }
  
    if (month === 2) {
      if (year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0)) {
        if (day < 1 || day > 29) {
          return false;
        }
      } else {
        if (day < 1 || day > 28) {
          return false;
        }
      }
    } else if ([4, 6, 9, 11].includes(month)) {
      if (day < 1 || day > 30) {
        return false;
      }
    } else {
      if (day < 1 || day > 31) {
        return false;
      }
    }
  
    return true;
  };
  