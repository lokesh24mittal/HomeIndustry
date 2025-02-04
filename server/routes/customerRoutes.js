const express = require("express");
const router = express.Router();
const {
  createCustomer,
  getAllCustomers,
  getCustomerById,
  customerSearch,
  getCustomerOrderByOrderId,
} = require("../controller/Customer");

router.post("/create", createCustomer);
router.get("/", getAllCustomers);
router.get("/search", customerSearch);
router.get("/:id", getCustomerById);
router.get("/:id/:orderId", getCustomerOrderByOrderId);

module.exports = router;
