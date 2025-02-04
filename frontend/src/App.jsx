import "./App.css";

import OrderForm from "./components/OrderForm";
import NavBar from "./components/NavBar";
import { Route, Router, Routes } from "react-router-dom";
import Home from "./components/Home";
import OrderList from "./components/OrderList";
import CustomerData from "./components/CustomerData";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/orderForm/:id" element={<OrderForm />} />
        <Route path="/viewOrder/:id/:orderId" element={<OrderList />} />
        <Route path="/customer/:id" element={<CustomerData />} />
      </Routes>
    </>
  );
}

export default App;
