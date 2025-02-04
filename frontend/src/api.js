// src/api.js
const API_URL = "http://localhost:3000/api";

export const createCustomer = async (customerData) => {
  console.log(customerData);
  try {
    const response = await fetch(`${API_URL}/customers/create`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(customerData),
    });
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error creating customer:", error);
    throw error;
  }
};

export const createOrder = async (orderData) => {
  console.log(orderData);
  try {
    const response = await fetch(`${API_URL}/orders/create`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(orderData),
    });
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error creating order:", error);
    throw error;
  }
};

export const getCustomerById = async (customerId) => {
  try {
    console.log("hii");
    const response = await fetch(`${API_URL}/customers/${customerId}`);
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error fetching customer:", error);
    throw error;
  }
};

export const getCustomerOrderByOrderId = async (customerId, orderId) => {
  try {
    console.log("hii");
    const response = await fetch(
      `${API_URL}/customers/${customerId}/${orderId}`
    );
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error fetching customer:", error);
    throw error;
  }
};

// getCustomerOrderByOrderId
// /customer/:customerId
