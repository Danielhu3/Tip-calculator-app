// get inputs and check if are empty

// add listeners to radio buttons and call calculator

// on custom radio buttom, add a input text above the label and put get input value

let radioElements = document.querySelectorAll('.tips-radio')
let billElement = document.querySelector('.calculator-input.bill')
let peopleElement = document.querySelector('.calculator-input.people')

let tipAmountElement = document.querySelector('.display-tip').children[2]
let totalElement = document.querySelector('.display-total').children[2]

function calculate(percentage) {
  let billValue = parseFloat(billElement.value)
  let peopleValue = parseFloat(peopleElement.value)

  // total tip, this will be divided by number of people
  let tipTotalValue = (billValue * parseFloat(percentage)) / 100
  console.log(`total tip: ${tipTotalValue}`)

  // display on tip amount /person
  let tipPersonValue = tipTotalValue / peopleValue
  console.log(`tip / person: ${tipPersonValue}`)

  // display on total / person
  let totalValue = (billValue + tipTotalValue) / peopleValue
  console.log(`total / person: ${totalValue}`)

  //displaying values
  tipAmountElement.innerHTML = tipPersonValue.toFixed(2)
  totalElement.innerHTML = totalValue.toFixed(2)
}

function getValue(event) {
  // % selected
  let percentage = event.path[0].value

  calculate(percentage)
}
function registerEvents() {
  radioElements.forEach(function (radio) {
    radio.addEventListener('click', getValue)
  })
}

window.addEventListener('load', registerEvents)
