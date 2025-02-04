// src/components/OrderList.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCustomerOrderByOrderId } from "../api";

const OrderList = () => {
  const { id } = useParams();
  const { orderId } = useParams();
  const [userDetail, setUserDetail] = useState([]);
  const [orderDetail, setOrderDetail] = useState([]);

  const fetchDetails = async () => {
    const userDetails = await getCustomerOrderByOrderId(id, orderId);
    console.log(userDetails.order[0]);
    setOrderDetail(userDetails.order[0]);
    setUserDetail(userDetails.customer);
  };

  useEffect(() => {
    fetchDetails();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-semibold mb-6">
        Order Details for {userDetail.name}
      </h1>

      {/* User Details Section */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Customer Information
        </h2>
        <p className="text-gray-700">
          <strong>Name:</strong> {userDetail.name}
        </p>
        <p className="text-gray-700">
          <strong>Phone No:</strong> {userDetail.phone}
        </p>
        <p className="text-gray-700">
          <strong>Email Address:</strong> {userDetail.email}
        </p>
        <p className="text-gray-700">
          <strong>Address:</strong> {userDetail.address}
        </p>
      </div>

      {/* Order Details Section */}
      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Order Details
        </h2>
        <p className="text-gray-700">
          <strong>Total Cost:</strong> ${orderDetail.totalCost}
        </p>

        {/* Ingredients Section */}
        <div className="mt-4">
          <h3 className="text-lg font-semibold text-gray-700">Ingredients:</h3>
          <div className="space-y-4">
            {orderDetail.ingredients?.map((ingredient, index) => (
              <div key={index} className="p-4 bg-gray-100 rounded-md">
                <p className="text-gray-700">
                  <strong>Name:</strong> {ingredient.name}
                </p>
                <p className="text-gray-700">
                  <strong>Price:</strong> ${ingredient.price}
                </p>
                <p className="text-gray-700">
                  <strong>Quantity:</strong> {ingredient.quantity}
                </p>
                <p className="text-gray-700">
                  <strong>Total Price:</strong> ${ingredient.totalPrice}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Raw Materials Section */}
        <div className="mt-4">
          <h3 className="text-lg font-semibold text-gray-700">
            Raw Materials:
          </h3>
          <div className="space-y-4">
            {orderDetail.rawMaterials?.map((rawMaterial, index) => (
              <div key={index} className="p-4 bg-gray-100 rounded-md">
                <p className="text-gray-700">
                  <strong>Name:</strong> {rawMaterial.name}
                </p>
                <p className="text-gray-700">
                  <strong>Price:</strong> ${rawMaterial.price}
                </p>
                <p className="text-gray-700">
                  <strong>Quantity:</strong> {rawMaterial.quantity}
                </p>
                <p className="text-gray-700">
                  <strong>Total Price:</strong> ${rawMaterial.totalPrice}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderList;
