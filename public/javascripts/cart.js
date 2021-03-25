const get = element => {
  return document.querySelector('.' + element);
}

const itemImage = get('item-image').src;
const itemName = get('item-name').innerHTML;
const itemPrice = get('item-price').innerHTML;

var productArray = [];
var productObj = {};

// check & get product array from local storage 
try {
  let prodArray = localStorage.getItem("lale:productArray") ? localStorage.getItem("lale:productArray") : [];
  if (productArray) {
    productArray = JSON.parse(prodArray);
  }
}
catch (err) {
  alert("oops", err)
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
  productArray.push(productObj);
  localStorage.setItem("lale:productArray", JSON.stringify(productArray));
  alert("Item added to cart")
}

const getCartItems = () => {
  if (productArray.length > 0) {
    
  }
}

const cartHTML = item => {
  return `
    <li class="list-group-item d-flex justify-content-around">
      <div>
        <figure class="figure">
          <img id="product-image" src="${item.image}" alt="product-image">
          <figcaption class="figure-caption">${item.name}</figcaption>
        </figure>
      </div>
      <div class="d-flex align-items-center">
        <div class="flex-column">
          <p class="mb-0 text-warning text-uppercase">price</p>
          <h4 class="mt-0">${item.price}</h4>
        </div>
      </div>
      <div class="d-flex align-items-center">
        <button class="btn btn-danger"><i class="fas fa-minus-circle"></i></button>
      </div>
  </li>
  `
}