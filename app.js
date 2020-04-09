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
  let commentText = req.body.comment_text;
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
  storeData({
    text: text,
    emoji: emoji,
    date: date,
    gif: gif,
    postId: postId,
    comments: [],
    reactions: {
      angry: 0,
      happy: 0,
      sad: 0,
    },
  });
  res.redirect("/");
});

app.post("/comment/:postId", urlencodedParser, function (req, res) {
  console.log(req.body);
  let postId = req.params.postId;
  let text = req.body.comment_text;
  let data = getData();
  data.posts.forEach((post) => {
    if (post.postId == postId) {
      post.comments.push(text);
    }
  });

  let myJSON = JSON.stringify(data, null, 2);
  fs.writeFileSync("public\\posts.json", myJSON);

  res.redirect("/");
});

app.post("/reaction", urlencodedParser, function (req, res) {
  console.log(req.body);

  let postId = req.body.postId;
  let emotion = req.body.emotion;

  let data = getData();
  data.posts.forEach((post) => {
    if (post.postId == postId) {
      if (emotion == "angry") {
        post.reactions.angry += 1;
      } else if (emotion == "happy") {
        post.reactions.happy += 1;
      } else if (emotion == "sad") {
        post.reactions.sad += 1;
      }
    }
  });

  let myJSON = JSON.stringify(data, null, 2);
  fs.writeFileSync("public\\posts.json", myJSON);

  res.redirect("/");
});

app.listen(PORT, function () {
  console.log(`Chirpin at ${PORT} `);
});
