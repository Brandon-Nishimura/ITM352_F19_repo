var express = require('express');
var app = express();
var myParser = require("body-parser");
var fs = require('fs');
var products = require('./public/products.js')

// Server-side verification begins here! Well, it would if I could have made it work.

/*
let params = (new URL(request.body)).searchParams;
var quantities = [];
// form was submitted so process the invoice
if (params.has('purchase_submit')) {
  for (i = 0; i < products.length; i++) {
    if (params.has(`quantity${i}`)) {
      a_qty = params.get(`quantity${i}`);
      if (!isNonNegInt(a_qty)) {
        console.log("hi");
      }
      quantities[i] = a_qty;
    }
  }
} else {
  document.write('no form submitted');
}
console.log(quantities);

*/

// Here's that isNonNegInt function. We'll be using this later!

function isNonNegInt(q, returnErrors = false) {
  errors = []; // assume no errors at first
  if (Number(q) != q) errors.push('Not a number!'); // Check if string is a number value
  if (q < 0) errors.push('Negative value!'); // Check if it is non-negative
  if (parseInt(q) != q) errors.push('Not an integer!'); // Check that it is an integer
  return returnErrors ? errors : (errors.length == 0);
}

// Let's check to make sure everything matches and print our receipt!  

function process_quantity_form(POST, response) {
  if (typeof POST['purchase_submit_button'] != 'undefined') {

    // Let's establish these variables for use later. We'll only make them if the form submission worked; otherwise there's no point in defining them now.

    var contents = fs.readFileSync('./views/display_quantities_template.view', 'utf8');
    receipt = '';
    for (i in products) {
      let q = POST[`quantity_textbox${i}`];
      if (isNonNegInt(q)) {
        receipt += eval('`' + contents + '`'); // render template string
      } else {
        receipt += `<h3><font color="red">${q} is not a valid quantity for ${model}!</font></h3>`;
      }
    }
    response.send(receipt);
    response.end();
  }
}

// Some basic lines to show us what's going on in the console as a standard check, process form, etc // 

app.all('*', function (request, response, next) {
  console.log(request.method + ' to ' + request.path);
  next();
});

app.use(myParser.urlencoded({ extended: true }));
app.post("/process_form", function (request, response) {
  process_quantity_form(request.body, response);
});

app.use(express.static('./public'));
app.listen(8080, () => console.log(`listening on port 8080`));