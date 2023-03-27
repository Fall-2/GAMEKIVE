const allDivs = document.querySelectorAll('.cell')
const allGamesView = document.querySelector('.game-select-view')
const singleGameView = document.querySelector('.game-display')
console.log(singleGameView)


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



function showGame() {

}

