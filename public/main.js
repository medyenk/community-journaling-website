fetch("./public/posts.json")
  .then(function (res) {
    return res.json();
  })
  .then(function (data) {
    let result = `<h2> Posts </h2>`;
    data.posts.forEach((user) => {
      const { text, emoji, gif, date, postId, comments, reactions} = user;
      console.log(data);
      var knum = "hello" + postId;
      var knum1 = "bye" + postId;
      var x = Math.floor(Math.random() * 2 + 1);
      var postImg;
      if (x == 1) {
        postImg = "/public/img/feather1.svg";
      } else {
        postImg = "/public/img/feather2.svg";
      }
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
      comment_html = ""
      if (comments.length > 0 ){
        comments.forEach((comment) => {
          comment_html += `<li>${comment}</li>`
        });
      }

      result += `<div class="old-post">
                <figure>

                  <img
                    src="${postImg}"
                    alt="chirp bird"
                  />
                </figure>
                <div class="post-view">
                <p> Feeling : ${emojiFeel} </p>
                  <p>${text}</p>
                  <div><img src="${gif}"></div>
                  <br>
                  <div class="comments">
                    <h3>comments</h3>
                    <ul>
                      ${comment_html}
                    </ul>
                  </div>
                </div>
                <div id="${knum}" style="display: block;text-align: right;width: 86%;margin-left: 100px;"><p id = "commentArea"onclick="toggleComment('${postId}')"><i class="far fa-comments"></i></p>    
 <form method="POST"
                      action="/reaction">
                      <input type="hidden" id="custId" name="custId" value="${postId}">
<input id="angry_emoji" type="button" name="post_emoji"  value="angry" /><span>&#128545;</span>
 <input id="happy_emoji" type="button"name="post_emoji"value="happy"/><span>&#128515;</span>
<input id="sad_emoji" type="button" name="post_emoji"value="sad"/><span>&#128543;</span>
 
</form>                </div>
                <div class="${knum1}" style="  display: none;">
                  <form class="comment_form" method="POST" action="/comment/${postId}">
                    <textarea name="comment_text"></textarea>
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
