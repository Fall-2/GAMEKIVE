///////////////
////API KEY////
///////////////

import ourAPIKEY from "./config.js";

////////////////////
////DOM Elements////
////////////////////

const searchFormDiv = document.querySelector('.search-form')
const gameList = document.querySelector('.game-list')
// const gameContainer = document.querySelector('.game-container')

/////////////////
////Variables////
/////////////////
const basic = `https://api.rawg.io/api/games/`
const gameListAPI = `https://api.rawg.io/api/games?key=${ourAPIKEY.OUR_API_KEY}`
const pageSize = 5

////////////////////////
////Helper Functions////
////////////////////////

const fetchFrom = async (url) => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

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
    gameImg.classList.add('game-image')
    parentElement.appendChild(gameDiv)
    gameDiv.appendChild(gameImg)
    gameImg.src = game.background_image
    gameImg.id = game.id
    gameImg.alt = game.name
  });
}

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

function clickHandler(e) {
  if (window.location.href !== "singleGameView.html") {
    const id = e.target.id;
    localStorage.setItem("gameID", JSON.stringify(id));
    window.location.href = "singleGameView.html"

  }
}

const getNewGames = async () => {
  const url = `${gameListAPI}&dates=${getDateRange()}&page_size=${pageSize}`
  const data = await fetchFrom(url)
  displayGames(gameList, data.results)
}

const getDateRange = () => {
  const timeStamp = new Date()
  const year = String(timeStamp.getFullYear())
  const month = String(timeStamp.getMonth() + 1)
  const day = String(timeStamp.getDate())
  const dateRange = `${year}-01-01,${year}-${month.length > 1 ? month : 0 + month}-${day.length > 1 ? day : 0 + day}`
  return dateRange
}

///////////////////////
////Event Listeners////
///////////////////////

document.addEventListener('DOMContentLoaded', getNewGames)
searchFormDiv.addEventListener("submit", getSearchedGames);
