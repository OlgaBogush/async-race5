import app from "./components/app.js"
import createFooter from "./components/page/footer.js"
import createHeader from "./components/page/header.js"
import router from "./components/router/router.js"

createHeader()
app()
createFooter()


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
