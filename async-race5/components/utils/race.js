import { winners } from "../winners.js"
import {
  createWinner,
  driveEngine,
  getCars,
  getWinner,
  startEngine,
  stopEngine,
  updateWinner,
} from "./async.js"

export default async function race() {
  const buttonRace = document.querySelector(".button-race")
  const buttonReset = document.querySelector(".button-reset")
  const buttonGenerate = document.querySelector(".button-generate")

  const array = []

  // race
  buttonRace.addEventListener("click", async (e) => {
    e.preventDefault()
    buttonRace.disabled = true
    buttonGenerate.disabled = true
    buttonReset.disabled = false

    const cars = await getCars()
    array.length = 0
    cars.forEach((item) => array.push(item.id))

    const startArray = await Promise.all(array.map((item) => startEngine(item)))
    console.log("array from race", array)
    startArray.forEach(({ id, res }) => {
      const time = (res.distance / res.velocity / 1000).toFixed(2)
      const carElement = document.getElementById(id)
      carElement.dataset.time = time
      carElement.style.animationName = "move"
      carElement.style.animationDuration = `${time}s`
      carElement.style.animationTimingFunction = "linear"
      carElement.style.animationFillMode = "forwards"
    })

    // first
    const first = await Promise.any(array.map((item) => driveEngine(item)))
      .then((data) => data)
      .catch((err) => {
        console.log(err)
      })

    if (first) {
      const carElementWin = document.getElementById(first.id)
      const flagWin = carElementWin.nextElementSibling
      flagWin.style.animationName = "shake"
      flagWin.style.animationDuration = "0.5s"
      flagWin.style.animationIterationCount = 1

      const name = carElementWin.getAttribute("data-name")
      const time = carElementWin.getAttribute("data-time")
      const modal = document.querySelector(".modal")
      const modalText = modal.querySelector(".modalText")
      modalText.textContent = `${name} wins by ${time} s!`
      modal.classList.add("show")
      document.body.style.overflow = "hidden"
      console.log("first", first)

      const createWinnerParams = {
        id: first.id,
        wins: 1,
        time: Number(time),
      }

      const winnersCollection = document.querySelectorAll(".row-car")

      const isExists = Array.from(winnersCollection).find(
        (item) => Number(item.dataset.winnerId) === first.id
      )

      if (!!isExists) {
        const oldWinner = await getWinner(first.id)

        const updateWinnerParams = {
          wins: oldWinner.wins + 1,
          time: Math.min(oldWinner.time, Number(time)),
        }

        await updateWinner(first.id, updateWinnerParams)
        await winners()
      } else {
        await createWinner(createWinnerParams)
        await winners()
      }

      // hide modal
      modal.addEventListener("click", () => {
        modal.classList.remove("show")
        modalText.textContent = ""
        document.body.style.overflow = ""
      })
    }
  })

  // reset
  buttonReset.addEventListener("click", (e) => {
    e.preventDefault()
    buttonRace.disabled = false
    buttonReset.disabled = true
    buttonGenerate.disabled = false

    console.log("array from reset", array)
    array.forEach(async (item) => {
      const carElement = document.getElementById(item)
      if (carElement) {
        const fire = document.getElementById(`fire-${item}`)
        carElement.style.animation = ""
        fire.style.display = "none"
        await stopEngine(item)
      }
    })
  })
}
