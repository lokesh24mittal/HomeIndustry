import React, { useState } from "react";
import { createOrder } from "../api";
import { useParams, useNavigate } from "react-router-dom";

const OrderForm = () => {
  const { id } = useParams();
  const [fields, setFields] = useState([]);
  const [ingridients, setIngridients] = useState([]);
  const navigate = useNavigate();

  const addFields = () => {
    setFields([...fields, { name: "", quantity: 0, price: 0 }]);
  };

  const addIngridients = () => {
    setIngridients([...ingridients, { name: "", quantity: 0, price: 0 }]);
  };

  const handleChangeIngridients = (index, event) => {
    const { name, value } = event.target;
    const newFields = [...ingridients];
    newFields[index][name] =
      name === "quantity" || name === "price" ? Number(value) : value;
    setIngridients(newFields);
  };

  const removeIngridientsField = (index) => {
    setIngridients(ingridients.filter((_, i) => i !== index));
  };

  const handleChange = (index, event) => {
    const { name, value } = event.target;
    const newFields = [...fields];
    newFields[index][name] =
      name === "quantity" || name === "price" ? Number(value) : value;
    setFields(newFields);
  };

  const removeField = (index) => {
    setFields(fields.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (fields.length === 0 || ingridients.length === 0) {
      alert("Please add at least one raw material and one ingredient.");
      return;
    }
    const orderData = { id, rawMaterials: fields, ingredients: ingridients };
    try {
      const newOrder = await createOrder(orderData);
      alert("Order Created Successfully");
      navigate(`/viewOrder/${id}/${newOrder.order._id}`);
    } catch (error) {
      alert("Failed to create order");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-lg p-6 w-full max-w-2xl"
      >
        <h2 className="text-2xl font-semibold text-gray-800 text-center mb-4">
          Create Order for Customer {id}
        </h2>

        {/* Raw Materials Section */}
        <div className="mb-6">
          <button
            type="button"
            onClick={addFields}
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-200"
          >
            + Add Raw Material (Given by Customer)
          </button>

          {fields.map((field, index) => (
            <div key={index} className="flex gap-2 mt-3 items-center">
              <span className="p-2">{index + 1}.</span>
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={field.name}
                onChange={(e) => handleChange(index, e)}
                className="p-2 border rounded w-1/3 focus:ring-2 focus:ring-blue-400"
                required
              />
              <input
                type="number"
                name="quantity"
                placeholder="Quantity"
                value={field.quantity}
                onChange={(e) => handleChange(index, e)}
                className="p-2 border rounded w-1/4 focus:ring-2 focus:ring-blue-400"
                required
              />
              <input
                type="number"
                name="price"
                placeholder="Price per unit"
                value={field.price}
                onChange={(e) => handleChange(index, e)}
                className="p-2 border rounded w-1/4 focus:ring-2 focus:ring-blue-400"
              />
              <button
                type="button"
                onClick={() => removeField(index)}
                className="p-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        {/* Ingredients Section */}
        <div className="mb-6">
          <button
            type="button"
            onClick={addIngridients}
            className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition duration-200"
          >
            + Add Ingredients (Provided by Us)
          </button>

          {ingridients.map((ingridient, index) => (
            <div key={index} className="flex gap-2 mt-3 items-center">
              <span className="p-2">{index + 1}.</span>
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={ingridient.name}
                onChange={(e) => handleChangeIngridients(index, e)}
                className="p-2 border rounded w-1/3 focus:ring-2 focus:ring-green-400"
                required
              />
              <input
                type="number"
                name="quantity"
                placeholder="Quantity"
                value={ingridient.quantity}
                onChange={(e) => handleChangeIngridients(index, e)}
                className="p-2 border rounded w-1/4 focus:ring-2 focus:ring-green-400"
                required
              />
              <input
                type="number"
                name="price"
                placeholder="Price per unit"
                value={ingridient.price}
                onChange={(e) => handleChangeIngridients(index, e)}
                className="p-2 border rounded w-1/4 focus:ring-2 focus:ring-green-400"
                required
              />
              <button
                type="button"
                onClick={() => removeIngridientsField(index)}
                className="p-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        <button
          type="submit"
          className="w-full bg-purple-500 text-white py-2 rounded hover:bg-purple-600 transition duration-200"
        >
          Submit Order
        </button>
      </form>
    </div>
  );
};

export default OrderForm;
