const get = element => {
  return document.querySelector('.' + element);
}

var productArray = [];
var productObj = {};

const itemImage = get('item-image').src;
const itemName = get('item-name').innerHTML;
const itemPrice = get('item-price').innerHTML;

const addToCart = () => {
  if (!localStorage) {
    return alert("local storage not supported");
  }

  productObj.image = itemImage;
  productObj.name = itemName;
  productObj.itemPrice = itemPrice;

  for (let prod in productArray) {
    if (productArray[prod].name == itemName) {
      return alert("product already in the cart")
    }
  }
  productArray.push(productObj);
  localStorage.setItem("lale:productArray", JSON.stringify(productArray));
  alert("Item added to cart")
}