import React, { useState, useEffect } from "react";
import "./style.css";
import axios from "axios";
import EditPanel from "../EditPanel/editPanel";
import AddNewPanel from "../AddNewPanel/addNewPanel";

function DataTable() {
  const [data, setData] = useState([]);

  const handleUpdateStudent = (updatedStudent) => {
    const updatedData = data.map((student) => student.mssv === updatedStudent.mssv ? updatedStudent : student)
    setData(updatedData)
  }

  const handleDelete = (mssv) => {
    axios
    .delete(`http://localhost:3001/students/${mssv}`)
    .then((res) => {
      window.location.reload();
    })
    .catch((err) => console.log(err));
  }

  useEffect(() => {
    axios
      .get("http://localhost:3001/students")
      .then((res) => setData(res.data.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="container">
      <h1>Danh sách sinh viên</h1>
      <AddNewPanel students={data}/>
      <table className="content-table">
        <thead className="table-success">
          <tr>
            <th>STT</th>
            <th>Mã sinh viên</th>
            <th>Họ tên</th>
            <th>Ngày Sinh</th>
            <th>Quê Quán</th>
            <th>Chỉnh sửa</th>
            <th>Xóa</th>
          </tr>
        </thead>
        <tbody>
          {data.map((student, index) => (
            <tr key={student.mssv}>
              <td>{index + 1}</td>
              <td>{student.mssv}</td>
              <td>{student.name}</td>
              <td>{student.birthday}</td>
              <td>{student.address}</td>
              <td>
                <EditPanel student={student} updateStudent={handleUpdateStudent} />
              </td>
              <td>
                <button className="remove" onClick={() => handleDelete(student.mssv)}>Xóa</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DataTable;
