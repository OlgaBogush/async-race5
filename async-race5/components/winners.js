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
  titleWins.textContent = "Wins"

  const titleTime = document.createElement("th")
  titleTime.textContent = "Time"

  rowTitle.append(titleNumber, titleCar, titleName, titleWins, titleTime)
  thead.append(rowTitle)


  // carItem
  const carItem = document.createElement("tr")
  carItem.classList.add("car-item")

  const carItemNumber = document.createElement("td")
  carItemNumber.textContent = "1"

  const carItemCar = document.createElement("td")
  carItemCar.textContent = "svg"

  const carItemName = document.createElement("td")
  carItemName.textContent = "Tesla"

  const carItemWins = document.createElement("td")
  carItemWins.textContent = "2"

  const carItemTime = document.createElement("td")
  carItemTime.textContent = "3.33"

  carItem.append(
    carItemNumber,
    carItemCar,
    carItemName,
    carItemWins,
    carItemTime
  )
  tbody.append(carItem)

  table.append(thead, tbody)
  container.append(table)

  main.append(container)

  document.body.append(main)
}
