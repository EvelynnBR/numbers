const form = document.getElementById("form")
const amount = document.getElementById("amount")
const from = document.getElementById("from")
const to = document.getElementById("to")
const checked = document.getElementById("checked")
const drawButton = document.getElementById("drawButton")
const backDraw = document.querySelector(".back-draw")

form.addEventListener("submit", (event) => {
  event.preventDefault()

  if ((amount.value === "" || from.value === "" || to.value === "")) {
    alert("Preencha todos os campos!")
    return
  }

  if (Number(to.value) < Number(from.value)) {
    alert("O valor mínimo deve ser maior que o valor máximo!")
    return
  }

  if (Number(amount.value) > Number(to.value)) {
    alert("A quantidade de sorteios deve ser menor que o valor máximo")
    return
  }
  if (
    checked.checked &&
    Number(amount.value) >= Number(to.value) - Number(from.value)
  ) {
    alert("Intervalo pequeno demais para sortear números diferentes!")
    return
  }

  backDraw.classList.add("disable")

  switchScreen()
  showResults()
  clearForm()
})

function clearForm() {
  amount.value = ""
  from.value = ""
  to.value = ""
  checked.checked = false
}

function switchScreen() {
  const luckBox = document.querySelector(".luck-box")
  const result = document.querySelector(".result")

  luckBox.classList.add("disable")
  result.classList.remove("disable")
}

function createResultElements() {
  const numberBox = document.createElement("div")
  const resultAnimation = document.createElement("div")
  const showResult = document.createElement("span")

  numberBox.appendChild(resultAnimation)
  numberBox.appendChild(showResult)

  showResult.classList.add("show-result")
  setTimeout(() => {
    numberBox.classList.add("number-box")
    resultAnimation.classList.add("result-animation")
  }, 600)

  return numberBox
}

function draw() {
  let results = []
  for (let i = 0; i < Number(amount.value); i++) {
    let result

    do {
      result = Math.floor(
        Math.random() * (Number(to.value) - Number(from.value)) +
          Number(from.value)
      )
    } while (checked.checked && results.includes(result))

    results.push(result)
  }
  return results
}

function showResults() {
  const resultContainer = document.querySelector(".result-number")
  const numbers = draw()

  resultContainer.innerHTML = ""

  numbers.forEach((num, index) => {
    setTimeout(() => {
      const box = createResultElements()
      const span = box.querySelector(".show-result")
      span.textContent = num
      resultContainer.appendChild(box)
    }, index * 2500)
  })

  setTimeout(() => {
    alert("Números sorteados com sucesso!")
  },numbers.length * 2500)

  setTimeout(() => {
    backDraw.classList.remove("disable")

  }, numbers.length * 2500)

}

backDraw.addEventListener("click", (e) => {
  const luckBox = document.querySelector(".luck-box")
  const result = document.querySelector(".result")
  e.preventDefault()
  luckBox.classList.remove("disable")
  result.classList.add("disable")
})
