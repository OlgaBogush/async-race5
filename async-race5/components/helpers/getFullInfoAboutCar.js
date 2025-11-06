import { getCar } from "../utils/async.js"

export default async function getFullInfoAboutCar(winners) {
  const promises = winners.map(async ({ id }) => {
    const car = await getCar(id)
    return car
  })

  const cars = await Promise.all(promises)

  const carsMap = new Map(
    cars.map((item) => [item.id, { name: item.name, color: item.color }])
  )
  const fullInfo = winners.map((item) => {
    return {
      ...item,
      ...carsMap.get(item.id),
    }
  })

  return fullInfo
}
