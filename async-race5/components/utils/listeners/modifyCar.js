
import drawCar from "../../cars/drawCar.js"
import totalCarsOnPage from "../../helpers/totalCarsOnPage.js"
import { createCar, deleteCar, getCar } from "../async.js"

export default function modifyCar() {
  const smallButtonsCollection = document.querySelectorAll(".small-button")
  
  let carId

  smallButtonsCollection.forEach((item) => {
    item.addEventListener("click", async (e) => {
      e.preventDefault()
      carId = parseInt(e.target.id.split("-").at(-1))
      const fire = document.getElementById(`fire-${carId}`)

      // delete
      if (e.target.classList.contains("small-button-remove")) {
        console.log("removing...", carId)
        await deleteCar(carId)
        let pane = e.target.closest(".car-item")
        pane.remove()
        totalCarsOnPage()
      }

      // select
      if (e.target.classList.contains("small-button-select")) {
        console.log("select", carId)
        const currentParams = await getCar(carId)
        const inputTextUpdate = document.querySelector(".input-text-update")
        const inputColorUpdate = document.querySelector(".input-color-update")
        inputTextUpdate.value = currentParams.name
        inputColorUpdate.value = currentParams.color
      }

      // start----------------------------------------------------------------------------------
      // if (e.target.classList.contains("small-button-race")) {
      //   const { id, res } = await startEngine(carId)
      //   const time = (res.distance / res.velocity / 1000).toFixed(2)
      //   const carElement = document.getElementById(carId)
      //   carElement.style.animation = "move"
      //   carElement.style.animationDuration = `${time}s`
      //   carElement.style.animationTimingFunction = "linear"
      //   carElement.style.animationFillMode = "forwards"

      //   await driveEngine(carId)
      //     .then((data) => data)
      //     .catch((err) => {
      //       console.log(err)
      //     })
      // }

      // stopped----------------------------------------------------------------------------------
      // if (e.target.classList.contains("small-button-stop")) {
      //   const carElement = document.getElementById(carId)
      //   carElement.style.animation = ""
      //   fire.style.display = "none"
      //   await stopEngine(carId)
      // }
    })
  })

  // create car------------------------------------------------------------
  // const inputTextCreate = document.querySelector(".input-text-create")
  // const inputColorCreate = document.querySelector(".input-color-create")
  // const createForm = document.querySelector(".create-form")

  // createForm.addEventListener("submit", async (e) => {
  //   e.preventDefault()
  //   const car = {
  //     name: inputTextCreate.value,
  //     color: inputColorCreate.value,
  //   }
  //   const { name, color, id } = await createCar(car)
  //   const newCar = drawCar(name, color, id)
  //   const wrapper = document.querySelector(".wrapper")
  //   wrapper.append(newCar)
  //   totalCarsOnPage()
  // })

  // update car----------------------------------------------------------------------------------
  // const inputTextUpdate = document.querySelector(".input-text-update")
  // const inputColorUpdate = document.querySelector(".input-color-update")
  // const updateForm = document.querySelector(".update-form")

  // updateForm.addEventListener("submit", async (e) => {
  //   e.preventDefault()
  //   const updateParams = {
  //     name: inputTextUpdate.value,
  //     color: inputColorUpdate.value,
  //   }
  //   await updateCar(carId, updateParams)
  // })
}
