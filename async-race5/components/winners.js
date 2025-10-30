export default function createWinners() {
  const main = document.createElement("main")
  main.classList.add("winners-page", "hide")
  // main.hidden = true

  const container = document.createElement("div")
  container.classList.add("container")
  container.textContent = "Winners bla bla bla"

  main.append(container)

  document.body.append(main)
}
