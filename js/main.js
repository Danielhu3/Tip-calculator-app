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

function reset() {
  let radioChecked = document.querySelector('.tips-radio:checked')
  radioChecked.checked = false

  billElement.value = ''
  peopleElement.value = ''
  tipAmountElement.innerHTML = '$0.00'
  totalElement.innerHTML = '$0.00'

  changeResetButtonState(2)
}

function changeResetButtonState(changeState) {
  let displayButtonElement = document.querySelector('.display-button')

  if (changeState == 1) {
    displayButtonElement.disabled = false
  }

  if (changeState == 2) {
    displayButtonElement.disabled = true
  }
}

function checkInputs() {
  let percentage
  if (event.path[0].value == 'custom') {
    let customValue = document.querySelector('#editable-label').textContent

    // clear input
    if (customValue == 'Custom') {
      document.querySelector('#editable-label').textContent = ''
    }

    customValue = parseFloat(
      document.querySelector('#editable-label').textContent
    )

    // check if isn't a NaN value
    if (customValue) {
      percentage = customValue
    }
  }
  //
  else {
    percentage = getValue(event)
  }

  // check if percentage is filled, to avoid execute the block above without custom value
  if (percentage) {
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
      //let percentage = getValue(event)
      calculate(percentage)
      changeResetButtonState(1)
    }
  }
}

function getValue(event) {
  // % selected
  let percentage = event.path[0].value
  return percentage
}
function registerEvents() {
  radioElements.forEach(function (radio) {
    //radio.addEventListener('click', getValue)
    radio.addEventListener('click', checkInputs)
  })
}

window.addEventListener('load', registerEvents)
