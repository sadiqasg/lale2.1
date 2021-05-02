var productArray = [];
var productObj = {};

const updateCartNumber = () => {
  cartItemNum.innerHTML = productArray.length;
  console.log(productArray.length);
}

const addProductToCart = id => {
  if (!localStorage) {
    return alert("local storage not supported");
  }
  let itemImage = document.querySelector('.item-image').src;
  let itemName = document.querySelector('.item-name').innerHTML;
  let itemPrice = document.querySelector('.item-price').innerHTML;


  productObj.image = itemImage;
  productObj.name = itemName;
  productObj.itemPrice = itemPrice;


  // get current product array
  const prodArray = JSON.parse(localStorage.getItem("lale:productArray"));

  if (prodArray) {
    productArray = prodArray;
    // check duplicate product
    for (let prod in productArray) {
      if (productArray[prod].name == itemName) {
        return alert("product already in the cart")
      }
    }
    productArray.push(productObj);
    document.getElementById('showModal').click();
  } else {
    productArray.length = 0
    productArray.push(productObj);
  }

  localStorage.setItem("lale:productArray", JSON.stringify(productArray));
  alert("Item added to cart");
  updateCartNumber();
}
