const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cors = require("cors");
const connectDB = require("./config/database");
const orderRoutes = require("./routes/orderRoutes");
const customerRoutes = require("./routes/customerRoutes");
const app = express();
app.use(bodyParser.json());
dotenv.config();

const PORT = process.env.port || 3000;

app.get("/", (req, res) => {
  res.send("API is running...");
});

// Start the Server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
app.use(cors());
connectDB();

app.use("/api/customers", customerRoutes);
app.use("/api/orders", orderRoutes);
