const express = require("express");

const router = express.Router();

const {
  createOrder,
  getAllOrders,
  getOrdersByCustomer,
} = require("../controller/Order");

router.post("/create", createOrder);
router.get("/", getAllOrders);
router.get("/customer/:customerId", getOrdersByCustomer);

module.exports = router;
