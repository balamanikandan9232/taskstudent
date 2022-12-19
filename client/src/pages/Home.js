import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./home.css";
import axios from "axios";
import { FaUserEdit } from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";
import { RiSearchLine } from "react-icons/ri";
import { toast } from "react-toastify";

function Home() {

  const [data, setData] = useState([]);
  const loadData = async () => {
    const res = await axios.get("http://localhost:5000/api/get");
    setData(res.data);
  };
  useEffect(() => {
    loadData();
  }, []);

  const deleteoption = (id) => {
    if (window.confirm("Are you sure you want to Delete")) {
      axios.delete(`http://localhost:5000/api/remove/${id}`);
      toast.success("Deleted successfully");
      setTimeout(() => loadData(), 500);
    }
  };

 

  return (
    <div style={{ marginTop: "180px" }}>
      <div className="head">
        <h1> Student management system</h1>
      </div>
      <div className="navbar">
        <input type="text" placeholder="Search" />
        <span>
          <RiSearchLine />
        </span>
        <div className="button">
          <Link to="/adduser">
            <button className="btn-add"> Add</button>
          </Link>
        </div>
      </div>
      <table className="styled-table">
        <thead>
          <tr>
            <th style={{ textAlign: "center" }}>ID</th>
            <th style={{ textAlign: "center" }}>First Name</th>
            <th style={{ textAlign: "center" }}>Last Name</th>
            <th style={{ textAlign: "center" }}>Location</th>
            <th style={{ textAlign: "center" }}>Email</th>
            <th style={{ textAlign: "center" }}>DOB</th>
            <th style={{ textAlign: "center" }}>Education</th>
            <th style={{ textAlign: "center" }}>Action</th>
            <th style={{ textAlign: "center" }}>Delete</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => {
            return (
              <tr key={item.id}>
                <th scope="row">{index + 1}</th>
                <td>{item.fname}</td>
                <td>{item.lname}</td>
                <td>{item.location}</td>
                <td>{item.email}</td>
                <td>{item.date}</td>
                <td>{item.education}</td>
                <td>
                  <Link to={`/update/${item.id}`}>
                    <button
                      className="btn btn-edit"
                    >
                      <FaUserEdit />
                      Edit
                    </button>
                  </Link>
                </td>
                <td>
                  <Link>
                    <button
                      className="btn btn-delete"
                      onClick={() => deleteoption(item.id)}
                    >
                      <RiDeleteBinLine />
                      Delete
                    </button>
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Home;
