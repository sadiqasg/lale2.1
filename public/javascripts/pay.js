window.onload = function() {
  getProductNames();
}
function reverseFormatNumber(val, locale) {
  var group = new Intl.NumberFormat(locale).format(1111).replace(/1/g, '');
  var decimal = new Intl.NumberFormat(locale).format(1.1).replace(/1/g, '');
  var reversedVal = val.replace(new RegExp('\\' + group, 'g'), '');
  reversedVal = reversedVal.replace(new RegExp('\\' + decimal, 'g'), '.');
  return Number.isNaN(reversedVal) ? 0 : reversedVal;
}

let arr = [];
let totalAmount = [];
let itemNamesList = [];
// let totalSection = document.getElementById('total');
let totalSection = document.querySelector('.total');

(function calcTotal() {
  console.log('IIEF func start');
  let amounts = document.getElementsByClassName('amount');

  for (let amount in amounts) {
    if (amounts[amount].innerText) {
      arr.push(amounts[amount].innerText)
    }
  }
  if (arr.length <= 1) {
    let tmp = arr[0].replace(/\D/g, '') / 100;
    totalSection.innerText = tmp;
  } else {
    for (let a in arr) {
      let tmp = arr[a].replace(/\D/g, '') / 100;
      totalAmount.push(tmp);
    }
    let total = totalAmount.reduce((a, b) => a + b);
    totalSection.innerText = total;
  }
})();

function getProductNames() {
  let itemNames = document.getElementsByClassName('singeItemName');

  for (let item in itemNames) {
    let tmp = itemNames[item].innerHTML;
    if (tmp) {
      itemNamesList.push(tmp);
    }
  }
}

function validateEmail(email) {
  var reg = /\S+@\S+\.\S+/;
  return reg.test(email);
}

function displayError(id) {
  id = document.getElementById(id);
  id.style.display = 'block';

  setInterval(() => {
    id.style.display = 'none';
  }, 3000);

}

const paymentForm = document.getElementById('paymentForm');
paymentForm.addEventListener("submit", payWithPaystack, false);

function payWithPaystack(e) {
  e.preventDefault();

  // let username = document.getElementById('username').value;
  // let email = document.getElementById('email').value;
  // let number = document.getElementById('pnumber').value;

  // let userObj = {
  //   username, email, number
  // }

  let data = {
    name: document.getElementById('username').value,
    email: document.getElementById('email').value,
    number: document.getElementById('pnumber').value,
    productName: itemNamesList,
    productPrice: parseInt(totalSection.innerText),
    status: 'pending'
  };

  let handler = PaystackPop.setup({
    key: 'pk_test_436209c086483511b3d8cb318d158bf6b0c0e27e',
    email: document.getElementById("email").value,
    amount: parseInt(totalSection.innerText) * 100,
    // ref: '' + Math.floor((Math.random() * 1000000000) + 1), // generates a pseudo-unique reference. Please replace with a reference you generated. Or remove the line entirely so our API will generate one for you
    // label: "Optional string that replaces customer email"
    onClose: function () {
      alert('Window closed.');
    },
    callback: function (response) {
      let message = 'Payment complete! Reference: ' + response.reference + '\nWe would contact you shortly\nYou would receive a payment receipt via email';
      alert(message);
      localStorage.removeItem("lale:productArray");
      sessionStorage.setItem("lale:newCustomerOrder", JSON.stringify(data));
      window.location = "/"
    }
  });

  handler.openIframe();
}




//   if (!username || !number || !email) {
//     displayError('error');
//     displayError('missing');
//     return;
//   }
//   if (!validateEmail(email)) {
//     displayError('error');
//     displayError('email-error');
//     return;
//   }
