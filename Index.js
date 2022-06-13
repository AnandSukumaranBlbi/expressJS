const express = require("express");
const app = express();
let cors = require("cors");
app.use(cors());

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

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
app.listen(3001, () => {
  console.log("port 3001");
});

app.get("/user", (req, res) => {
  res.json({ result: allusers });
});

app.post("/user", (req, res) => {
  //console.log(req);
  var firstname = req.body.first_name;
  var lastname = req.body.last_name;

  for (var user of allusers) {
    if (user.first_name == firstname) {
      res.json({ status: false, message: "already exist", result: allusers });
      return;
    }
  }
  var a = { id: id, first_name: firstname, last_name: lastname };
  id++;
  allusers.push(a);

  res.json({
    status: true,
    message: "User added successfully",
    result: allusers,
  });
});
