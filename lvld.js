///////////////
////API KEY////
///////////////

import ourAPIKEY from "./config.js";
const gameListAPI = `https://api.rawg.io/api/games?key=${ourAPIKEY.OUR_API_KEY}`;

////////////////////
////DOM Elements////
////////////////////

const gameList = document.querySelector('.game-list')
const filterFormDiv = document.querySelector(".game-filter-form");
const prevButton = document.querySelector("#prev");
const nextButton = document.querySelector("#next");
console.log(prevButton, nextButton)

/////////////////
////Variables////
/////////////////

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

const getFilteredGames = async (e) => {
  e.preventDefault();
  let url = gameListAPI;
  const filterTerms = document.querySelectorAll('.filter-term')
  filterTerms.forEach((term) => {
    url += `&${term.name}=${term.value}`;
  });
  const data = await fetchFrom(url);
  console.log(data)
  storeResponseData(data)
  window.location.href = 'games.html'
};

const storeResponseData = function(data) {
  localStorage.setItem('responseData', JSON.stringify(data));
}

const displayGames = async (parentElement, gamesArray) => {
  gamesArray.forEach(game => {
    const gameDiv = document.createElement('div')
    const gameImg = document.createElement('img')
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

const setButtonUrls = (next, prev) => {
  if(next !== 'undefined') {
    nextButton.url = next
  }
  if(prev !== 'undefined') {
    prevButton.url = prev
  }
  console.log(`prev URL: ${prevButton.url}`)
  console.log(`next URL: ${nextButton.url}`)
}

const reloadHTML = () => {
  window.location.reload()
}



document.addEventListener('DOMContentLoaded', () => {
  // if(localStorage.responseData) {
  //   console.log('yes')
  //   const dataConvertedToJavascript = JSON.parse(localStorage.getItem('responseData'))
  //   console.log(dataConvertedToJavascript)
  //   const nextData = await fetchFrom(dataConvertedToJavascript.next)
  //   console.log(nextData)
  //   setButtonUrls(dataConvertedToJavascript.next, dataConvertedToJavascript.prev)
  // }
  if(window.location.href === "http://127.0.0.1:5500/Projects-Weeks/Lvld/games.html") {
    getGames(gameListAPI)
  }
})

filterFormDiv.addEventListener("submit", getFilteredGames);

prevButton.addEventListener("click", (e) => {
  if(e.target.url !== undefined) { 
    getGames(e.target.url)
    console.log('prev is defined')
    reloadHTML()
  }
});

nextButton.addEventListener("click", (e) => {
  debugger;
  if(e.target.url !== undefined) { 
    getGames(e.target.url)
    console.log('next is defined')
    reloadHTML()
  }
});
