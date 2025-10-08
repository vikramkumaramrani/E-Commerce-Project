// import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import { StrictMode } from "react";
// import { createRoot } from "react-dom/client";
// // import "./index.css";
// import Home from "./Pages/Home.jsx";
// import Login from "./Pages/Login.jsx";
// import Signup from "./Pages/Signup.jsx";
// import Product from "./Pages/Product.jsx";
// import Dashboard from "./Pages/Dashboard.jsx";
// import ProductManage from "./Pages/ProductManage.jsx";
// import OrderManage from "./Pages/OrderManage.jsx";
// import ProductDetail from "./components/ProductDetail.jsx";
// import "bootstrap/dist/css/bootstrap.min.css";


// import MyProvider from "./context/MyProvider.jsx";

// createRoot(document.getElementById("root")).render(
//   <StrictMode>
//     <MyProvider>
//       <BrowserRouter>
//         <Routes>

//           <Route path="/" element={<Navigate to="/home" />} />

//           <Route path="/Product" element={<Product />} />
//           <Route path="/products" element={<Product />} />
//           <Route path="/Login" element={<Login />} />
//           <Route path="/signup" element={<Signup />} />
//           <Route path="/dashboard" element={<Dashboard />} />
//           <Route path="/productManage" element={<ProductManage />} />
//           <Route path="/orderManage" element={<OrderManage />} />
//           <Route path="/home" element={<Home />} />
//           <Route path="/product/:id" element={<ProductDetail />} />


//           {/* <Route path="/product/:productName" element={<ProductDetail />} /> */}
//           <Route path="/product/:productId" element={<ProductDetail />} />

//         </Routes>
//       </BrowserRouter>
//     </MyProvider>
//   </StrictMode>
// );




import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

// Page imports
import Home from "./Pages/Home.jsx";
import Login from "./Pages/Login.jsx";
import Signup from "./Pages/Signup.jsx";
import Product from "./Pages/Product.jsx";
import Dashboard from "./Pages/Dashboard.jsx";
import ProductManage from "./Pages/ProductManage.jsx";
import OrderManage from "./Pages/OrderManage.jsx";

// Component imports
import ProductDetail from "./components/ProductDetail.jsx";

// Styles
import "bootstrap/dist/css/bootstrap.min.css";

// Context
import MyProvider from "./context/MyProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <MyProvider>
      <BrowserRouter>
        <Routes>
          {/* Default route redirect */}
          <Route path="/" element={<Navigate to="/home" />} />

          {/* Main pages */}
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/productManage" element={<ProductManage />} />
          <Route path="/orderManage" element={<OrderManage />} />

          {/* Product listing pages */}
          <Route path="/product" element={<Product />} />
          <Route path="/products" element={<Product />} />

          {/* Product details — ✅ Only one correct route */}
          <Route path="/product/:productId" element={<ProductDetail />} />

          {/* Optional — Handle invalid product route */}
          <Route
            path="/product"
            element={
              <div
                style={{
                  textAlign: "center",
                  paddingTop: "150px",
                  fontFamily: "Inter, sans-serif",
                }}
              >
                <h3>Invalid Product URL</h3>
                <p>Please return to <a href="/products">Products</a>.</p>
              </div>
            }
          />
        </Routes>
      </BrowserRouter>
    </MyProvider>
  </StrictMode>
);
