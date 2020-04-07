const express = require("express");
const bodyParser = require("body-parser");
const app = express();
let fs = require("fs");
const PORT = process.env.PORT || 3000;

//organise the files PUBLIC + VIEWS if needed
app.use(express.static("public"));
app.use(express.static("views"));

//function to store DATA in file
function storeData(req) {
  data = getData("public\\posts.json");
  data.posts.push(req);
  let myJSON = JSON.stringify(data, null, 2);
  fs.writeFileSync("public\\posts.json", myJSON);
}

//function to get DATA from file
function getData() {
  let data = fs.readFileSync("public\\posts.json");
  data = JSON.parse(data);
  return data;
}

//CONVERT incoming JSON using bodyparser middleware to access POST handler from form
const urlencodedParser = bodyParser.urlencoded({ extended: false });

//MAIN ROUTE + Link page
app.get("/", function (req, res) {
  console.log("hello world");
  // res.sendFile(__dirname + '');
});

// ROUTE - POST DATA to FORM
//database - data POSTED from form will be parsed through middleware
app.post("/", urlencodedParser, function (req, res) {
  console.log(req.body);
  let text = req.body.post_text;
  let emoji = req.body.post_emoji;
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
  storeData({ text: text, emoji: emoji, date: date });
  res.redirect("/");
});

app.listen(PORT, function () {
  console.log(`Chirpin at ${PORT} `);
});
