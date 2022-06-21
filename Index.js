const express = require("express");
const app = express();
let cors = require("cors");
app.use(cors());

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

let crypto = require("crypto-js");
var decrypter = require("./decrypter");

var dbConnector = require("./dbconnector");

dbConnector.connectToDB(() => {
  app.listen("3001", () => {
    console.log("PORT is running on 8000");
  });
});
var allusers = [];
var id = 0;

app.get("/login", (req, res) => {
  var emailid = req.query.emailid;
  var password = req.query.password;
  if (
    emailid === '"' + "eve.holt@reqres.in" + '"' &&
    password === '"' + "cityslicka" + '"'
  )
    res.json({ token: "token#dasdasd" + emailid + password });
  else if (emailid === '"' + "" + '"' || password === '"' + "" + '"') {
    res.json({ error: "Missing Username or Password" });
  } else {
    res.json({ error: "User not found" });
  }
});
app.listen(8000, () => {
  console.log("port 8000");
});

app.get("/user", (req, res) => {
  res.json({ result: allusers });
});

app.post("/user", (req, res) => {
  try {
    var a = req.body;
    //console.log(a);
    for (var userbody of a) {
      //console.log(userbody);
      var firstname = userbody.first_name;
      var lastname = userbody.last_name;

      for (var user of allusers) {
        if (user.first_name == firstname) {
          res.json({
            status: false,
            message: "User already exist",
            result: allusers,
          });
          return;
        }
      }
      var a = { id: id, first_name: firstname, last_name: lastname };
      id++;
      allusers.push(a);
    }

    res.json({
      status: true,
      message: "User added successfully",
      result: allusers,
    });
  } catch (ex) {
    res.json({
      status: true,
      message: ex.message,
      result: allusers,
    });
  }
});
app.post("/api/adduser", (req, res) => {
  var name = req.body.name;
  var email = req.body.email;
  var mob = req.body.mob_no;
  var password = req.body.password;

  var query =
    "insert into users (name,email,mob,password) values (" +
    "'" +
    name +
    "','" +
    email +
    "'," +
    mob +
    ",'" +
    password +
    "')";

  dbConnector.perfromDBOperation(query, (err, result) => {
    if (err) {
      console.log(err);
      res.json({ status: false, message: "User not added successfully" });
    } else {
      console.log(result);
      res.json({ status: true, message: "User added successfully" });
    }
  });
});
app.delete("/user", (req, res) => {
  // res.setHeader("Access-Control-Allow-Origin", "http://localhost:3001");
  var id = req.body.id;
  delete allusers[id];
  res.json({
    status: true,
    message: "user id=" + id + " deleted",
    result: allusers,
  });
});
