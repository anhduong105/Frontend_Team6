import React, { useState } from "react";
import "./style.css";
import axios from "axios";

function EditPanel({ student, updateStudent }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newData, setNewData] = useState({
    mssv: student.mssv,
    name: student.name,
    birthday: student.birthday,
    address: student.address,
  });
  const handleEdit = () => {
    setIsEditing(true);
  };
  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleSave = (mssv) => {
    axios
      .put(`http://localhost:3001/students/${mssv}`, newData)
      .then((res) => {
        console.log("Thông tin sinh viên đã được lưu.", newData);
        updateStudent(newData)
      })
      .catch((error) => {
        console.log("Đã xảy ra lỗi khi lưu thông tin sinh viên:", error);
      });
    setIsEditing(false);
  };

  return (
    <div>
      <button className="edit" onClick={handleEdit}>Sửa</button>

      {isEditing && (
        <div className="modal">
          <div className="popup-panel">
            <form className="form">
              <div className="input-field">
                <label>Mã sinh viên:</label>
                <input type="text" value={student.mssv} disabled />
              </div>

              <div className="input-field">
                <label>Họ tên:</label>
                <input
                  type="text"
                  value={newData.name}
                  onChange={(e) => setNewData({ ...newData, name: e.target.value })}
                />
              </div>

              <div className="input-field">
                <label>Ngày sinh:</label>
                <input
                  type="text"
                  value={newData.birthday}
                  onChange={(e) =>
                    setNewData({ ...newData, birthday: e.target.value })
                  }
                />
              </div>

              <div className="input-field">
                <label>Quê quán:</label>
                <input
                  type="text"
                  value={newData.address}
                  onChange={(e) =>
                    setNewData({ ...newData, address: e.target.value })
                  }
                />
              </div>

              <button className="save" onClick={() => handleSave(student.mssv)}>Lưu</button>
              <button className="cancel" onClick={handleCancel}>Hủy</button>
            </form>
          </div>
        </div>

      )}
    </div>
  );
}

export default EditPanel;
