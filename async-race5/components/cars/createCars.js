import drawCar from "./drawCar.js"

export default function createCars(array) {
  const fragment = document.createDocumentFragment()

  array.forEach(({ name, color, id }) => {
    const carItem = drawCar(name, color, id)

    fragment.append(carItem)
  })

  return fragment
}
