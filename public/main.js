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

fetch("./public/posts.json")
  .then(function (res) {
    return res.json();
  })
  .then(function (data) {
    let result = `<h2> User Info From sampleUser.json </h2>`;
    data.posts.forEach((user) => {
      const { text, emoji, date } = user;
      console.log(data);
      result += `<div class="old-post">
                <figure>
                  <img
                    src="https://www.owlkids.com/wp-content/uploads/2017/02/chirp-pencil-for-slug-e1487097360834-1024x910.jpg"
                    alt="chirp bird"
                  />
                </figure>
                <div class="post-view">
                  <p>${text}</p>
                </div>
                <div id="show"><p onclick="toggleComment()"><i class="far fa-comments"> Comment</i></p></div>
                <div class="menu">
                  <form class="comment_form" method="POST">
                    <textarea name="comment_content"></textarea>
                    <input
                      type="submit"
                      name="postComment"
                      value="Post"
                      id="commentButton"
                    />
                  </form>
                </div>
              </div>`;

      document.getElementById("posts_area").innerHTML = result;
      //document.getElementsByClassName("posts_area").innerHTML = result;
    });
  });
function toggleComment() {
  $("#show").click(function () {
    $(".menu").toggle("slide");
  });
}
