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

let gameQuantity = 5;
///DOM elements
const gameList = document.querySelector("#game-list");

const getGames = async () => {
  let allGamesData = await fetchFrom(
    gameListAPI + `&page_size=${gameQuantity}`
  );
  allGamesData = allGamesData.results;
  console.log(allGamesData);

  allGamesData.forEach((game) => {
    let p = document.createElement("p");
    let div = document.createElement("div");
    let img = document.createElement("img");
    img.src = game.background_image;
    img.classList.add("game-image");
    div.classList.add("cell")
    div.addEventListener("click", clickHandler);

    
    img.id = game.id;
    p.innerText = game.name;

    div.append(p);
    div.append(img);
    gameList.append(div);
  });
};
