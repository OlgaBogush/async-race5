import createFooter from "./components/footer.js"
import createGarage from "./components/garage.js"
import createHeader from "./components/header.js"
import createWinners from "./components/winners.js"
import router from "./components/router/router.js"
import modifyCar from "./components/utils/listeners/modifyCar.js"

createHeader()
createGarage()
createWinners()
createFooter()

// modifyCar()


// SPA
window.addEventListener("popstate", router)

document.addEventListener("DOMContentLoaded", () => {
  document.addEventListener("click", (e) => {
    if (e.target.matches("[data-link]")) {
      e.preventDefault()
      navigateTo(e.target.href)
    }
  })
  router()
})

function navigateTo(url) {
  history.pushState(null, null, url)
  router()
}
