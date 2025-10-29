export default function showGarage() {
  const garagePage = document.querySelector(".garage-page")
  const winnersPage = document.querySelector(".winners-page")
  if (garagePage.classList.contains("hide")) {
    garagePage.classList.remove("hide")
    winnersPage.classList.add("hide")
  }
}
