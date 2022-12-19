import React, { useEffect, useState } from "react";
import "./adduser.css";
import axios from "axios";
import { toast } from "react-toastify";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { AiOutlineArrowLeft } from "react-icons/ai";

function Adduser() {
  const [fname, Setfname] = useState("");
  const [lname, Setlname] = useState("");
  const [location, Setlocation] = useState("");
  const [email, Setemail] = useState("");
  const [education, Seteducation] = useState("");
  const [date, Setdate] = useState(0);
  const [studentlist, Setstudentlist] = useState([]);
  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/get/${id}`)
      .then((resp) => Setstudentlist({ ...resp.data[0] }));
  }, [id]);

  const adduser = () => {
    axios
      .post("http://localhost:5000/api/create", {
        fname: fname,
        lname: lname,
        location: location,
        email: email,
        education: education,
        date: date,
      })
      .then(() => {
        Setstudentlist([
          ...studentlist,
          {
            fname: fname,
            lname: lname,
            location: location,
            email: email,
            education: education,
            date: date,
          },
        ]);

        toast.success("User added successfully");
        setTimeout(() => navigate("/"), 500);
      });

    axios
      .put(`http://localhost:5000/api/update/${id}`, {
        fname: fname,
        lname: lname,
        location: location,
        email: email,
        education: education,
        date: date,
      })
      .then(() => {
        Setstudentlist([
          ...studentlist,
          {
            fname: fname,
            lname: lname,
            location: location,
            email: email,
            education: education,
            date: date,
          },
        ]);

        toast.success("User added successfully");
        setTimeout(() => navigate("/"), 500);
      });
  };

  return (
    <div className="container">
      <Link to="/">
        <button className="arrow">
          <AiOutlineArrowLeft />
        </button>
      </Link>
      <h2>Add Student Details</h2>
      <form onSubmit={adduser}>
        <div className="row">
          <div className="col">
            <label>First Name:</label>
            <input
              type="text"
              name="fname"
              onChange={(e) => Setfname(e.target.value)}
            />
          </div>
          <div className="col">
            <label>Last Name:</label>
            <input
              type="text"
              name="lname"
              onChange={(e) => Setlname(e.target.value)}
            />
          </div>
          <div className="col">
            <label>Location :</label>
            <input
              type="text"
              name="location"
              onChange={(e) => Setlocation(e.target.value)}
            />
          </div>
          <div className="col">
            <label>Email :</label>
            <input
              type="text"
              name="email"
              onChange={(e) => Setemail(e.target.value)}
            />
          </div>
          <div className="col">
            <label>Education :</label>
            <input
              type="text"
              name="education"
              onChange={(e) => Seteducation(e.target.value)}
            />
          </div>
          <div className="col">
            <label>DOB :</label>
            <input
              type="date"
              name="date"
              onChange={(e) => Setdate(e.target.value)}
            />
          </div>
          <label>About :</label>
          <textarea name="" id="" cols="60" rows=""></textarea>
        </div>
        <button type="submit" className="bt">
          Submit
        </button>
      </form>
    </div>
  );
}
export default Adduser;
