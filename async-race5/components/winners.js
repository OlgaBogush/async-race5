import drawWinners from "./helpers/drawWinners.js"
import getFullInfoAboutCar from "./helpers/getFullInfoAboutCar.js"
import {
  getSortedTimeWinners,
  getSortedWinsWinners,
  getWinners,
} from "./utils/async.js"

let pageNumber = 1
let currentTotalCount

const { totalCount, res } = await getWinners(pageNumber)
const fullInfo = await getFullInfoAboutCar(res)

currentTotalCount = totalCount

export default function createWinners() {
  const main = document.createElement("main")
  main.classList.add("winners-page", "hide")

  const container = document.createElement("div")
  container.classList.add("container")

  // table
  const table = document.createElement("table")
  const thead = document.createElement("thead")
  const tbody = document.createElement("tbody")

  // total
  const totalContainer = document.createElement("div")
  totalContainer.classList.add("total-container-win")

  const textPages = document.createElement("p")
  textPages.innerText = "Page: "

  const textCars = document.createElement("p")
  textCars.innerText = "Total: "

  const counterPages = document.createElement("span")
  counterPages.classList.add("counter-pages-win")
  counterPages.textContent = pageNumber

  const totalCars = document.createElement("span")
  totalCars.classList.add("total-cars-win")
  totalCars.textContent = currentTotalCount

  textPages.append(counterPages)
  textCars.append(totalCars)
  totalContainer.append(textPages, textCars)

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
  container.append(totalContainer, table, paginationContainer)
  main.append(container)
  document.body.append(main)

  
  drawWinners(fullInfo)



   // listeners
   titleTime.addEventListener("click", async () => {
     const sortedTimeWinners = await getSortedTimeWinners(pageNumber, 5)
     const fullInfo = await getFullInfoAboutCar(sortedTimeWinners)
     drawWinners(fullInfo)
   })

  titleWins.addEventListener("click", async () => {
    const sortedWinsWinners = await getSortedWinsWinners(pageNumber, 5)
    const fullInfo = await getFullInfoAboutCar(sortedWinsWinners)
    drawWinners(fullInfo)
  })
}
