let APIKEY = "3hCltGy9xgccjmuZAmAeSEBFMy4g6PV4";

document.addEventListener("DOMContentLoaded", init);

function init() {

  document.getElementById("btnSearch").addEventListener("click", (ev) => {
    ev.preventDefault();
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
          //   let fc = document.createElement("figcaption");
          input.type = "image";
          input.src = content.data[i].images.fixed_height_small.url;
          input.alt = content.data[i].title;
          input.id = `gif${i}`;
          //   fc.textContent = content.data[i].title;
          fig.appendChild(input);
          //   fig.appendChild(fc);
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
