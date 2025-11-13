import React, { StrictMode, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { createRoot } from "react-dom/client";

import Home from "./Pages/Home.jsx";
import Login from "./Pages/Login.jsx";
import Signup from "./Pages/Signup.jsx";
import Product from "./Pages/Product.jsx";
import Dashboard from "./Pages/Dashboard.jsx";
import ProductManage from "./Pages/ProductManage.jsx";
import OrderManage from "./Pages/OrderManage.jsx";
import ProductDetail from "./components/ProductDetail.jsx";

import "bootstrap/dist/css/bootstrap.min.css";
import MyProvider from "./context/MyProvider.jsx";

//  Import visitor counter
import { countVisitor } from "./Firebase/firebase.js";

//  VisitorTracker Component
function VisitorTracker({ children }) {
  useEffect(() => {
    countVisitor(); // call on first load
  }, []);
  return <>{children}</>; // wrap children in React Fragment
}

// 🔹 Render App
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <MyProvider>
      <BrowserRouter>
        <VisitorTracker>
          <Routes>
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/productManage" element={<ProductManage />} />
            <Route path="/orderManage" element={<OrderManage />} />
            <Route path="/product" element={<Product />} />
            <Route path="/products" element={<Product />} />
            <Route path="/product/:productId" element={<ProductDetail />} />

            <Route
              path="*"
              element={
                <div
                  style={{
                    textAlign: "center",
                    paddingTop: "150px",
                    fontFamily: "Inter, sans-serif",
                  }}
                >
                  <h3>Page Not Found</h3>
                  <p>
                    Please return to <a href="/home">Home</a> or{" "}
                    <a href="/products">Products</a>.
                  </p>
                </div>
              }
            />
          </Routes>
        </VisitorTracker>
      </BrowserRouter>
    </MyProvider>
  </StrictMode>
);
