const mysql = require("mysql");

let dbServer = null;

const connectToDB = (callback) => {
  var dbDetails = mysql.createConnection({
    host: "127.0.0.1",
    port: "3306",
    user: "user",
    password: "P@ssw0rd",
    database: "test",
  });

  dbDetails.connect((err) => {
    if (err) {
      console.log(err);
    } else {
      dbServer = dbDetails;
      console.log("Connected to Database");
      callback();
    }
  });
};

function perfromDBOperation(query, callback) {
  dbServer.query(query, (err, result) => {
    callback(err, result);
  });
}

module.exports = {
  connectToDB,
  perfromDBOperation,
};
