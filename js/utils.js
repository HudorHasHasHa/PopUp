// Arrow function that provides price change depenting on which option of XBOX size is being selected
export const priceChanger = (price, dropdownPrice) => {
  const priceElement = document.getElementById("price");
  priceElement.innerHTML = '';
  let totalPrice = price + dropdownPrice;
  priceElement.insertAdjacentHTML('beforeend', `${totalPrice} zł`);
};


// Arrow function that provides status change depenting on which option of XBOX size is being selected
export const productAvailability = (status) => {
  // let textHtml = `${status}`;
  let statusImg = document.querySelector(".product-availability-icon");

  let text = document.querySelector(".product-availability-text");
  text.innerHTML = '';
  text.insertAdjacentHTML('beforeend', status);

  if(status == "Produkt dostępny"){
  // statusImg.setAttribute("style", `background-image: url("./images/tick.svg");background-repeat: no-repeat`);
  statusImg.src="./images/tick.svg"
  }
  else if(status == "Produkt niedostępny"){
    // statusImg.setAttribute("style", `background-image: url("./images/close.svg");background-repeat: no-repeat`); 
  statusImg.src="./images/close.svg"
  }
};