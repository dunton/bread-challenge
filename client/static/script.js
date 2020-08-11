const opts = {
  buttonId: "bread-checkout-btn",
  actAsLabel: false,
  asLowAs: true,
  items: [
    {
      name: "Boise State Mask",
      price: 10000,
      sku: "BSUMASK123",
      imageUrl:
        "https://i.etsystatic.com/23054213/r/il/4a7839/2449589131/il_794xN.2449589131_83o7.jpg",
      detailUrl:
        "https://www.etsy.com/listing/835662311/boise-state-face-mask-lightweight?ga_order=most_relevant&ga_search_type=all&ga_view_type=gallery&ga_search_query=boise+state+broncos&ref=sr_gallery-1-1&frs=1&bes=1",
      quantity: 1,
    },
  ],
  merchantInfo: { Id: "d0dac82c-7d59-4f95-8390-76a60d9f6b8a" },

  calculateTax: function (shippingContact, billingContact, callback) {
    const { state } = shippingContact;
    let totalCost = 0;

    if (state === "NY") {
      opts.items.forEach((item) => {
        totalCost += item.price;
      });

      const tax = totalCost * 0.05;
      callback(null, tax);
    }

    callback(null, 0);
  },
  shippingOptions: [
    { typeId: "12345", cost: 200, type: "2-day" },
    { typeId: "12346", cost: 900, type: "Overnight" },
  ],
  done: function (err, tx_token) {
    if (err) {
      console.error("There was an error: " + err);
      return;
    }
    if (tx_token !== undefined) {
      // create success message
      const div = document.createElement("div");
      const header = document.createElement("h6");
      header.textContent = "Success! Your order has been completed";
      document.querySelector(".content-holder").append(div);
      div.append(header);
    }
    return;
  },
  onCustomerClose: function (err, customer) {
    if (err !== null) {
      console.error("An error occurred getting customer close data.");
      return;
    }
    const { state } = customer;
    let message = "";
    switch (state) {
      case "PREQUALIFIED":
        message = "You are prequalified for financing.";
        break;
      case "PARTIALLY_PREQUALIFIED":
        message = "You are partially prequalified for financing.";
        break;
      case "NOT_PREQUALIFIED":
        message = "You are not prequalified for financing.";
        break;
      case "ABANDONED":
        message = "You abandoned your prequalification attempt.";
        break;
    }

    const header = document.createElement("h6");
    header.textContent = message;
    document.querySelector(".content-holder").append(header);
  },
  onCustomerOpen: function (err, data, callback) {
    document.querySelector(".content-holder").innerHTML = "";
    callback(true);
  },
};

opts.customCSS =
  '@import url(https://fonts.googleapis.com/css?family=Roboto:400,700);#bread-button,body,html{height:100%;margin:0;width:100%}body{display:table}#bread-button{background:darkblue;color:#FFF;border-radius:6px;display:table-cell;font-family:Roboto,sans-serif;font-size:16px;text-align:center;vertical-align:middle;transition:all .3s ease}.bread-btn{cursor:pointer}#bread-button.bread-btn:hover{background:darkblue;}.bread-embed-inner,.bread-label .bread-embed-icon{display:inline-block}.bread-label .bread-embed-icon:after{background:rgba(255,255,255,.5);border-radius:50px;color:#333;content:"i";cursor:pointer;display:inline-block;line-height:1;margin-left:8px;padding:4px 9px}.bread-pot:before{content:"Pay Over Time"}.bread-btn .bread-as-low-as:before,.bread-label .bread-as-low-as:before{content:"As low as "}.bread-for:before{content:"For "} .bread-center{ color: red; } ';

$(document).ready(() => {
  const url = new URL(window.location.href);
  const landing = url.searchParams.get("landing");

  if (landing) {
    bread.showCheckout(opts);
  } else {
    bread.checkout(opts);
  }
});
