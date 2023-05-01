import express, { Request, Response } from "express";
import mysql from "mysql";
import dotenv from "dotenv";
dotenv.config();

const db = mysql.createConnection({
  host: "ble5mmo2o5v9oouq.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
  user: "ae2lzow8zrsu97xc",
  password: "s8a4cjf07lvmqs6d",
  database: "clhrth8neqgj39np",
});

// host = ble5mmo2o5v9oouq.cbetxkdyhwsb.us-east-1.rds.amazonaws.com
// user = ae2lzow8zrsu97xc
// password = s8a4cjf07lvmqs6d
// database = clhrth8neqgj39np

const app = express();

const port = 4000 || process.env.PORT;

app.use(express.json());

// if (process.env.NODE_ENV == "production") {
//   app.use(express.static("client/build"));
//   const path = require("path");
//   app.get("*", (req, res) => {
//     res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
//   });
// }

app.get("/allitems", (req, res) => {
  const sql = "SELECT * FROM todolist";
  db.query(sql, (err, data) => {
    if (err) {
      return res.json(err);
    } else {
      return res.json(data);
    }
  });
});

app.post("/newitem", (req, res) => {
  const name = req.body.name;
  const sql = "INSERT INTO `todolist` (`name`) VALUES (?)";
  db.query(sql, [name], (err, data) => {
    if (err) {
      return res.json(err);
    } else {
      return res.json(data);
    }
  });
});

app.post("/checkitem", (req, res) => {
  const { id, done_status } = req.body;
  const update_done_status = done_status === 1 ? 0 : 1;
  const sql = "UPDATE `todolist` SET `done_status` = '?' WHERE (`id` = ? )";
  //UPDATE `clhrth8neqgj39np`.`todolist` SET `delete_status` = '1' WHERE (`id` = '1');
  db.query(sql, [update_done_status, id], (err, data) => {
    if (err) {
      return res.json(err);
    } else {
      return res.json(data);
    }
  });
});

app.post("/deleteitem", (req, res) => {
  const { id } = req.body;
  const sql = "UPDATE `todolist` SET `delete_status` = '1' WHERE (`id` = ? )";
  //UPDATE `clhrth8neqgj39np`.`todolist` SET `delete_status` = '1' WHERE (`id` = '1');
  db.query(sql, [id], (err, data) => {
    if (err) {
      return res.json(err);
    } else {
      return res.json(data);
    }
  });
});

// INSERT INTO `clhrth8neqgj39np`.`todolist` (`name`) VALUES ('Sleep');

app.listen(port, () => {
  console.log("Server is running on " + port);
});
