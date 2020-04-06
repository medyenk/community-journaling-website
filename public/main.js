document
  .getElementById("post_button")
  .addEventListener("click", function (event) {
    event.preventDefault();
  });

$(document).ready(function () {
  $("#show").click(function () {
    $(".menu").toggle("slide");
  });
});
const fs = require("fs");
function storeData(req) {
  let data = readFileSync("posts.json");
  data = JSON.parse(data);
  data.posts.push(req);
  let myJSON = JSON.stringify(data, null, 2);
  writeFileSync("posts.json", myJSON);
}

function getData() {
  let data = readFileSync("posts.json");
  data = JSON.parse(data);
  return data;
}

storeData({
  text: "test",
  emoji: 1,
  date: "10:22 06/04/20",
});

console.log(getData());
