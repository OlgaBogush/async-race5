import createCars from "./cars/createCars.js"
import drawCar from "./cars/drawCar.js"
import totalCarsOnPage from "./helpers/totalCarsOnPage.js"
import { createCar, getCars, updateCar } from "./utils/async.js"

const cars = await getCars()

export default function createGarage() {
  const main = document.createElement("main")
  main.classList.add("garage-page")

  const container = document.createElement("div")
  container.classList.add("container")

  const controls = document.createElement("div")
  controls.classList.add("controls")

  // for form create
  const formCreate = document.createElement("form")
  formCreate.classList.add("create-form")

  const inputTextCreate = document.createElement("input")
  inputTextCreate.setAttribute("type", "text")
  inputTextCreate.setAttribute("name", "text")
  inputTextCreate.classList.add("input-text-create")
  inputTextCreate.required = true

  const inputColorCreate = document.createElement("input")
  inputColorCreate.setAttribute("type", "color")
  inputColorCreate.classList.add("input-color-create")

  const createButton = document.createElement("button")
  createButton.classList.add("create-button")
  createButton.innerText = "Create"

  formCreate.append(inputTextCreate)
  formCreate.append(inputColorCreate)
  formCreate.append(createButton)

  // for form update
  const formUpdate = document.createElement("form")
  formUpdate.classList.add("update-form")

  const inputTextUpdate = document.createElement("input")
  inputTextUpdate.setAttribute("type", "text")
  inputTextUpdate.setAttribute("name", "text")
  inputTextUpdate.classList.add("input-text-update")

  const inputColorUpdate = document.createElement("input")
  inputColorUpdate.setAttribute("type", "color")
  inputColorUpdate.classList.add("input-color-update")

  const updateButton = document.createElement("button")
  updateButton.classList.add("update-button")
  updateButton.innerText = "Update"

  formUpdate.append(inputTextUpdate)
  formUpdate.append(inputColorUpdate)
  formUpdate.append(updateButton)

  // controls buttons
  const controlsButtons = document.createElement("div")
  controlsButtons.classList.add("controls-buttons")

  const buttonRace = document.createElement("button")
  buttonRace.classList.add("button-race")
  buttonRace.innerText = "Race"

  const buttonReset = document.createElement("button")
  buttonReset.classList.add("button-reset")
  buttonReset.innerText = "Reset"
  buttonReset.disabled = true

  const buttonGenerate = document.createElement("button")
  buttonGenerate.classList.add("button-generate")
  buttonGenerate.innerText = "Generate cars"

  controlsButtons.append(buttonRace)
  controlsButtons.append(buttonReset)
  controlsButtons.append(buttonGenerate)

  // total
  const totalContainer = document.createElement("div")
  totalContainer.classList.add("total-container")

  const textPages = document.createElement("p")
  textPages.innerText = "Pages: "

  const textCars = document.createElement("p")
  textCars.innerText = "Total: "

  const counterPages = document.createElement("span")
  counterPages.classList.add("counter-pages")
  counterPages.innerText = "1"

  const totalCars = document.createElement("span")
  totalCars.classList.add("total-cars")
  totalCars.innerText = `${cars.length}`

  textPages.append(counterPages)
  textCars.append(totalCars)
  totalContainer.append(textPages, textCars)

  controls.append(formCreate)
  controls.append(formUpdate)
  controls.append(controlsButtons)
  container.append(controls, totalContainer)
  main.append(container)
  document.body.append(main)

  const wrapper = document.createElement("div")
  wrapper.classList.add("wrapper")

  const carsWrapper = createCars(cars)
  wrapper.append(carsWrapper)
  container.append(wrapper)

  // listeners
  formCreate.addEventListener("submit", async (e) => {
    e.preventDefault()
    const car = {
      name: inputTextCreate.value,
      color: inputColorCreate.value,
    }
    const { name, color, id } = await createCar(car)
    const newCar = drawCar(name, color, id)
    wrapper.append(newCar)
    totalCarsOnPage()
  })

  formUpdate.addEventListener("submit", async (e) => {
    e.preventDefault()
    const updateParams = {
      name: inputTextUpdate.value,
      color: inputColorUpdate.value,
    }
    const selectedCar = document.querySelector("[data-selected-car-id]")
    if(!selectedCar) {
      return
    } else {
      const carId = selectedCar.dataset.selectedCarId
      await updateCar(carId, updateParams)

      const carSelected = document.getElementById(`${carId}`)
      const carItemSelected = carSelected.closest(".car-item")
      const carTitleSelected = carItemSelected.querySelector(".car-title")
      carTitleSelected.textContent = inputTextUpdate.value
      const carSvgSelected = carItemSelected.querySelector("svg")
      carSvgSelected.innerHTML = `
      <g style="stroke: none; stroke-width: 0; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: none; fill-rule: nonzero; opacity: 1;"
        transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)">
        <circle cx="70.735" cy="56.775" r="1.955"
          style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: ${inputColorUpdate.value}; fill-rule: nonzero; opacity: 1;"
          transform="  matrix(1 0 0 1 0 0) " />
        <circle cx="19.765" cy="56.775" r="1.955"
          style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: ${inputColorUpdate.value}; fill-rule: nonzero; opacity: 1;"
          transform="  matrix(1 0 0 1 0 0) " />
        <path
          d="M 75.479 36.045 l -7.987 -1.22 l -2.35 -2.574 c -5.599 -6.132 -13.571 -9.649 -21.874 -9.649 h -6.245 c -1.357 0 -2.696 0.107 -4.016 0.296 c -0.022 0.004 -0.044 0.006 -0.066 0.01 c -7.799 1.133 -14.802 5.468 -19.285 12.106 C 5.706 37.913 0 45.358 0 52.952 c 0 3.254 2.647 5.9 5.9 5.9 h 3.451 c 0.969 4.866 5.269 8.545 10.416 8.545 s 9.447 -3.679 10.416 -8.545 h 30.139 c 0.969 4.866 5.27 8.545 10.416 8.545 s 9.446 -3.679 10.415 -8.545 H 84.1 c 3.254 0 5.9 -2.646 5.9 -5.9 C 90 44.441 83.894 37.331 75.479 36.045 z M 43.269 26.602 c 7.065 0 13.848 2.949 18.676 8.094 H 39.464 l -3.267 -8.068 c 0.275 -0.009 0.55 -0.026 0.826 -0.026 H 43.269 z M 32.08 27.118 l 3.068 7.578 H 18.972 C 22.429 30.813 27.018 28.169 32.08 27.118 z M 19.767 63.397 c -3.652 0 -6.623 -2.971 -6.623 -6.622 c 0 -3.652 2.971 -6.623 6.623 -6.623 s 6.623 2.971 6.623 6.623 C 26.39 60.427 23.419 63.397 19.767 63.397 z M 70.738 63.397 c -3.652 0 -6.623 -2.971 -6.623 -6.622 c 0 -3.652 2.971 -6.623 6.623 -6.623 c 3.651 0 6.622 2.971 6.622 6.623 C 77.36 60.427 74.39 63.397 70.738 63.397 z"
          style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: ${inputColorUpdate.value}; fill-rule: nonzero; opacity: 1;"
          transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />
      </g>`
    }
  })

}
