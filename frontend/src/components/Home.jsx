import React from "react";
import CustomerForm from "./CustomerForm";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-3xl">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">
          Customer & Order Management
        </h1>
        <CustomerForm />
      </div>
    </div>
  );
};

export default Home;
