export default function createWinners() {
  const main = document.createElement("main")
  main.classList.add("winners")

  const container = document.createElement("div")
  container.classList.add("container")
  container.textContent = "Winners"

  main.append(container)

  return main
}