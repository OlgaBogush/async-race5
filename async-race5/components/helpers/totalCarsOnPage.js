export default function totalCarsOnPage() {
  const totalCars = document.querySelector(".total-cars")
  const carsCollectionOnPage = document.querySelectorAll(".car-item")
  totalCars.textContent = carsCollectionOnPage.length
}
