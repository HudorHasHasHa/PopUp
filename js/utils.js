// Arrow function that provides price change depenting on which option of XBOX size is being selected
export const priceChanger = (price) => {
  const priceElement = document.getElementById("price");
  priceElement.innerHTML = '';
  priceElement.insertAdjacentHTML('beforeend', `${price} zł`);
};


// Arrow function that provides status change depenting on which option of XBOX size is being selected
export const productAvailability = (status) => {
  // let textHtml = `${status}`;
  let statusImg = document.querySelector(".product-availability-icon");

  let text = document.querySelector(".product-availability-text");
  text.innerHTML = '';
  text.insertAdjacentHTML('beforeend', status);

  if(status == "Produkt dostępny"){
  statusImg.setAttribute("style", `background: url("./images/tick.svg");background-repeat: no-repeat`);
  }
  // else if(status == "Produkt niedostępny"){
  //   statusImg.setAttribute("style", "background-image: url("");background-repeat: no-repeat"); 
  // }
};