import { priceChanger, productAvailability } from './utils.js';

// selectors
const mainButton = document.querySelector(".open-popup");
const overlay = document.querySelector(".overlay");
const modal = document.querySelector(".modal");
const delivery = document.querySelector(".delivery-information");

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
  // button values
  let sizes = [], types = [], sizePrices = [], status = [];
  // dropdown values
  let dropdownPrices = [], dropdownImage = [], dropdownColors = [];
  const dropdown = xbox.multiversions[0].items;

  let sizeButtonTemplate = function (type, name) {
    return `<button class="button-type-${type}" id="button-type-${type}">${name}</button>`;
  }

  console.log(xbox.sizes.items)

  // For Loop for extracting data from json file to declared variables for easier use
  for (const item in xbox.sizes.items) {
    if (xbox.sizes.items[item].hasOwnProperty('name')) {
      sizes.push(xbox.sizes.items[item].name);
    }
    if (xbox.sizes.items[item].hasOwnProperty('type')) {
      types.push(xbox.sizes.items[item].type);
    }
    if (xbox.sizes.items[item].hasOwnProperty('price')) {
      sizePrices.push(xbox.sizes.items[item].price);
    }
    if (xbox.sizes.items[item].hasOwnProperty('status')) {
      status.push(xbox.sizes.items[item].status);
    }
  }

  // DROPDOWN PRICE PART STARTS
  for (const item in dropdown) {
    console.log(dropdown[item]);
    // statements to get dropdown options variables including priceDiff & img url//
    if (dropdown[item].products[0].hasOwnProperty('price_difference')) {
      dropdownPrices.push(dropdown[item].products[0].price_difference);
    }
    if (dropdown[item].products[0].hasOwnProperty('url')) {
      dropdownImage.push(dropdown[item].products[0].url);
    }
    for (const key in dropdown[item].values) {
      dropdownColors.push(dropdown[item].values[key].name);
    }
  }
  // const dropdownObj = {
  //   dropdownColors, dropdownPrices, dropdownImage
  // }
  // console.log(dropdownObj);

  let dropdownSelector = document.getElementById("color-dropdown");
  let selectedValue;
  let selectedDropdownPrice = 0;
  dropdownSelector.addEventListener('change', function () {
    selectedValue = document.querySelector(".color-dropdown").value;
    console.log(selectedValue);
    for (let i = 0; i < dropdownColors.length; i++) {
      if (dropdownColors[i] == selectedValue) {
        console.log(dropdownPrices[i]);
        selectedDropdownPrice = parseFloat(dropdownPrices[i]);
      }
    }
  });
  // DROPDOWN PRICE PART ENDS
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
  for (let i = 0; i < sizeButtons.length; i++) {
    // By default first option's checked // default options start
    sizeButtons[0].classList.add('selected');
    
    // console.log(sizeButtons.classList.contains(".selected"));
    priceChanger(sizePrices[0], selectedDropdownPrice);
    productAvailability(status[0]);
    // default options end
    sizeButtons[i].addEventListener("click", function (event) {
      event.preventDefault();
      sizeButtonsCleaner();
      sizeButtons[i].classList.add('selected');
      priceChanger(sizePrices[i], parseFloat(selectedDropdownPrice));
      productAvailability(status[i]);
    });
    // dropdownSelector on change running priceChanger
    dropdownSelector.addEventListener('change', function(){
      if(sizeButtons[i].classList.contains("selected")){
      priceChanger(sizePrices[i], parseFloat(selectedDropdownPrice));
      }
    });
  }
})();
// SizeButtonsGenerator & events Ends

// variant Dropdown selector Generator & events Start
console.log(price);
(function () {
  let dropdownColors = [];
  let variantHtml = '';
  let variantTemplate = function (color) {
    return `<option value="${color}">${color}</option>`;
  }
  const items = xbox.multiversions[0].items;

  for (const item in items) {
    // nested for in to access dropdown json values
    for (const key in items[item].values) {
      dropdownColors.push(items[item].values[key].name);
    }
  }
  // console.log(dropdownColors)

  //Creating html from declared template by looping through 
  for (let i = 0; i < dropdownColors.length; i++) {
    variantHtml = variantHtml + variantTemplate(dropdownColors[i]);
  }

  document.querySelector(".color-dropdown").insertAdjacentHTML('beforeend', variantHtml);
})();
// variant Dropdown selector Generator & events Ends

// Delivery information
(function(){
  const isAvailable = document.querySelector(".product-availability-text");
  console.log(isAvailable.innerHTML);

  if(isAvailable.innerHTML === "Produkt dostępny"){
    console.log('dostępny');
  }
})();