fetch("./public/posts.json")
  .then(function (res) {
    return res.json();
  })
  .then(function (data) {
    let result = `<h2> User Info From sampleUser.json </h2>`;
    data.posts.forEach((user) => {
      const { text, emoji, date, postId } = user;
      console.log(data);
      var knum = "hello" + postId;
      var knum1 = "bye" + postId;
      var x = Math.floor(Math.random() * 3 + 1);
      var postImg;
      if (x == 1) {
        postImg =
          "https://image.shutterstock.com/image-vector/cute-bird-cartoon-260nw-391352887.jpg";
      } else if (x == 2) {
        postImg =
          "https://image.shutterstock.com/image-vector/cute-blue-bird-cartoon-260nw-475041199.jpg";
      } else {
        postImg =
          "https://i.pinimg.com/originals/d9/91/b4/d991b42bf742d54d3c60debba3680b5e.jpg";
      }

      result += `<div class="old-post">
                <figure>

                  <img
                    src="${postImg}"
                    alt="chirp bird"
                  />
                </figure>
                <div class="post-view">
                  <p>${text}</p>
                </div>
                <div id="${knum}" style="display: block;text-align: right;width: 86%;margin-left: 100px;"><p id = "commentArea"onclick="toggleComment('${postId}')"><i class="far fa-comments"></i></p>
    <button>&#128543;</button>
  <button>&#128515;</button>
  <button>&#128545;</button>
    
    </div>
                <div class="${knum1}" style="  display: none;">
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
                 <hr />
              </div>`;

      document.getElementById("posts_area").innerHTML = result;
    });
  });

function toggleComment(x) {
  $("#hello" + x).click(function () {
    $(".bye" + x).toggle("slide");
  });
}
