const Customer = require("../models/CustomerSchema");

exports.createCustomer = async (req, res) => {
  try {
    const { name, phone, email, address } = req.body;

    if (!name || !phone) {
      return res.status(400).json({ message: "Name and phone are required" });
    }

    // Check if the customer already exists based on phone number
    let existingCustomer = await Customer.findOne({ phone });

    if (existingCustomer) {
      return res.status(401).json({
        message: "Customer already exists with this phone number ",
        customer: existingCustomer,
      });
    }

    const newCustomer = new Customer({ name, phone, email, address });
    const savedCustomer = await newCustomer.save();

    res.status(201).json({
      message: "Customer created successfully",
      customer: savedCustomer,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc Get all customers
// @route GET /api/customers
exports.getAllCustomers = async (req, res) => {
  try {
    const customers = await Customer.find();
    res.status(200).json(customers);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc Get customer by ID (Including all orders)
// @route GET /api/customers/:id
exports.getCustomerById = async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id).populate("orders");

    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    res.status(200).json(customer);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.getCustomerOrderByOrderId = async (req, res) => {
  try {
    console.log("under getCustomerOrderByOrderId");
    const customer = await Customer.findById(req.params.id).populate("orders");

    let order = customer.orders.filter(
      (order) => order._id == req.params.orderId
    );
    console.log(order);

    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json({
      order: order,
      customer: customer,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.customerSearch = async (req, res) => {
  const query = req.query.query;
  console.log(query);
  try {
    // Find customers that match the query (you can modify this logic based on your requirements)
    const customers = await Customer.find({
      $or: [
        { name: { $regex: query, $options: "i" } },
        { email: { $regex: query, $options: "i" } },
        { phone: { $regex: query, $options: "i" } },
      ],
    });
    res.json(customers);
  } catch (error) {
    res.status(500).json({ message: "Error fetching customers", error });
  }
};
