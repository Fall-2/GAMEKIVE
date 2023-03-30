const allDivs = document.querySelectorAll(".cell");
const allGamesView = document.querySelector(".game-select-view");
const singleGameView = document.querySelector(".game-display");
const searchFormDiv = document.querySelector(".search-form");
const gameFilterForm = document.querySelector(".game-filter");
const gameFilterInput = document.querySelector("#game-filter-input");


const fetchFrom = async (url) => {
  try {
    const response = await fetch(url);
    console.log(response);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

const getSearchedGames = async (e) => {
  e.preventDefault();
  const searchTerm = e.target.children[0].value;
  const data = await fetchFrom(
    `https://api.rawg.io/api/games?key=749e1b5c19c34bdd9870484338400f97&search=${searchTerm}`
  );
  console.log(localStorage);
  localStorage.setItem("data", JSON.stringify(data));
};

const getFilteredGames = async (e) => {
  let url = `https://api.rawg.io/api/games?key=749e1b5c19c34bdd9870484338400f97`;
  const genreTerm = document.querySelector("#genres");
  const platformTerm = document.querySelector("#platforms");
  const filterTerms = [genreTerm, platformTerm];
  filterTerms.forEach((term) => {
    url += `&${term.name}=${term.value}`;
  });
  const data = await fetchFrom(url);
  console.log(data);
};

searchFormDiv.addEventListener("submit", getSearchedGames);
gameFilterInput.addEventListener("click", getFilteredGames);

allDivs.forEach((div) => {
  div.addEventListener("click", clickHandler);
});

function clickHandler(e) {
  if (window.location.href !== "singleGameView.html") {
    const id = e.target.id;
    localStorage.setItem("gameID", JSON.stringify(id));
    window.location.href = "singleGameView.html"

  }
}
