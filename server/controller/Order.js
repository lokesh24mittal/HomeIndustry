const Customer = require("../models/CustomerSchema");
const Order = require("../models/OrderSchema");

exports.createOrder = async (req, res) => {
  try {
    const { id, rawMaterials, ingredients } = req.body;
    console.log(id, rawMaterials, ingredients);

    if (!id || !rawMaterials || !ingredients) {
      return res.status(400).json({
        message: "Customer ID, raw materials, and ingredients are required",
      });
    }

    // Check if customer exists
    const customer = await Customer.findById(id);
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    // Calculate total cost
    let totalCost = 0;

    rawMaterials.forEach((item) => {
      item.totalPrice = item.quantity * item.price;
      totalCost += item.totalPrice;
    });

    console.log("rawMaterialssss.....", rawMaterials);

    ingredients.forEach((item) => {
      item.totalPrice = item.quantity * item.price;
      totalCost += item.totalPrice;
    });

    // Create new order
    const newOrder = new Order({
      customer: id,
      rawMaterials,
      ingredients,
      totalCost,
    });

    const savedOrder = await newOrder.save();

    // Link order to customer
    customer.orders.push(savedOrder._id);
    await customer.save();

    res.status(201).json({
      message: "Order created successfully",
      order: savedOrder,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc Get all orders
// @route GET /api/orders
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("customer", "name phone");
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc Get orders for a specific customer
// @route GET /api/orders/customer/:customerId
exports.getOrdersByCustomer = async (req, res) => {
  try {
    const { customerId } = req.params;
    console.log("customerId", customerId);

    const orders = await Order.find({ customer: customerId }).populate(
      "customer",
      "name phone"
    );

    if (!orders.length) {
      return res
        .status(404)
        .json({ message: "No orders found for this customer" });
    }

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
