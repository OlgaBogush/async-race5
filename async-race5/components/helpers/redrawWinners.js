import { getWinners } from "../utils/async.js"
import drawWinners from "./drawWinners.js"
import getFullInfoAboutCar from "./getFullInfoAboutCar.js"

export default async function redrawWinners() {
  const { totalCount, res } = await getWinners()
  const totalWin = document.querySelector(".total-cars-win")
  totalWin.textContent = totalCount
  const pageWin = document.querySelector(".counter-pages-win")
  pageWin.textContent = 1
  const fullInfo = await getFullInfoAboutCar(res)
  drawWinners(fullInfo)
}
