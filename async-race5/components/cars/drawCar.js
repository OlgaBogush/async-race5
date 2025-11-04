import { deleteCar, deleteWinner, driveEngine, getCar, getCars, startEngine, stopEngine } from "../utils/async.js"
import { winners } from "../winners.js"
import createCars from "./createCars.js"


export default function drawCar(name, color, id, page) {
  let carId
  let pageNumber = page

  // for carItem
  const carItem = document.createElement("div")
  carItem.classList.add("car-item")

  const carTitle = document.createElement("h5")
  carTitle.classList.add("car-title")
  carTitle.innerText = name

  const carContainer = document.createElement("div")
  carContainer.classList.add("car-container")

  const car = document.createElement("div")
  car.classList.add("car")
  car.id = id
  car.dataset.name = name

  const fire = document.createElement("div")
  fire.classList.add("fire")
  fire.id = `fire-${id}`

  const flag = document.createElement("div")
  flag.classList.add("flag")

  const svgCar = `
    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1"
    viewBox="0 0 256 256" xml:space="preserve">
    <g style="stroke: none; stroke-width: 0; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: none; fill-rule: nonzero; opacity: 1;"
      transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)">
      <circle cx="70.735" cy="56.775" r="1.955"
        style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: ${color}; fill-rule: nonzero; opacity: 1;"
        transform="  matrix(1 0 0 1 0 0) " />
      <circle cx="19.765" cy="56.775" r="1.955"
        style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: ${color}; fill-rule: nonzero; opacity: 1;"
        transform="  matrix(1 0 0 1 0 0) " />
      <path
        d="M 75.479 36.045 l -7.987 -1.22 l -2.35 -2.574 c -5.599 -6.132 -13.571 -9.649 -21.874 -9.649 h -6.245 c -1.357 0 -2.696 0.107 -4.016 0.296 c -0.022 0.004 -0.044 0.006 -0.066 0.01 c -7.799 1.133 -14.802 5.468 -19.285 12.106 C 5.706 37.913 0 45.358 0 52.952 c 0 3.254 2.647 5.9 5.9 5.9 h 3.451 c 0.969 4.866 5.269 8.545 10.416 8.545 s 9.447 -3.679 10.416 -8.545 h 30.139 c 0.969 4.866 5.27 8.545 10.416 8.545 s 9.446 -3.679 10.415 -8.545 H 84.1 c 3.254 0 5.9 -2.646 5.9 -5.9 C 90 44.441 83.894 37.331 75.479 36.045 z M 43.269 26.602 c 7.065 0 13.848 2.949 18.676 8.094 H 39.464 l -3.267 -8.068 c 0.275 -0.009 0.55 -0.026 0.826 -0.026 H 43.269 z M 32.08 27.118 l 3.068 7.578 H 18.972 C 22.429 30.813 27.018 28.169 32.08 27.118 z M 19.767 63.397 c -3.652 0 -6.623 -2.971 -6.623 -6.622 c 0 -3.652 2.971 -6.623 6.623 -6.623 s 6.623 2.971 6.623 6.623 C 26.39 60.427 23.419 63.397 19.767 63.397 z M 70.738 63.397 c -3.652 0 -6.623 -2.971 -6.623 -6.622 c 0 -3.652 2.971 -6.623 6.623 -6.623 c 3.651 0 6.622 2.971 6.622 6.623 C 77.36 60.427 74.39 63.397 70.738 63.397 z"
        style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: ${color}; fill-rule: nonzero; opacity: 1;"
        transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />
    </g>
  </svg>
  `

  const carButtons = document.createElement("div")
  carButtons.classList.add("car-buttons")

  const smallButtonRace = document.createElement("button")
  smallButtonRace.classList.add("small-button")
  smallButtonRace.classList.add("small-button-race")
  smallButtonRace.textContent = "A"
  smallButtonRace.id = `small-button-race-${id}`

  const smallButtonStop = document.createElement("button")
  smallButtonStop.classList.add("small-button")
  smallButtonStop.classList.add("small-button-stop")
  smallButtonStop.textContent = "B"
  smallButtonStop.id = `small-button-stop-${id}`
  smallButtonStop.disabled = true

  const smallButtonSelect = document.createElement("button")
  smallButtonSelect.classList.add("small-button")
  smallButtonSelect.classList.add("small-button-select")
  smallButtonSelect.textContent = "Select"
  smallButtonSelect.id = `small-button-select-${id}`

  const smallButtonRemove = document.createElement("button")
  smallButtonRemove.classList.add("small-button")
  smallButtonRemove.classList.add("small-button-remove")
  smallButtonRemove.textContent = "Remove"
  smallButtonRemove.id = `small-button-remove-${id}`

  // listeners
  smallButtonRace.addEventListener("click", async (e) => {
    e.preventDefault()
    smallButtonRace.disabled = true
    smallButtonStop.disabled = false

    carId = parseInt(e.target.id.split("-").at(-1))
    const { id, res } = await startEngine(carId)
    const time = (res.distance / res.velocity / 1000).toFixed(2)
    const carElement = document.getElementById(carId)
    carElement.style.animation = "move"
    carElement.style.animationDuration = `${time}s`
    carElement.style.animationTimingFunction = "linear"
    carElement.style.animationFillMode = "forwards"

    await driveEngine(carId)
      .then((data) => data)
      .catch((err) => {
        console.log(err)
      })
  })

  smallButtonStop.addEventListener("click", async (e) => {
    e.preventDefault()
    smallButtonRace.disabled = false
    smallButtonStop.disabled = true

    carId = parseInt(e.target.id.split("-").at(-1))
    const carElement = document.getElementById(carId)
    carElement.style.animation = ""
    fire.style.display = "none"
    await stopEngine(carId)
  })

  smallButtonSelect.addEventListener("click", async (e) => {
    e.preventDefault()
    carId = parseInt(e.target.id.split("-").at(-1))
    const currentParams = await getCar(carId)
    const inputTextUpdate = document.querySelector(".input-text-update")
    const inputColorUpdate = document.querySelector(".input-color-update")
    inputTextUpdate.value = currentParams.name
    inputColorUpdate.value = currentParams.color
    inputTextUpdate.dataset.selectedCarId = carId
  })

  smallButtonRemove.addEventListener("click", async (e) => {
    e.preventDefault()
    carId = parseInt(e.target.id.split("-").at(-1))
    console.log("removing...", carId)
    await deleteCar(carId)
    const { totalCount, res } = await getCars(pageNumber)
    
    const carsWrapper = createCars(res, pageNumber)
    const wrapper = document.querySelector(".wrapper")
    wrapper.innerHTML = ""
    wrapper.append(carsWrapper)
    const totalCars = document.querySelector(".total-cars")
    const counterPages = document.querySelector(".counter-pages")
    totalCars.textContent = totalCount
    counterPages.textContent = pageNumber
    const buttonNext = document.querySelector(".next")
    const buttonPrev = document.querySelector(".prev")
    buttonNext.disabled = (pageNumber === Math.ceil(totalCount / 7))
    buttonPrev.disabled = (pageNumber === 1)

    let paneWinner = document.querySelector(`[data-winner-id="${carId}"]`)
    if (paneWinner) {
      await deleteWinner(carId)
      await winners()
    }
  })

  car.innerHTML = svgCar
  car.append(fire)
  carContainer.append(car, flag)
  carButtons.append(smallButtonRace)
  carButtons.append(smallButtonStop)
  carButtons.append(smallButtonSelect)
  carButtons.append(smallButtonRemove)
  carItem.append(carTitle)
  carItem.append(carContainer)
  carItem.append(carButtons)

  return carItem
}
