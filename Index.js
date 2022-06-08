const express = require("express");
const app = express();
let cors = require("cors");
app.use(cors());

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
