import React, { useState } from "react";
import "./style.css";
import axios from "axios";
import { validateMssv, validateName, validateBirthday, validateAddress } from "../../scripts/validateForm";

function AddNewPanel({ students }) {
  const [modal, setModal] = useState(false);
  const [mssv, setMssv] = useState("")
  const [name, setName] = useState("")
  const [birthday, setBirthday] = useState("")
  const [address, setAddress] = useState("")
  const [mssvError, setMssvError] = useState("");
  const [nameError, setNameError] = useState("");
  const [birthdayError, setBirthdayError] = useState("");
  const [addressError, setAddressError] = useState("");

  const handleAdd = () => {
    setModal(true);
  };
  const handleCancel = () => {
    setModal(false);
  };
  const handleSave = () => {
    const newStudent = {
      mssv: mssv,
      name: name,
      birthday: birthday,
      address: address
    }

    const mssvError = validateMssv(mssv, students);
    const nameError = validateName(name);
    const birthdayError = validateBirthday(birthday);
    const addressError = validateAddress(address);

    // Nếu có lỗi, hiển thị thông báo lỗi và không lưu dữ liệu
    if (mssvError || nameError || birthdayError || addressError) {
      setMssvError(mssvError);
      setNameError(nameError);
      setBirthdayError(birthdayError);
      setAddressError(addressError);
      return;
    }
    axios.post("http://localhost:3001/students", newStudent).then((res) => {
      console.log("Thêm mới thành công");
      setModal(false);
      window.location.reload();
    }).catch((err) => {
      console.log("Đã xảy ra lỗi", err);
    })
  };

  return (
    <div>
      <button type="button" className="btn btn-info addButton" onClick={handleAdd}>
        Thêm mới
      </button>
      {modal && (
        <div className="modal">
          <div className="addnew-panel">
            {/* Nội dung và giao diện của popup panel */}
            <form className="form-group form-group-lg" >
              <div>
                <label >Mã sinh viên:</label>
                <input className="form-control form-control-sm" type="text" onChange={(e) => setMssv(e.target.value)} />
                {mssvError && <div className="error">{mssvError}</div>}
              </div>
              <div>
                <label>Họ tên:</label>
                <input className="form-control form-control-sm" type="text" onChange={(e) => setName(e.target.value)} />
                {nameError && <div className="error">{nameError}</div>}
              </div>
              <div>
                <label>Ngày sinh:</label>
                <input className="form-control form-control-sm" type="text" onChange={(e) => setBirthday(e.target.value)} />
                {birthdayError && <div className="error">{birthdayError}</div>}
              </div>
              <div>
                <label>Quê quán:</label>
              <input className="form-control form-control-sm" type="text" onChange={(e) => setAddress(e.target.value)} />
              {addressError && <div className="error">{addressError}</div>}
              </div>
              
              <button type="button" className="save" onClick={handleSave}>Lưu</button>
              <button type="button" className="cancel" onClick={handleCancel}>Hủy</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default AddNewPanel;
