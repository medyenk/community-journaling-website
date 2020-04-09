let APIKEY = "O2Vhyd5znhyX7XwmlBSBQsorIDyucMhC";

document.addEventListener("DOMContentLoaded", init);

function init() {

  document.getElementById("btnSearch").addEventListener("click", (ev) => {
    ev.preventDefault();
    for (let j = 0; j < 12; j++) {
      document.getElementById(`div${j}`).innerHTML = "";
    }
    let url = `https://api.giphy.com/v1/gifs/search?api_key=${APIKEY}&limit=12&q=`;
    let str = document.getElementById("search").value.trim();
    url = url.concat(str);
    console.log(url);
    fetch(url)
      .then((response) => response.json())
      .then((content) => {
        for (let i = 0; i < 12; i++) {
          console.log(content.data);
          console.log("META", content.meta);
          let fig = document.createElement("figure");
          let input = document.createElement("input");
          input.type = "image";
          input.src = content.data[i].images.fixed_height_small.url;
          input.alt = content.data[i].title;
          input.id = `gif${i}`;
          fig.appendChild(input);
          let out = document.querySelector(`.out${i}`);
          out.insertAdjacentElement("afterbegin", fig);
          document.querySelector("#search").value = "";
        }
      })
      .catch((err) => {
        console.error(err);
      });
  });
}
