import showGarage from "../helpers/showGarage.js"
import showWinners from "../helpers/showWinners.js"

export default function router() {
  const routes = [
    { hash: "", view: showGarage },
    { hash: "#garage", view: showGarage },
    { hash: "#winners", view: showWinners },
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

  match.item.view()
}
