import drawWinners from "./helpers/drawWinners.js"
import getFullInfoAboutCar from "./helpers/getFullInfoAboutCar.js"
import {
  getSortedTimeWinners,
  getSortedWinsWinners,
  getWinners,
} from "./utils/async.js"

let pageNumber = 1

const { totalCount, res } = await getWinners(pageNumber)
const fullInfo = await getFullInfoAboutCar(res)

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
  totalCars.textContent = totalCount

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
  titleWins.classList.add("title-wins", "not-status")
  titleWins.textContent = "Wins"

  const titleTime = document.createElement("th")
  titleTime.classList.add("title-time", "not-status")
  titleTime.textContent = "Time"

  rowTitle.append(titleNumber, titleCar, titleName, titleWins, titleTime)
  thead.append(rowTitle)

  // pagination
  const buttonPrev = document.createElement("button")
  buttonPrev.classList.add("prev-win")
  buttonPrev.textContent = "Prev"
  buttonPrev.disabled = pageNumber === 1
  const buttonNext = document.createElement("button")
  buttonNext.classList.add("next-win")
  buttonNext.textContent = "Next"
  if (pageNumber === Math.ceil(totalCount / 5) || totalCount == 0) {
    buttonNext.disabled = true
  } else buttonNext.disabled = false
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
    if (titleWins.classList.contains("asc")) {
      titleWins.classList.remove("asc")
      titleWins.classList.add("not-status")
    } else if (titleWins.classList.contains("desc")) {
      titleWins.classList.remove("desc")
      titleWins.classList.add("not-status")
    }

    if (titleTime.classList.contains("not-status")) {
      titleTime.classList.remove("not-status")
      titleTime.classList.add("asc")
      const sortedTimeWinners = await getSortedTimeWinners(pageNumber, 5, "ASC")
      const fullInfo = await getFullInfoAboutCar(sortedTimeWinners)
      drawWinners(fullInfo)
    } else if (titleTime.classList.contains("asc")) {
      titleTime.classList.remove("asc")
      titleTime.classList.add("desc")
      const sortedTimeWinners = await getSortedTimeWinners(
        pageNumber,
        5,
        "DESC"
      )
      const fullInfo = await getFullInfoAboutCar(sortedTimeWinners)
      drawWinners(fullInfo)
    } else if (titleTime.classList.contains("desc")) {
      titleTime.classList.remove("desc")
      titleTime.classList.add("asc")
      const sortedTimeWinners = await getSortedTimeWinners(pageNumber, 5, "ASC")
      const fullInfo = await getFullInfoAboutCar(sortedTimeWinners)
      drawWinners(fullInfo)
    }
  })

  titleWins.addEventListener("click", async () => {
    if (titleTime.classList.contains("asc")) {
      titleTime.classList.remove("asc")
      titleTime.classList.add("not-status")
    } else if (titleTime.classList.contains("desc")) {
      titleTime.classList.remove("desc")
      titleTime.classList.add("not-status")
    }

    if (titleWins.classList.contains("not-status")) {
      titleWins.classList.remove("not-status")
      titleWins.classList.add("asc")
      const sortedWinsWinners = await getSortedWinsWinners(pageNumber, 5, "ASC")
      const fullInfo = await getFullInfoAboutCar(sortedWinsWinners)
      drawWinners(fullInfo)
    } else if (titleWins.classList.contains("asc")) {
      titleWins.classList.remove("asc")
      titleWins.classList.add("desc")
      const sortedWinsWinners = await getSortedWinsWinners(
        pageNumber,
        5,
        "DESC"
      )
      const fullInfo = await getFullInfoAboutCar(sortedWinsWinners)
      drawWinners(fullInfo)
    } else if (titleWins.classList.contains("desc")) {
      titleWins.classList.remove("desc")
      titleWins.classList.add("asc")
      const sortedWinsWinners = await getSortedWinsWinners(pageNumber, 5, "ASC")
      const fullInfo = await getFullInfoAboutCar(sortedWinsWinners)
      drawWinners(fullInfo)
    }
  })

  buttonNext.addEventListener("click", async () => {
    pageNumber += 1
    counterPages.textContent = pageNumber

    if (
      titleWins.classList.contains("not-status") &&
      titleTime.classList.contains("not-status")
    ) {
      const { res } = await getWinners(pageNumber)
      const fullInfo = await getFullInfoAboutCar(res)
      drawWinners(fullInfo)
    }

    //
    if (titleWins.classList.contains("asc")) {
      const sortedWinsWinners = await getSortedWinsWinners(pageNumber, 5, "ASC")
      const fullInfo = await getFullInfoAboutCar(sortedWinsWinners)
      drawWinners(fullInfo)
    } else if (titleWins.classList.contains("desc")) {
      const sortedWinsWinners = await getSortedWinsWinners(
        pageNumber,
        5,
        "DESC"
      )
      const fullInfo = await getFullInfoAboutCar(sortedWinsWinners)
      drawWinners(fullInfo)
    } else if (titleTime.classList.contains("asc")) {
      const sortedTimeWinners = await getSortedTimeWinners(pageNumber, 5, "ASC")
      const fullInfo = await getFullInfoAboutCar(sortedTimeWinners)
      drawWinners(fullInfo)
    } else if (titleTime.classList.contains("desc")) {
      const sortedTimeWinners = await getSortedTimeWinners(
        pageNumber,
        5,
        "DESC"
      )
      const fullInfo = await getFullInfoAboutCar(sortedTimeWinners)
      drawWinners(fullInfo)
    }

    if (pageNumber === Math.ceil(totalCount / 5) || totalCount == 0) {
      buttonNext.disabled = true
    } else buttonNext.disabled = false
    buttonPrev.disabled = pageNumber === 1
  })

  buttonPrev.addEventListener("click", async () => {
    pageNumber -= 1
    counterPages.textContent = pageNumber

    if (
      titleWins.classList.contains("not-status") &&
      titleTime.classList.contains("not-status")
    ) {
      const { res } = await getWinners(pageNumber)
      const fullInfo = await getFullInfoAboutCar(res)
      drawWinners(fullInfo)
    }

    //
    if (titleWins.classList.contains("asc")) {
      const sortedWinsWinners = await getSortedWinsWinners(pageNumber, 5, "ASC")
      const fullInfo = await getFullInfoAboutCar(sortedWinsWinners)
      drawWinners(fullInfo)
    } else if (titleWins.classList.contains("desc")) {
      const sortedWinsWinners = await getSortedWinsWinners(
        pageNumber,
        5,
        "DESC"
      )
      const fullInfo = await getFullInfoAboutCar(sortedWinsWinners)
      drawWinners(fullInfo)
    } else if (titleTime.classList.contains("asc")) {
      const sortedTimeWinners = await getSortedTimeWinners(pageNumber, 5, "ASC")
      const fullInfo = await getFullInfoAboutCar(sortedTimeWinners)
      drawWinners(fullInfo)
    } else if (titleTime.classList.contains("desc")) {
      const sortedTimeWinners = await getSortedTimeWinners(
        pageNumber,
        5,
        "DESC"
      )
      const fullInfo = await getFullInfoAboutCar(sortedTimeWinners)
      drawWinners(fullInfo)
    }

    if (pageNumber === Math.ceil(totalCount / 5) || totalCount == 0) {
      buttonNext.disabled = true
    } else buttonNext.disabled = false
    buttonPrev.disabled = pageNumber === 1
  })
}
