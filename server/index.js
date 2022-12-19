const express = require("express");
const app = express();
const cors = require("cors");
const bodyparser = require("body-parser");
const mysql = require("mysql2");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "P.bmk007@",
  database: "crud_contact",
});

app.use(cors());
app.use(express.json());
app.use(bodyparser.urlencoded({ extended: true }));

app.get("/api/get", (req, res) => {
  const sqlget = "SELECT * FROM connect_db";
  db.query(sqlget, (error, result) => {
    res.send(result);
  });
});

app.post("/api/create", (req, res) => {
  const fname = req.body.fname;
  const lname = req.body.lname;
  const location = req.body.location;
  const email = req.body.email;
  const education = req.body.education;
  const date = req.body.date;

  db.query(
    "insert into connect_db(fname,lname,location,email,education,date) VALUES(?,?,?,?,?,?)",
    [fname, lname, location, email, education, date],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.get("/api/get/:id", (req, res) => {
  const { id } = req.params;
  const sqlget = "SELECT  * FROM connect_db  WHERE id=?";
  db.query(sqlget, id, (error, result) => {
    if (error) {
      console.log(error);
    }
    res.send(result);
  });
});

app.delete("/api/remove/:id", (req, res) => {
  console.log(req.params.id);
  const id = req.params.id;
  const sqldel = `DELETE FROM connect_db WHERE id= ${id}`;
  db.query(sqldel, id, (error, result) => {
    if (error) {
      console.log(error);
    } else {
      res.send(result);
    }
  });
});




app.put("/api/update/:id",(req,res)=>{
const {id} = req.params.id;
const fname = req.body.fname;
  const lname = req.body.lname;
  const location = req.body.location;
  const email = req.body.email;
  const education = req.body.education;
  const date = req.body.date;
  const sqlupd = `UPDATE connect_db SET fname='${fname}' , lname='${lname}' , location ='${location}',email ="${email}" education="${education}",date=${date} WHERE id =${id}`;
    db.query(sqlupd, [fname, lname, location, email, education, date, id], (err,result)=>{
    if(err){
      console.log(err)
    }else{
      res.send(result)
    }
      })
})












// app.put("/api/update/:id", (req, res) => {
//   console.log(req.params.id);
//   const id = req.params;
//   const fname = req.body.fname;
//   const lname = req.body.lname;
//   const location = req.body.location;
//   const email = req.body.email;
//   const education = req.body.education;
//   const date = req.body.date;
//   db.query(
//     `UPDATE connect_db SET fname='${fname}' , lname='${lname}' , location ='${location}',email ="${email}" education="${education}",date=${date},`,
//     [fname, lname, location, email, education, date, id],
//     (err, result) => {
//       if (err) {
//         console.log(err);
//       } else {
//         res.send(result);
//       }
//     }
//   );
// });

app.listen(5000, () => {
  console.log("backend is running");
});

// app.post("/api/post", (req, res) => {
//   const { FirstName, LastName, Location, Email, DOB, Education } = req.body;
//   const sqlins =
//     "INSERT INTO connect_db(FirstName, LastName, Location, Email, DOB, Education) VALUES(?,?,?,?,?,?)";
//   db.query(
//     sqlins,
//     [FirstName, LastName, Location, Email, DOB, Education],
//     (error, result) => {
//       if (error) {
//         console.log(error);
//       }
//     }
//   );
// });

// app.get("/", (req, res) => {
//   const sqlins =
//     "INSERT INTO connect_db(FirstName, LastName, Location, Email, DOB, Education) VALUES ('Priya', 'Lakshmi', 'Madurai', 'priya525@gmail', '2001-08-02','M.Sc')";
//   db.query(sqlins, (error, result) => {
//     console.log("error", error);
//     console.log("result", result);
//     res.send("Still running");
//   });
// });
