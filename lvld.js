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
const searchButtonForm = document.querySelector("#search-form")




const getGames = async () => {
  let allGamesData = await fetchFrom(
    gameListAPI + `&page_size=${gameQuantity}`
  );
  allGamesData = allGamesData.results;
  console.log(allGamesData);

  allGamesData.forEach((game) => {
 makeBootStrapCard(game.background_image, game.name ,game.id)
  });
};

function makeBootStrapCard(gameImage, title, id) {
  const cardDiv = document.createElement('div')
  cardDiv.classList.add('card')
  cardDiv.classList.add('text-bg-light')

  gameList.appendChild(cardDiv)
  const img = document.createElement('img')
  img.classList.add('card-img-top')
  img.classList.add('game-image')
  img.src = gameImage
  img.id = id
  cardDiv.appendChild(img)
  const cardBody = document.createElement('div')
  cardBody.classList.add('card-body')
  cardDiv.appendChild(cardBody)
  const cardH6 = document.createElement('h6')
  cardBody.appendChild(cardH6)
  cardH6.classList.add('card-title')
  cardH6.textContent = title
}
