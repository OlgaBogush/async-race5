const brands = [
  "Honda",
  "Toyota",
  "Nissan",
  "Mercedes",
  "BMW",
  "Volkswagen",
  "Audi",
  "Ford",
  "Hyundai",
  "Kia",
  "Lexus",
  "Subaru",
  "Mazda",
  "Jeep",
  "Volvo",
  "Tesla",
  "Ferrari",
]

const models = [
  "CRV",
  "Camry",
  "Liv 2",
  "GLE",
  "X5",
  "Tiguan",
  "X6",
  "Explorer",
  "Santa Fe",
  "Sportage",
  "RX",
  "Forester",
  "CX 90",
  "Wrangler",
  "XC90",
  "911",
  "Purosangue",
]

function randomColor() {
  let color
  const red = Math.floor(Math.random() * 256)
    .toString(16)
    .padStart(2, "0")
  const green = Math.floor(Math.random() * 256)
    .toString(16)
    .padStart(2, "0")
  const blue = Math.floor(Math.random() * 256)
    .toString(16)
    .padStart(2, "0")
  color = `#${red}${green}${blue}`
  return color
}

export function getRandomColor() {
  const result = []
  for (let i = 0; i < 10; i++) {
    result.push(randomColor())
  }
  return result
}

export function getRandomBrand() {
  const result = []
  for (let i = 0; i < 10; i++) {
    const brandIndex = Math.floor(Math.random() * brands.length)
    const modelIndex = Math.floor(Math.random() * models.length)
    const carName = `${brands[brandIndex]} ${models[modelIndex]}`
    result.push(carName)
  }
  return result
}
