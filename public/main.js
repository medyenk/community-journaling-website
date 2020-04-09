fetch("./public/posts.json")
  .then(function (res) {
    return res.json();
  })
  .then(function (data) {
    let result = "";
    data.posts.forEach((user) => {
      const { text, emoji, gif, date, postId, comments, reactions } = user;
      console.log(data);
      var commentSection = "comment" + postId;
      var commentFormArea = "form" + postId;

      // Display the random number to get the images
      var x = Math.floor(Math.random() * 2 + 1);
      var postImg;
      if (x == 1) {
        postImg =
          "https://image.shutterstock.com/image-vector/vector-bird-feather-wing-isolated-260nw-1550400506.jpg";
      } else {
        postImg = "/public/img/feather2.svg";
      }

      // Display the emoji feeling
      var emojiFeel;
      if (emoji == "angry") {
        emojiFeel = "<span>&#128545;</span>";
      } else if (emoji == "happy") {
        emojiFeel = "<span>&#128515;</span>";
      } else if (emoji == "sad") {
        emojiFeel = "<span>&#128543;</span>";
      } else {
        emojiFeel = "<span>&#129296;</span>";
      }

      //counts the number of comment
      var commentCount = 0;
      comment_html = "";
      if (comments.length > 0) {
        comments.forEach((comment) => {
          comment_html += `<div class="post_commentArea">
                    <figure>

                  <img
                    src="${postImg}"
                    alt="chirp bird"
                  /></figure>
                  <div class="post_commentView">${comment}</div></div>`;
          commentCount += 1;
        });
      }

      //check whether the gif data is empty or not
      var postGif;
      if (!gif) {
        postGif = "";
      } else {
        postGif = `<img src="${gif}">`;
      }

      //output the result in the index file from js
      result =
        `<div class="old-post">
                    <figure>
                      <img src="${postImg}" alt="chirp bird"/>
                    </figure>
                    <div class="post-view">
                      <p> Feeling : ${emojiFeel} 
                        <span style="text-align:right;float:right;font-size:15px;">
                          <i style='font-size:15px' class='far'>&#xf274;</i> : ${date}
                        </span>
                      </p>
                      <hr>
                      <p>${text}</p>
                      <div class ="gifDiv">
                        ${postGif}
                      </div>
                    </div>
                    <div class = "commentButton1" id="${commentSection}" >
                      <p id = "commentArea">
                        <button class="reactionButton" onclick="toggleComment('${postId}')">&#128172;
                          <sup>${commentCount}</sup>
                        </button>
                        <form method="POST" action="/reaction" >
                          <input type="hidden" id="custId" name="custId" value="${postId}">
                          <button class="reactionButton" id="angry_emoji"  name="post_emoji"  value="angry" onclick="react('${postId}', 'angry')">&#128545;
                            <sup>${reactions.angry}</sup>
                          </button>
                          <button class="reactionButton" id="happy_emoji" name="post_emoji"value="happy" onclick="react('${postId}', 'happy')">&#128515;
                            <sup>${reactions.happy}</sup>
                          </button>
                          <button class="reactionButton"id="sad_emoji" name="post_emoji"value="sad" onclick="react('${postId}', 'sad')">&#128543;
                            <sup>${reactions.sad}</sup>
                          </button>
                        </form>
                      </p>
                    </div>
                    <div class="${commentFormArea}" style="  display: none;">
                      <form class="comment_form" method="POST" action="/comment/${postId}">
                        <textarea name="comment_text" required></textarea>
                        <input type="submit" name="postComment" value="&#9998;Send" id="commentButton"/>
                      </form>
                      <h2>  Comments .....✍ </h2>
                        ${comment_html}
                    </div>
                    <hr />
                  </div>` + result;
      document.getElementById("posts_area").innerHTML = result;
    });
  });

function toggleComment(x) {
  $(".form" + x).toggle("slide");
}

function react(id, emotion) {
  $.post(
    "/reaction",
    {
      postId: id,
      emotion: emotion,
    },
    function () {
      alert("You reacted to this post!");
    }
  );
}
