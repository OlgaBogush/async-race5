export default function showWinners() {
  const garagePage = document.querySelector(".garage-page")
  const winnersPage = document.querySelector(".winners-page")
  const toWinnersButton = document.querySelector(".to-winners-button")
  const toGarageButton = document.querySelector(".to-garage-button")
  if (winnersPage.classList.contains("hide")) {
    winnersPage.classList.remove("hide")
    garagePage.classList.add("hide")
  }

  if (toGarageButton.classList.contains("active")) {
    toGarageButton.classList.remove("active")
    toWinnersButton.classList.add("active")
  }
}
