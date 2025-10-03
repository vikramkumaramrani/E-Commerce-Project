import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./../Styles/products.css";
import { Toast, ToastContainer } from "react-bootstrap";

function Products() {
  const navigate = useNavigate();
  const [Cart, setCart] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const handleAddToCart = (productName) => {
    setCart((prev) => [...prev, productName]);
    setToastMsg(`${productName} added to cart!`);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2500);
  };
  return (
    <>
      <div
        className="text-center my-5 px-3"
        style={{ fontFamily: "Inter, sans-serif", paddingTop: "100px" }}
      >
        <h2>Featured Products</h2>
        <p style={{ fontSize: "20px", color: "#555" }}>
          Check out our most popular items
        </p>
      </div>

      <div className="container py-5">
        <div className="row g-4">
          {/* Card 1 */}
          <div className="col-md-4">
            <div className="card shadow-sm h-100 product-card">
              <div className="image-wrapper">
              <img
                src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop"
                className="card-img-top zoom-img"
                alt="Headphones"
              />
              </div>
              <div className="card-body">
                <h5 className="card-title d-flex justify-content-between align-items-center">
                  Wireless Headphones{" "}
                  <span className="badge bg-secondary">Electronics</span>
                </h5>
                <p className="card-text">
                  Premium quality wireless headphones with noise cancellation and
                  30-hour battery life.
                </p>

                <div className="d-flex justify-content-between align-items-center mb-2">
                  <h4 className="text-primary">$99.99</h4>
                  <div className="d-flex gap-2">
                    <button className="btn btn-outline-primary btn-sm" onClick={() => navigate('/product/Wireless Headphones')}>View</button>
                    <button className="btn btn-dark btn-sm" onClick={() => handleAddToCart("Wireless Headphones") }>
                      <i className="bi bi-cart"></i> Add
                    </button>
                  </div>
                </div>

                <div className="mb-2 text-warning">
                  ★★★★☆ <span className="text-muted">(4.5)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="col-md-4">
            <div className="card shadow-sm h-100 product-card">
              <div className="image-wrapper">
              <img
                src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop"
                className="card-img-top zoom-img"
                alt="Smart Watch"
              />
              </div>
              <div className="card-body">
                <h5 className="card-title d-flex justify-content-between align-items-center">
                  Shoes <span className="badge bg-secondary">Sports</span>
                </h5>
                <p className="card-text">
                  Comfortable running shoes with advanced cushioning technology.
                </p>

                <div className="d-flex justify-content-between align-items-center mb-2">
                  <h4 className="text-primary">$149.99</h4>
                  <div className="d-flex gap-2">
                    <button className="btn btn-outline-primary btn-sm" onClick={() => navigate('/product/Smart Watch')}>View</button>
                    <button className="btn btn-dark btn-sm" onClick={() => handleAddToCart("Smart Watch") }>
                      <i className="bi bi-cart"></i> Add
                    </button>
                  </div>
                </div>

                <div className="mb-2 text-warning">
                  ★★★★☆ <span className="text-muted">(4.7)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 3 */}
         <div className="col-md-4">
  <div className="card shadow-sm h-100 product-card">
    <div className="image-wrapper">
      <img
        src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=500&h=500&fit=crop"
        className="card-img-top zoom-img"
        alt="Speaker"
      />
    </div>
    <div className="card-body">
      <h5 className="card-title d-flex justify-content-between align-items-center">
        Yoga Mat <span className="badge bg-secondary">Sports</span>
      </h5>
      <p className="card-text">
        Non-slip yoga mat made from eco-friendly materials.
      </p>

      <div className="d-flex justify-content-between align-items-center mb-2">
        <h4 className="text-primary">$79.99</h4>
        <div className="d-flex gap-2">
          <button className="btn btn-outline-primary btn-sm" onClick={() => navigate('/product/Yoga Mat')}>View</button>
          <button className="btn btn-dark btn-sm" onClick={() => handleAddToCart("Yoga Mat") }>
            <i className="bi bi-cart"></i> Add
          </button>
        </div>
      </div>

      <div className="mb-2 text-warning">
        ★★★★☆ <span className="text-muted">(4.3)</span>
      </div>
    </div>
  </div>
</div>


        </div>
        <div className="text-center mt-5" >
          <button
            id="view-btn"
            className="btn btn-success"
            style={{
              backgroundColor: "#ffffffff",
              color: "black",
              borderColor: "#b3b1b1ff",
              fontWeight: "500"
            }}
            onClick={() => navigate('/products')}
          >
            View All Products
          </button>
        </div>
      </div>
      
      <ToastContainer position="fixed" className="p-3" style={{ zIndex: 9999, bottom: 0, end: 0, right: 0 }}>
        <Toast show={showToast} onClose={() => setShowToast(false)} bg="dark" delay={2500} autohide>
          <Toast.Body className="text-white">{toastMsg}</Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  );
}

export default Products;
