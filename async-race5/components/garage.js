import createCars from "./cars/createCars.js"
import drawCar from "./cars/drawCar.js"
import totalCarsOnPage from "./helpers/totalCarsOnPage.js"
import { createCar, getCars } from "./utils/async.js"

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
  inputTextCreate.classList.add("input-text-create")

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
}