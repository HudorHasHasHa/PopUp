import { priceChanger, productAvailability, quantityButtons } from './utils.js';

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
  let sizes = [], types = [], sizePrices = [], status = [], amount = [];
  let productQuantity = 0;
  // dropdown values
  let dropdownPrices = [], dropdownImage = [], dropdownColors = [];
  const dropdown = xbox.multiversions[0].items;

  let sizeButtonTemplate = function (type, name) {
    return `<button class="button-type-${type}" id="button-type-${type}">${name}</button>`;
  }
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
    if (xbox.sizes.items[item].hasOwnProperty('amount')) {
      amount.push(xbox.sizes.items[item].amount);
    }
  }

  // DROPDOWN PRICE PART STARTS
  for (const item in dropdown) {
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

  let dropdownSelector = document.getElementById("color-dropdown");
  let galleryImagesSelector = document.querySelector(".gallery-images");
  let selectedValue;
  let selectedDropdownPrice = 0;

  // Generating gallery images depending on which option from dropdown is selected.
  let html = '';
  const imageTemplate = (imageId) => {
    return `<div class="gallery-image" id="img${imageId}"></div>`;
  }
  dropdownSelector.addEventListener('change', function () {
    if (typeof html !== 'undefined') {
      html = ''
    }
    selectedValue = document.querySelector(".color-dropdown").value;
    for (let i = 0; i < dropdownColors.length; i++) {
      if (dropdownColors[i] == selectedValue) {
        selectedDropdownPrice = parseFloat(dropdownPrices[i]);
        for (let x = 0; x < dropdownImage[i].length; x++) {
          html += imageTemplate(x);
        }
        // GALLERY INJECTING DEPENDING ON WHICH OPTIONS IS CHOSEN
        galleryImagesSelector.innerHTML = '';
        galleryImagesSelector.insertAdjacentHTML("beforeend", html);

        document.getElementById("img0").classList.add("currentImage");
      }
    }
    let currentImages = document.getElementsByClassName("gallery-image")
    // setting div-bckground 
    for (let i = 0; i < currentImages.length; i++) {
      for (let x = 0; x < dropdownImage[i].length; x++) {
        document.getElementById("img" + x).setAttribute("style", `background-image: url(${dropdownImage[i][x]}); background-repeat: no-repeat`);
      }
    }
  });
  // DROPDOWN PRICE PART ENDS

  // // NEXT IMAGE 
  let nextImg = document.querySelector(".next-btn");
  let prevImg = document.querySelector(".previous-btn");
  nextImg.addEventListener("click", function (event) {
    event.preventDefault();
    let generatedImages = document.getElementsByClassName("gallery-image");
    for (let i = 0; i < generatedImages.length; i++) {
      if (generatedImages[i].classList.contains("currentImage")) {
        generatedImages[i].classList.remove("currentImage");
        if (i < generatedImages.length - 1) {
          generatedImages[++i].classList.add("currentImage");
        } else if (i >= generatedImages.length - 1) {
          generatedImages[i].classList.add("currentImage");
        }
      }
    }
  });
  prevImg.addEventListener("click", function (event) {
    event.preventDefault();
    let generatedImages = document.getElementsByClassName("gallery-image");
    for (let i = 0; i < generatedImages.length; i++) {
      if (generatedImages[i].classList.contains("currentImage")) {
        generatedImages[i].classList.remove("currentImage");
        if (i <= 0) {
          generatedImages[i].classList.add("currentImage");
        } else if (i >= 1) {
          generatedImages[--i].classList.add("currentImage");
        }
      }
    }
  })

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

    priceChanger(sizePrices[0], selectedDropdownPrice);
    productAvailability(status[0]);
    productQuantity = parseInt(amount[0]);
    // default options end
    sizeButtons[i].addEventListener("click", function (event) {
      event.preventDefault();
      sizeButtonsCleaner();
      sizeButtons[i].classList.add('selected');
      productQuantity = parseInt(amount[i]);
      priceChanger(sizePrices[i], parseFloat(selectedDropdownPrice));
      productAvailability(status[i]);
      const dispatch = new Event("change");
      amountInput.dispatchEvent(dispatch);
    });
    // dropdownSelector on change running priceChanger
    dropdownSelector.addEventListener('change', function () {
      if (sizeButtons[i].classList.contains("selected")) {
        priceChanger(sizePrices[i], parseFloat(selectedDropdownPrice));
      }
    });
  }

  let amountInput = document.querySelector('.amount');
  amountInput.addEventListener('change', function () {
    if (productQuantity < amountInput.value && productQuantity >= 1) {
      window.alert(`przepraszamy, ale wybrany przez Ciebie przedmiot posiadamy jedynie w ilości: ${productQuantity}`);
      amountInput.value = productQuantity;
    } else if (amountInput.value <= 0) {
      amountInput.value = 1;
    } else if (isNaN(amountInput.value)) {
      amountInput.value = 1;
    } if (productQuantity <= 0) {
      window.alert(`przepraszamy, ale wybrany przez Ciebie przedmiot jest w tym momencie niedostępny, spróbuj ponownie później`);
      amountInput.value = 1;
      const dispatch = new Event("click");
      sizeButtons[0].dispatchEvent(dispatch);
    }

  });

  quantityButtons();
})();
// SizeButtonsGenerator & events Ends

// variant Dropdown selector Generator & events Start
(function () {
  let dropdownColors = [];
  let variantHtml = '';
  let variantTemplate = function (color, optionId) {
    return `<option id="optionId-${optionId}" value="${color}">${color}</option>`;
  }
  const items = xbox.multiversions[0].items;

  for (const item in items) {
    // nested for in to access dropdown json values
    for (const key in items[item].values) {
      dropdownColors.push(items[item].values[key].name);
    }
  }

  //Creating html from declared template by looping through 
  for (let i = 0; i < dropdownColors.length; i++) {
    variantHtml = variantHtml + variantTemplate(dropdownColors[i], i);
  }

  document.querySelector(".color-dropdown").insertAdjacentHTML('beforeend', variantHtml);
  // document.getElementById("optionId-0").setAttribute = (selected, selected);
})();
// variant Dropdown selector Generator & events Ends

// Delivery information
(function () {
  const isAvailable = document.querySelector(".product-availability-text");
  console.log(isAvailable.innerHTML);

  if (isAvailable.innerHTML === "Produkt dostępny") {
    console.log('dostępny');
  }
})();


const dispatchDefault = new Event("change");
document.getElementById("color-dropdown").dispatchEvent(dispatchDefault);

let submitButton = document.querySelector(".add-to-cart-button");

submitButton.addEventListener('click', function () {
  // Get selected size
  let sizes = document.querySelectorAll("[class*=button-type]");
  let size;
  for (let i = 0; i < sizes.length; i++) {
    if (sizes[i].classList.contains("selected")) {
      size = parseInt((sizes[i].innerHTML).replace(/\D/g, ''));
    }
  }
  console.log(size);
  // Get selected color
  let colors = document.querySelector(".color-dropdown");
  let color = colors.value;

  // Get quantity
  let quantity = document.querySelector(".amount").value;

  // Get piece price 
  let piecePrice = parseFloat(((document.querySelector(".price")).innerHTML).replace(/\D/g, ''));

  let data = {
    "size": size,
    "color": color,
    "quantity": quantity,
    "piecePrice": piecePrice,
    "totalPrice": (quantity*piecePrice)
  }
  console.log(data);
  // submitToServer(url, data)
  // .then(data => console.log(data));
})

// async function submitToServer(url, data) {

//   try {
//     let response = await fetch(url, {
//       method: 'POST',
//       headers: {
//         'Content-type': 'application/json',
//       },
//       body: JSON.stringify(data),
//     });
//     let responseJson = await response.json();
//     return responseJson;
//   } catch (error) {
//     console.error(error);
//   }
// }