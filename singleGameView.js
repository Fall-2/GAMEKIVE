///////////////
////API KEY////
///////////////

import ourAPIKEY from "./config.js";


////////////////////
////DOM Elements////
////////////////////

const gameImg = document.querySelector('#game-image')
const gameRatings = document.querySelector('#game-ratings')
const gameTitle = document.querySelector('#game-title')
const yearPublished = document.querySelector('#year-published')
const gameDeveloper = document.querySelector('#game-developer')
const gameDescription = document.querySelector('#game-description')
const gameScreenShotsDiv = document.querySelector('#game-screenshots')
console.log(gameRatings)

/////////////////
////Variables////
/////////////////

const basic = `https://api.rawg.io/api/games/`

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

const getGameScreenShots = async (gameID) => {
    const url = `${basic}${gameID}/screenshots?key=${ourAPIKEY.OUR_API_KEY}`
    const data = await fetchFrom(url)
    console.log(data)
    return data.results
}

const populateDOM = async (data) => {
    gameImg.src = data.background_image
    Array.from(gameRatings.children).forEach((child, i) => {
        child.textContent = data.ratings[i].title
    })
    gameTitle.textContent = data.name
    yearPublished.textContent = data.released.substring(0, 4)
    gameDeveloper.textContent = data.developers[0].name
    gameDescription.textContent = data.description_raw
    const screenShots = await getGameScreenShots(data.id)
    Array.from(gameScreenShotsDiv.children).forEach((child, i) => {
        child.src = screenShots[i].image
    })
}

///////////////////////
////Event Listeners////
///////////////////////

document.addEventListener("DOMContentLoaded", () => {
    const gameData = JSON.parse(localStorage.getItem('gameDataToView'))
    console.log(gameData)
    populateDOM(gameData)
})