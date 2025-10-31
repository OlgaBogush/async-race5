import { getCar, getWinners } from "./utils/async.js"

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


  async function winners() {
    const winnersArray = await getWinners()
    winnersArray.forEach(async (item, index) => {
      const winnerCar = await getCar(item.id)

      // rowCar
      const rowCar = document.createElement("tr")
      rowCar.classList.add("car-item")

      const rowCarNumber = document.createElement("td")
      rowCarNumber.textContent = index + 1

      const rowCarCar = document.createElement("td")
      rowCarCar.classList.add("row-car-car")
      
      const svgCar = `
    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1"
    viewBox="0 0 256 256" xml:space="preserve">
    <g style="stroke: none; stroke-width: 0; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: none; fill-rule: nonzero; opacity: 1;"
      transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)">
      <circle cx="70.735" cy="56.775" r="1.955"
        style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: ${winnerCar.color}; fill-rule: nonzero; opacity: 1;"
        transform="  matrix(1 0 0 1 0 0) " />
      <circle cx="19.765" cy="56.775" r="1.955"
        style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: ${winnerCar.color}; fill-rule: nonzero; opacity: 1;"
        transform="  matrix(1 0 0 1 0 0) " />
      <path
        d="M 75.479 36.045 l -7.987 -1.22 l -2.35 -2.574 c -5.599 -6.132 -13.571 -9.649 -21.874 -9.649 h -6.245 c -1.357 0 -2.696 0.107 -4.016 0.296 c -0.022 0.004 -0.044 0.006 -0.066 0.01 c -7.799 1.133 -14.802 5.468 -19.285 12.106 C 5.706 37.913 0 45.358 0 52.952 c 0 3.254 2.647 5.9 5.9 5.9 h 3.451 c 0.969 4.866 5.269 8.545 10.416 8.545 s 9.447 -3.679 10.416 -8.545 h 30.139 c 0.969 4.866 5.27 8.545 10.416 8.545 s 9.446 -3.679 10.415 -8.545 H 84.1 c 3.254 0 5.9 -2.646 5.9 -5.9 C 90 44.441 83.894 37.331 75.479 36.045 z M 43.269 26.602 c 7.065 0 13.848 2.949 18.676 8.094 H 39.464 l -3.267 -8.068 c 0.275 -0.009 0.55 -0.026 0.826 -0.026 H 43.269 z M 32.08 27.118 l 3.068 7.578 H 18.972 C 22.429 30.813 27.018 28.169 32.08 27.118 z M 19.767 63.397 c -3.652 0 -6.623 -2.971 -6.623 -6.622 c 0 -3.652 2.971 -6.623 6.623 -6.623 s 6.623 2.971 6.623 6.623 C 26.39 60.427 23.419 63.397 19.767 63.397 z M 70.738 63.397 c -3.652 0 -6.623 -2.971 -6.623 -6.622 c 0 -3.652 2.971 -6.623 6.623 -6.623 c 3.651 0 6.622 2.971 6.622 6.623 C 77.36 60.427 74.39 63.397 70.738 63.397 z"
        style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: ${winnerCar.color}; fill-rule: nonzero; opacity: 1;"
        transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />
    </g>
  </svg>
  `
      rowCarCar.innerHTML = svgCar

      const rowCarName = document.createElement("td")
      rowCarName.textContent = winnerCar.name

      const rowCarWins = document.createElement("td")
      rowCarWins.textContent = item.wins

      const rowCarTime = document.createElement("td")
      rowCarTime.textContent = item.time

      rowCar.append(rowCarNumber, rowCarCar, rowCarName, rowCarWins, rowCarTime)
      tbody.append(rowCar)
    })
  }



  table.append(thead, tbody)
  container.append(table)
  main.append(container)
  document.body.append(main)

  winners()
}
