export default function createGarage() {
  const main = document.createElement("main")
  main.classList.add("garage")

  const container = document.createElement("div")
  container.classList.add("container")
  container.textContent = "Garage"

  main.append(container)

  return main
}