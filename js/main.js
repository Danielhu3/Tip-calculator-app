// to-do
// on custom radio buttom, add a input text above the label and get input value
// enable reset button

let radioElements = document.querySelectorAll('.tips-radio')
let calculatorInputElement = document.querySelectorAll('.calculator-input')
let billElement = document.querySelector('.calculator-input.bill')
let peopleElement = document.querySelector('.calculator-input.people')

let errorMessageElement = document.querySelectorAll('.error-message')

let tipAmountElement = document.querySelector('.display-tip').children[2]
let totalElement = document.querySelector('.display-total').children[2]

function calculate(percentage) {
  let billValue = parseFloat(billElement.value)

  let peopleValue = parseFloat(peopleElement.value)

  // total tip, this will be divided by number of people
  let tipTotalValue = (billValue * parseFloat(percentage)) / 100

  // display on tip amount /person
  let tipPersonValue = tipTotalValue / peopleValue

  // display on total / person
  let totalValue = (billValue + tipTotalValue) / peopleValue

  //displaying values
  tipAmountElement.innerHTML = `$${tipPersonValue.toFixed(2)}`
  totalElement.innerHTML = `$${totalValue.toFixed(2)}`
}

// add enable button
function checkInputs() {
  let count = 0
  if (billElement.value.length == 0) {
    errorMessageElement[0].classList.remove('hidden')
    calculatorInputElement[0].classList.add('error')
    count++
  } else {
    errorMessageElement[0].classList.add('hidden')
    calculatorInputElement[0].classList.remove('error')
  }

  if (peopleElement.value.length == 0) {
    errorMessageElement[1].classList.remove('hidden')
    calculatorInputElement[1].classList.add('error')
    count++
  } else {
    errorMessageElement[1].classList.add('hidden')
    calculatorInputElement[1].classList.remove('error')
  }

  // bill and people aren't empty, so, call calculator
  if (count == 0) {
    let percentage = getValue(event)
    calculate(percentage)
  }
}

function getValue(event) {
  // % selected
  let percentage = event.path[0].value
  return percentage
}
function registerEvents() {
  radioElements.forEach(function (radio) {
    radio.addEventListener('click', getValue)
    radio.addEventListener('click', checkInputs)
  })
}

window.addEventListener('load', registerEvents)
