import createGarage from "../page/garage.js"
import createWinners from "../page/winners.js"

export default function router() {
  const routes = [
    { hash: "", view: createGarage },
    { hash: "#winners", view: createWinners },
  ]

  const potentialMatches = routes.map((item) => {
    return {
      item,
      isMatch: location.hash === item.hash,
    }
  })

  let match = potentialMatches.find((item) => item.isMatch)

  if (!match) {
    match = {
      item: routes[0],
      isMatch: true,
    }
  }

  const app = document.getElementById("app")
  app.innerHTML = ""
  app.append(match.item.view())
}
