export default function createHeader() {
  const header = document.createElement("header")

  const container = document.createElement("div")
  container.classList.add("container")

  const headerContainer = document.createElement("div")
  headerContainer.classList.add("header-container")

  const toGarageButton = document.createElement("a")
  toGarageButton.href = "#garage"
  toGarageButton.classList.add("to-garage-button")
  toGarageButton.dataset.link = ""
  toGarageButton.innerText = "Garage"
  toGarageButton.classList.add("active")

  const toWinnersButton = document.createElement("a")
  toWinnersButton.href = "#winners"
  toWinnersButton.classList.add("to-winners-button")
  toWinnersButton.dataset.link = ""
  toWinnersButton.innerText = "Winners"

  headerContainer.append(toGarageButton, toWinnersButton)
  container.append(headerContainer)
  header.append(container)
  document.body.append(header)
}
