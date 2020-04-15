const keyPublishable = 'pk_test_hs4n6wX6Olzr6zllFqE32P8m00USs4v8po'; 
const keySecret = 'sk_test_IfhHhC4OXFVXzduXn6kiMvW300eTsAF29v'; 
 
const app = require("express")();
const stripe = require("stripe")(keySecret);
//const pug = require('pug');
const path = require('path');
 
const bodyParser = require('body-parser');
 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
 
// lưu vào view
app.set('views',path.join(__dirname,'views'));
app.set('view engine', 'ejs') // setting pug as view engine
 
app.get("/", ((req, res) => {
res.render("index",{keyPublishable: keyPublishable});
}));
 
app.post("/pay", function(req, res) {
 
let amount = 10*100;
 
// create a customer
stripe.customers.create({
email: req.body.stripeEmail, // customer email
source: req.body.stripeToken // token for the card
})
.then(customer =>
stripe.charges.create({ // charge the customer
amount,
description: "Sample Charge",
currency: "usd",
customer: customer.id
}))
.then(charge => res.render("pay")); // render the payment successful alter page after payment
 
});
 
// app listening on port 3000
app.listen(3000, () => {
console.log('server is running on port 3000');
});