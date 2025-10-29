export default function createGarage() {
  const main = document.createElement("main")
  main.classList.add("garage-page")

  const container = document.createElement("div")
  container.classList.add("container")
  container.textContent = "Garage ppppppp"

  main.append(container)

  document.body.append(main)
}