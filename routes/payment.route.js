const express = require("express");
const router = express.Router();

const {order, success} = require("../controllers/payment.controller")

router.post("/", order);
router.post("/success", success);

module.exports = router;