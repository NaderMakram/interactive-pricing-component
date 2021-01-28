const priceTemplate = document.querySelector('#price')
const amountTemplate = document.querySelector('#amount')
const slider = document.querySelector('#range')
const discountToggle = document.querySelector('#discount')

// the progress bar
const fill = document.querySelector('.fill')
const empty = document.querySelector('.empty')


// global diclarations
let discount = false;
let discountAmount = 0.25; // choose number less than 1
const packages = [10, 50, 100, 500, 1000]
const prices = [8, 12, 16, 24, 36]
let selectedPackage = packages[parseInt(slider.value)]
let selectedPrice = prices[parseInt(slider.value)]


// for resetting the toggle in firefox
discountToggle.checked = false;




// functions
function calculatePrice() {
  // let index = parseInt(e.target.value);
  let index = parseInt(slider.value)
  selectedPackage = packages[index]
  selectedPrice = prices[index]
  displayPackage()
  displayPrice()
  updateTrack(index)
}

function displayPrice() {
  let price = discount ? selectedPrice * (1 - discountAmount) : selectedPrice;
  priceTemplate.textContent = price.toFixed(2)
}

function displayPackage() {
  let amount = selectedPackage < 1000 ? `${selectedPackage}K` : `${selectedPackage / 1000}M`
  amountTemplate.textContent = amount
}


function updateTrack(index) {
  let sliderDimensions = slider.getBoundingClientRect()
  let sliderWidth = sliderDimensions.width
  let percentage = (index + 1) / (packages.length)
  fill.style.width = percentage == 0 ? '20%' : `${percentage * sliderWidth}px`
}



// event listeners
slider.addEventListener('input', calculatePrice)

discountToggle.addEventListener('click', (e) => {
  discount = e.target.checked
  displayPrice()
})

window.addEventListener('resize', () => updateTrack(parseInt(slider.value)))


// on load
displayPackage()
displayPrice()
window.addEventListener('load', () => updateTrack(parseInt(slider.value)))