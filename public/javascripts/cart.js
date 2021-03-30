const get = element => {
  return document.querySelector('.' + element);
}

let emptyHtml = "<p>Cart Is Empty...</p>";

const productArraySection = get('product-array');
const cartItemNum = get('cart-item-number');

const emptyCart = get('empty-cart');
const totalContainer = get('total-container');

var productArray = [];

// check & get product array from local storage 
const prodArray = JSON.parse(localStorage.getItem("lale:productArray"));

if (!prodArray) {
  console.error('empty prodArray in storage')
  productArraySection.innerHTML = emptyHtml;
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
          <h4 class="mt-0 amount">${item.itemPrice}</h4>
        </div>
      </div>
      <div class="d-flex align-items-center">
        <button class="btn btn-danger" onclick="deleteItem('${item.name}')"><i class="fas fa-minus-circle"></i></button>
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
    if (productArraySection) {
      productArraySection.innerHTML = cart;
    }
    totalContainer.style.display = "block";
  } 
  if (productArray[0].length == 0) {
    productArraySection.innerHTML = emptyHtml;
    totalContainer.style.display = "none";
  }
}
getCartItems();

const deleteItem = name => {
  let store = JSON.parse(localStorage.getItem("lale:productArray"));
  for (let i = 0; i < store.length; i++) {
    if (store[i].name == name) {
      store.splice(i, 1);
    }
  }
  localStorage.setItem("lale:productArray", JSON.stringify(store))
  location.reload();
}


// function arrayRemove(arr, value) { 

//   return arr.filter(function(ele){ 
//       return ele != value; 
//   });
// }

// var result = arrayRemove(array, 6);