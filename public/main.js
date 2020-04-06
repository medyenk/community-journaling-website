let fs = require("fs");

function storeData(req) {
  let data = fs.readFileSync("posts.json");
  data = JSON.parse(data);
  data.posts.push(req);
  let myJSON = JSON.stringify(data, null, 2);
  fs.writeFileSync("posts.json", myJSON);
}

function getData() {
  let data = fs.readFileSync("posts.json");
  data = JSON.parse(data);
  return data;
}

storeData({
  text: "test",
  emoji: 1,
  date: "10:22 06/04/20",
});

console.log(getData());
