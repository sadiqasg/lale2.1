function reverseFormatNumber(val, locale) {
  var group = new Intl.NumberFormat(locale).format(1111).replace(/1/g, '');
  var decimal = new Intl.NumberFormat(locale).format(1.1).replace(/1/g, '');
  var reversedVal = val.replace(new RegExp('\\' + group, 'g'), '');
  reversedVal = reversedVal.replace(new RegExp('\\' + decimal, 'g'), '.');
  return Number.isNaN(reversedVal) ? 0 : reversedVal;
}


let arr = [];
let totalAmount = [];
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

function makePayment() {
  let username = document.getElementById('username').value;
  let email = document.getElementById('email').value;
  let number = document.getElementById('pnumber').value;

  if (!username || !number || !email) {
    displayError('error');
    displayError('missing');
    return;
  }
  if (!validateEmail(email)) {
    displayError('error');
    displayError('email-error');
    return;
  }

  let finalAmount = parseInt(totalSection.innerText);
  const PBFKey = "FLWPUBK_TEST-04f3f5db345653e2882d7589fcc44d99-X";
  const txRef = '' + Math.floor((Math.random() * 1000000000) + 1);

  getpaidSetup({
    PBFPubKey: PBFKey,
    customer_email: email,
    amount: finalAmount,
    customer_phone: number,
    currency: "NGN",
    txref: txRef,

    onclose: function () {
      console.log('closed');
    },
    callback: function (response) {
      flw_ref = response.tx.flwRef;// collect flwRef returned and pass to a server page to complete status check.
      console.log("This is the response returned after a charge", response);
      if (response.tx.chargeResponse == '00' || response.tx.chargeResponse == '0') {
        localStorage.removeItem("lale:productArray");
        location.reload();
      } else {
        console.log('omo')
        location.reload();
      }
    }
  });

}