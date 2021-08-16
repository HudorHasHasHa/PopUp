import { priceChanger, productAvailability } from './utils.js';

// selectors
const mainButton = document.querySelector(".open-popup");
const overlay = document.querySelector(".overlay");
const modal = document.querySelector(".modal");

// Reading json file content START
const response = await axios.get("../xbox.json")
  .catch(error => {
    console.log(error.response);
  });

// Setting const variable content as json file response data
const xbox = response.data;

// Alternatively load data using fetch instead of axios package
/*
let xbox;
await fetch("../xbox.json")
.then(response => response.json())
.then(data => {
  return xbox = data;
})
console.log(xbox);
*/
// Reading json file content ENDS

mainButton.addEventListener('click', function (event) {
  event.preventDefault();
  overlay.classList.add("is-active");
  modal.classList.add("is-active");
});

overlay.addEventListener('click', function (event) {
  event.preventDefault();
  modal.classList.remove('is-active');
  overlay.classList.remove('is-active');
});


// SizeButtonsGenerator & events Start
(function () {
  let sizeButtonTemplate = function (type, name) {
    return `<button class="button-type-${type}" id="button-type-${type}">${name}</button>`;
  }

  console.log(xbox.sizes.items)
  let sizes = [], types = [], prices = [], status = [];

  // For Loop for extracting data from json file to declared variables for easier use
  for (const item in xbox.sizes.items) {
    if (xbox.sizes.items[item].hasOwnProperty('name')) {
      sizes.push(xbox.sizes.items[item].name);
    }
    if (xbox.sizes.items[item].hasOwnProperty('type')) {
      types.push(xbox.sizes.items[item].type);
    }
    if (xbox.sizes.items[item].hasOwnProperty('price')) {
      prices.push(xbox.sizes.items[item].price);
    }
    if (xbox.sizes.items[item].hasOwnProperty('status')) {
      status.push(xbox.sizes.items[item].status);
    }
  }

  let buttonsHTML = '';
  for (let i = 0; i < sizes.length; i++) {
    buttonsHTML = buttonsHTML + sizeButtonTemplate(types[i], sizes[i]);
  }

  document.querySelector(".size-buttons").insertAdjacentHTML("beforeend", buttonsHTML);

  // SizeButtonsSelector V
  const sizeButtons = document.querySelectorAll("[class*=button-type-]");

  const sizeButtonsCleaner = function () {
    for (let i = 0; i < sizeButtons.length; i++) {
      sizeButtons[i].classList.remove('selected');
    }
  }

  console.log(sizeButtons);
  for (let i = 0; i < sizeButtons.length; i++) {
    // By default first option's checked // default options start
    sizeButtons[0].classList.add('selected');
    priceChanger(prices[0]);
    productAvailability(status[0]);
    // default options end
    sizeButtons[i].addEventListener("click", function (event) {
      event.preventDefault();
      sizeButtonsCleaner();
      sizeButtons[i].classList.add('selected');
      priceChanger(prices[i]);
      productAvailability(status[i]);
    });
  }
})();
// SizeButtonsGenerator & events Ends




// variant Dropdown selector Generator & events Start
console.log(price);
(function () {
  let dropdownColors = [];
  let dropdownId = [];
  let variantHtml = '';
  let variantTemplate = function (id, color) {
    return `<option class="button-type-${id}" id="button-type-${id}">${color}</option>`;
  }

  const items = xbox.multiversions[0].items;

  for (const item in items) {
    for (const key in items[item].values) {
      dropdownColors.push(items[item].values[key].name);
      dropdownId.push(items[item].values[key].id);
    }
  }

  for (let i = 0; i < dropdownColors.length; i++) {
    variantHtml = variantHtml + variantTemplate(dropdownId[i], dropdownColors[i]);
  }

  document.querySelector(".color-dropdown").insertAdjacentHTML('beforeend', variantHtml);
})();
// variant Dropdown selector Generator & events Ends