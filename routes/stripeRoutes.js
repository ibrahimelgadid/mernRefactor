//---------------------------------------------|
//           All required modules              |
//---------------------------------------------|
const router = require("express").Router();
const stripeCTLS = require("../controllers/stripeControllers");

//---------------------------------------------|
//           payment intent
//---------------------------------------------|
router.post("/payment/create", stripeCTLS.paymentIntent);

////////////////////////
module.exports = router;
