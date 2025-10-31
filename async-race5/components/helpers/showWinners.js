export default function showWinners() {
  const garagePage = document.querySelector(".garage-page")
  const winnersPage = document.querySelector(".winners-page")
  if (winnersPage.classList.contains("hide")) {
    winnersPage.classList.remove("hide")
    garagePage.classList.add("hide")
  }
}
