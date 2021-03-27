const get = element => {
  return document.querySelector('.' + element);
}

const productArraySection = get('product-array');
const cartItemNum = get('cart-item-number');

var productArray = [];

// check & get product array from local storage 
const prodArray = JSON.parse(localStorage.getItem("lale:productArray"));

if (!prodArray) {
  console.error('empty prodArray in storage')
}
productArray.push(prodArray);
cartItemNum.innerHTML = productArray[0].length;

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
          <h4 class="mt-0">${item.itemPrice}</h4>
        </div>
      </div>
      <div class="d-flex align-items-center">
        <button class="btn btn-danger"><i class="fas fa-minus-circle"></i></button>
      </div>
  </li>
  `
}

const getCartItems = () => {
  let cart = "";
  if (productArray.length > 0) {
    for (let prod in productArray[0]) {
      cart += cartHTML(productArray[0][prod])
    }
    productArraySection.innerHTML = cart;
  }
}
getCartItems();

