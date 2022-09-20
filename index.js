// fs - file system - an inbuilt node package to acces file system, it can also create required files


// importing express framework for node
const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const app = express();

// filesystem
const fs = require("fs");

// first page
app.get("/", (req, res) => {
  res.send("Create file app");
});


// directory
const dir = "./Files";

if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}

// create file api endpoint
app.get("/createfile", (req, res) => {
  const today = new Date();
  const date_data =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  const time_data =
    today.getHours() +
    "hours" +
    today.getMinutes() +
    "minutes" +
    today.getSeconds();
  const date = date_data + " " + time_data;

  const file_name = `${date}.txt`;
  const file_content = date;

  fs.writeFile(`./Files/${file_name}`, file_content, (err) => {
    console.log(err);
  });

  res.send(`${file_name} created successfully`);
});

// get file api
app.get("/getfile", (req, res) => {
  let files = fs.readdirSync("./Files");
  res.send(files);
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`app started ${PORT} `);
});
