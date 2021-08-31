// Arrow function that provides price change depenting on which option of XBOX size is being selected
export const priceChanger = (price, dropdownPrice) => {
  const priceElement = document.getElementById("price");
  priceElement.innerHTML = '';
  let totalPrice = price + dropdownPrice;
  priceElement.insertAdjacentHTML('beforeend', `${totalPrice} zł`);
};


// Arrow function that provides status change depenting on which option of XBOX size is being selected
export const productAvailability = (status) => {
  let statusImg = document.querySelector(".product-availability-icon");

  let text = document.querySelector(".product-availability-text");
  text.innerHTML = '';
  text.insertAdjacentHTML('beforeend', status);

  if(status == "Produkt dostępny"){
  statusImg.src="./images/tick.svg"
  }
  else if(status == "Produkt niedostępny"){
  statusImg.src="./images/close.svg"
  }
};

export const quantityButtons = () => {
  let plus = document.getElementById("plus");
  let minus = document.getElementById("minus");
  let input = document.getElementById("amount");
  const event = new Event("change");

  plus.addEventListener("click", function(e){
    let amount = 0;
    amount = parseInt(document.getElementById("amount").value);
    document.getElementById("amount").value = amount + 1;
    document.getElementById("amount").dispatchEvent(event);
    console.log(amount);
  });
  
  minus.addEventListener("click", function(e){
    let amount = 0;
    amount = parseInt(document.getElementById("amount").value);
    document.getElementById("amount").value = amount - 1;
    document.getElementById("amount").dispatchEvent(event);
  });
};