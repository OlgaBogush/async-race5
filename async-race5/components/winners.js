import drawWinners from "./helpers/drawWinners.js"
import { getSortedTimeWinners, getSortedWinsWinners, getWinners } from "./utils/async.js"

export async function winners() {
  const winnersArray = await getWinners()
  drawWinners(winnersArray)
}

export default function createWinners() {
  const main = document.createElement("main")
  main.classList.add("winners-page", "hide")

  const container = document.createElement("div")
  container.classList.add("container")

  // table
  const table = document.createElement("table")
  const thead = document.createElement("thead")
  const tbody = document.createElement("tbody")

  // thead
  const rowTitle = document.createElement("tr")
  rowTitle.classList.add("table-title")

  const titleNumber = document.createElement("th")
  titleNumber.textContent = "Number"

  const titleCar = document.createElement("th")
  titleCar.textContent = "Car"

  const titleName = document.createElement("th")
  titleName.textContent = "Name"

  const titleWins = document.createElement("th")
  titleWins.classList.add("title-wins")
  titleWins.textContent = "Wins"

  const titleTime = document.createElement("th")
  titleTime.classList.add("title-time")
  titleTime.textContent = "Time"

  rowTitle.append(titleNumber, titleCar, titleName, titleWins, titleTime)
  thead.append(rowTitle)


  titleTime.addEventListener("click", async () => {
    const sortedTimeWinners = await getSortedTimeWinners()
    drawWinners(sortedTimeWinners)
  })

  titleWins.addEventListener("click", async () => {
    const sortedWinsWinners = await getSortedWinsWinners()
    drawWinners(sortedWinsWinners)
  })

   // pagination
  const buttonPrev = document.createElement("button")
  buttonPrev.classList.add("prev-win")
  buttonPrev.textContent = "Prev"
  const buttonNext = document.createElement("button")
  buttonNext.classList.add("next-win")
  buttonNext.textContent = "Next"
  const paginationContainer = document.createElement("div")
  paginationContainer.classList.add("pagination-container-win")
  paginationContainer.append(buttonPrev, buttonNext)


  table.append(thead, tbody)
  container.append(table)
  container.append(paginationContainer)
  main.append(container)
  document.body.append(main)

  winners()
}
