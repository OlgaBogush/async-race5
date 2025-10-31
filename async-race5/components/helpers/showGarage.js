export default function showGarage() {
  const garagePage = document.querySelector(".garage-page")
  const winnersPage = document.querySelector(".winners-page")
  const toWinnersButton = document.querySelector(".to-winners-button")
  const toGarageButton = document.querySelector(".to-garage-button")
  if (garagePage.classList.contains("hide")) {
    garagePage.classList.remove("hide")
    winnersPage.classList.add("hide")
  }

  if (toWinnersButton.classList.contains("active")) {
    toWinnersButton.classList.remove("active")
    toGarageButton.classList.add("active")
  }
}
