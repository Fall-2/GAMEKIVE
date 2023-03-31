///////////////
////API KEY////
///////////////

import ourAPIKEY from "./config.js";
const gameListAPI = `https://api.rawg.io/api/games?key=${ourAPIKEY.OUR_API_KEY}`;

////////////////////
////DOM Elements////
////////////////////

const filterFormDiv = document.querySelector(".game-filter-form");
const prevButton = document.querySelector("#prev");
const nextButton = document.querySelector("#next");


////////////////////////
////Helper Functions////
////////////////////////
const fetchFrom = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

const getFilteredGames = async (e) => {
  e.preventDefault();
  let url = gameListAPI;
  const filterTerms = document.querySelectorAll('.filter-term')
  filterTerms.forEach((term) => {
    url += `&${term.name}=${term.value}`;
  });
  const data = await fetchFrom(url);
  storeResponseData(data)
  window.location.href = 'games.html'
};

const storeResponseData = function(data) {
  localStorage.setItem('responseData', JSON.stringify(data));
}

const getGames = async (gamesArray) => {
//   let allGamesData = await fetchFrom(gameListAPI);
//   allGamesData = allGamesData.results;
//   console.log(allGamesData);
//   allGamesData.forEach((game) => {
//  makeBootStrapCard(game.background_image, game.name ,game.id)
//   });
  console.log(gamesArray)
};

const setButtonUrls = (next) => {
  prevButton.url = nextButton.url
  nextButton.url = next
}

///////////////////////
////Event Listeners////
///////////////////////

document.addEventListener('DOMContentLoaded', () => {
  if(localStorage.responseData) {

  }
})
filterFormDiv.addEventListener("submit", getFilteredGames);

prevButton.addEventListener("click", () => {
  // Code to go to previous page or element
});

nextButton.addEventListener("click", () => {
  // Code to go to next page or element
});
