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
console.log(searchFormDiv)
console.log(filterTerms)
console.log(gameFilterForm)

/////////////////
////Variables////
/////////////////

const basic = `https://api.rawg.io/api/games/`
const gameListAPI = `https://api.rawg.io/api/games?key=${ourAPIKEY.OUR_API_KEY}`

////////////////////////
////Helper Functions////
////////////////////////

const fetchFrom = async (url) => {
    try {
        const response = await fetch(url)
        console.log(response)
        const data = await response.json()
        return data
    } catch (error) {
        console.log(error)
    }
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
      gameImg.classList.add('game-image')
      parentElement.appendChild(gameDiv)
      gameDiv.appendChild(gameImg)
      gameImg.src = game.background_image
      gameImg.id = game.id
      gameImg.alt = game.name
    });
  }

const getGames = async () => {
    const url = gameListAPI
    const data = await fetchFrom(url)
    console.log(data)
    displayGames(gameList, data.results)
}

const getSearchedGames = async (e) => {
    e.preventDefault()
    let url = gameListAPI
    const searchTerm = e.target.children[0].value
    url += `&search=${searchTerm}`
    const data = await fetchFrom(url)
    const dataToStore = data.results
    localStorage.setItem("searchedGames", JSON.stringify(dataToStore));
    console.log(localStorage.searchedGames);
    window.location.href = 'results.html'
}

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

function clickHandler(e) {
    console.log(e.target)
    allGamesView.style.display = 'none'
    singleGameView.appendChild(e.target)
    e.target.classList.remove('hoverable')
    e.target.style.width = '400px'
    e.target.style.height = '500px'
}

///////////////////////
////Event Listeners////
///////////////////////

searchFormDiv.addEventListener("submit", getSearchedGames);
gameFilterForm.addEventListener("submit", getFilteredGames);
document.addEventListener("DOMContentLoaded", getGames)