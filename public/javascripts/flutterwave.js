function reverseFormatNumber(val, locale) {
  var group = new Intl.NumberFormat(locale).format(1111).replace(/1/g, '');
  var decimal = new Intl.NumberFormat(locale).format(1.1).replace(/1/g, '');
  var reversedVal = val.replace(new RegExp('\\' + group, 'g'), '');
  reversedVal = reversedVal.replace(new RegExp('\\' + decimal, 'g'), '.');
  return Number.isNaN(reversedVal) ? 0 : reversedVal;
}


let arr = [];
let totalAmount = [];
let totalSection = document.getElementById('total');

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
    totalSection.innerText = '₦ ' + tmp;
  } else {
    for (let a in arr) {
      let tmp = arr[a].replace(/\D/g, '') / 100;
      totalAmount.push(tmp);
    }
    let total = totalAmount.map(num => num + num);
    totalSection.innerText = '₦ ' + total[1];
  }
})();

function makePayment() {
  let finalAmount = parseInt(totalSection.innerText);

  FlutterwaveCheckout({
    public_key: "FLWPUBK_TEST-SANDBOXDEMOKEY-X",
    tx_ref: "hooli-tx-1920bbtyt",
    amount: finalAmount,
    currency: "NGN",
    country: "NG",
    payment_options: "card, ussd",
    redirect_url: // specified redirect URL
      "https://callbacks.piedpiper.com/flutterwave.aspx?ismobile=34",
    meta: {
      consumer_id: 23,
      consumer_mac: "92a3-912ba-1192a",
    },
    customer: {
      email: "sadiqasg@gmail.com",
      phone_number: "07038334703",
      name: "Sadiq",
    },
    callback: function (data) {
      console.log(data);
    },
    onclose: function () {
      // close modal
    },
    customizations: {
      title: "Lalehosuehold",
      description: "Payment for items in cart",
      logo: "https://assets.piedpiper.com/logo.png",
    },
  });
}
