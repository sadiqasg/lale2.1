const get = element => {
  return document.querySelector('.' + element);
}

var productArray = [];
var productObj = {};

const cartItemNum = get('cart-item-number');
const itemImage = get('item-image').src;
const itemName = get('item-name').innerHTML;
const itemPrice = get('item-price').innerHTML;

const updateCartNumber = () => {
  cartItemNum.innerHTML = productArray[0].length;
}

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
  // get current product array
  const prodArray = JSON.parse(localStorage.getItem("lale:productArray"));
  productArray = prodArray;
  productArray.push(productObj);
  localStorage.setItem("lale:productArray", JSON.stringify(productArray));
  alert("Item added to cart");
  updateCartNumber();
}
