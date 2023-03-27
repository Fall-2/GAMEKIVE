
const allDivs = document.querySelectorAll('.cell')
const allGamesView = document.querySelector('.game-select-view')
const singleGameView = document.querySelector('.game-display')
const searchFormDiv = document.querySelector('form')
console.log(searchFormDiv)

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

const getSearchedGames = async (e) => {
    e.preventDefault()
    const searchTerm = e.target.children[0].value
    const data = await fetchFrom(`https://api.rawg.io/api/games?key=749e1b5c19c34bdd9870484338400f97&search=${searchTerm}`)
    console.log(data)
}

searchFormDiv.addEventListener('submit', getSearchedGames)


function colorAllDivs(divArray) {
    let first = 160
    let second = 0
    let third = 0
    const rgbCode =`rgb(${first}, ${second}, ${third})`
    for(let i = 0; i < divArray.length; i++) {
        divArray[i].style.backgroundColor = rgbCode
        second += 10
        third += 10
    }
}

colorAllDivs(allDivs)

allDivs.forEach(div => {
    div.addEventListener('click', clickHandler)
})

function clickHandler(e) {
    console.log(e.target)
    allGamesView.style.display = 'none'
    singleGameView.appendChild(e.target)
    e.target.classList.remove('hoverable')
    e.target.style.width = '400px'
    e.target.style.height = '500px'
}



