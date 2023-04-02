///////////////
////API KEY////
///////////////

import ourAPIKEY from "./config.js";

////////////////////
////DOM Elements////
////////////////////

const gameList = document.querySelector('.game-list')
const searchFormDiv = document.querySelector('.search-form')
const gameFilterForm = document.querySelector('.game-filter-form')
const filterTerms = document.querySelectorAll('.filter-term')
const prevButton = document.querySelector("#prev");
const nextButton = document.querySelector("#next");
console.log(prevButton, nextButton)

/////////////////
////Variables////
/////////////////

const basic = `https://api.rawg.io/api/games/`
const gameListAPI = `https://api.rawg.io/api/games?key=${ourAPIKEY.OUR_API_KEY}`;
const prevGameResults = null
const currentGameResults = null
const nextGameResults = null

////////////////////////
////Helper Functions////
////////////////////////

const fetchFrom = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  console.log(data)
  return data;
};

const getSearchedGames = async (e) => {
  e.preventDefault();
  const searchTerm = e.target.children[0].value;
  console.log(searchTerm)
  const data = await fetchFrom(
    `https://api.rawg.io/api/games?key=749e1b5c19c34bdd9870484338400f97&search=${searchTerm}`
    );
  const dataToStore = data.results
  localStorage.setItem("searchedGames", JSON.stringify(dataToStore));
  console.log(localStorage.searchedGames);
  window.location.href = 'results.html'
};

const getFilteredGames = async (e) => {
  e.preventDefault();
  let url = gameListAPI
  filterTerms.forEach(term => {
      url += `&${term.name}=${term.value}`
  })
  const data = await fetchFrom(url)
  const dataToStore = data.results
  localStorage.setItem("searchedGames", JSON.stringify(dataToStore));
  console.log(localStorage.searchedGames);
  window.location.href = 'results.html'
}

const storeResponseData = function(data) {
  localStorage.setItem('responseData', JSON.stringify(data));
}

const getClickedGameInfo = async (e) => {
  const gameID = e.target.id
  const url = `${basic}${gameID}?key=${ourAPIKEY.OUR_API_KEY}`
  console.log(url)
  const data = await fetchFrom(url)
  localStorage.setItem('gameDataToView', JSON.stringify(data))
  window.location.href = 'singleGameView.html'
}

const displayGames = async (parentElement, gamesArray) => {
  gamesArray.forEach(game => {
    const gameDiv = document.createElement('div')
    const gameImg = document.createElement('img')
    gameDiv.addEventListener('click', getClickedGameInfo)
    gameDiv.classList.add('game-container')
    parentElement.appendChild(gameDiv)
    gameDiv.appendChild(gameImg)
    gameImg.src = game.background_image
    gameImg.id = game.id
    gameImg.alt = game.name
  });
}

const getGames = async (gamesURL) => {
  const data = await fetchFrom(gamesURL)
  displayGames(gameList, data.results)
  // storeResponseData(data)
  // console.log(data)
};

///////////////////////
////Event Listeners////
///////////////////////

document.addEventListener('DOMContentLoaded', () => {
  const gamesToDisplay = JSON.parse(localStorage.getItem('searchedGames'));
  console.log(gamesToDisplay)
  displayGames(gameList, gamesToDisplay)
})

searchFormDiv.addEventListener("submit", getSearchedGames);
gameFilterForm.addEventListener("submit", getFilteredGames);

// filterFormDiv.addEventListener("click", getFilteredGames);

// prevButton.addEventListener("click", (e) => {
//   if(e.target.url !== undefined) { 
//     getGames(e.target.url)
//     console.log('prev is defined')
//     reloadHTML()
//   }
// });

// nextButton.addEventListener("click", (e) => {
//   debugger;
//   if(e.target.url !== undefined) { 
//     getGames(e.target.url)
//     console.log('next is defined')
//     reloadHTML()
//   }
// });
