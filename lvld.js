import ourAPIKEY from "./config.js";

console.log(ourAPIKEY);

document.addEventListener("DOMContentLoaded", (e) => getGames());

////API
const gameListAPI = `https://api.rawg.io/api/games?key=${ourAPIKEY.OUR_API_KEY}`;
///Fetch
const fetchFrom = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

///DOM elements
const gameList = document.querySelector("#game-list");

const getGames = async () => {
  let allGamesData = await fetchFrom(gameListAPI);
  allGamesData = allGamesData.results;
  console.log(allGamesData);

  allGamesData.forEach((game) => {
    let li = document.createElement("li");
    let p = document.createElement("p");
    let div = document.createElement("div");
    let img = document.createElement("img")
    img.src = game.background_image;
    img.classList.add("game-image")
    p.innerText = game.name;

    div.append(p);
    li.append(div);
    div.append(img)
    gameList.append(li);
  });
};
