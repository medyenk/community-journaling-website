const express = require("express");
const bodyParser = require("body-parser");
const app = express();
let fs = require("fs");
const PORT = process.env.PORT || 3000;
const uniqid = require("uniqid");

//organise the files PUBLIC + VIEWS if needed
app.use(express.static("public"));
app.use(express.static("views"));
app.use("/public/posts.json", express.static("json"));
app.use("/public/img/", express.static("./public/img"));

//function to store DATA in file
function storeData(req) {
  data = getData("public/posts.json");
  data.posts.push(req);
  let myJSON = JSON.stringify(data, null, 2);
  fs.writeFileSync("public/posts.json", myJSON);
}

//function to get DATA from file
function getData() {
  let data = fs.readFileSync("public/posts.json");
  data = JSON.parse(data);
  return data;
}

//CONVERT incoming JSON using bodyparser middleware to access POST handler from form
const urlencodedParser = bodyParser.urlencoded({ extended: false });

// ROUTE - POST DATA to FORM
app.get("/public/posts.json", function (req, res) {
  res.sendFile("public/posts.json", { root: __dirname });
});

//database - data POSTED from form will be parsed through middleware
app.post("/", urlencodedParser, function (req, res) {
  console.log(req.body);
  let postId = uniqid();
  let text = req.body.post_text;
  let emoji = req.body.post_emoji;
  let gif = req.body.post_gif;
  let today = new Date();
  let date =
    today.getHours() +
    ":" +
    today.getMinutes() +
    " " +
    today.getDate() +
    "-" +
    (today.getMonth() + 1) +
    "-" +
    today.getFullYear();
  storeData({ text: text, emoji: emoji, gif: gif, date: date, postId: postId });
  res.redirect("/");
});

app.listen(PORT, function () {
  console.log(`Chirpin at ${PORT} `);
});
