import drawCar from "./drawCar.js"

export default function createCars(array, page) {
  const fragment = document.createDocumentFragment()

  array.forEach(({ name, color, id }) => {
    const carItem = drawCar(name, color, id, page)

    fragment.append(carItem)
  })

  return fragment
}
