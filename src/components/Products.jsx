import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Toast, ToastContainer } from "react-bootstrap";
import { db } from "../Firebase/firebase";
import { collection, getDocs } from "firebase/firestore";
import "./../Styles/products.css";

function Products() {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState("");

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsRef = collection(db, "products");
        const snapshot = await getDocs(productsRef);
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          // Assuming your product data includes a 'imageUrl' field
          // If you use a different field name, replace 'imageUrl' below.
          ...doc.data(),
        }));

        setProducts(data);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = (productName) => {
    setCart((prev) => [...prev, productName]);
    setToastMsg(`${productName} added to cart!`);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2500);
  };

  // Default Image for placeholder cards, if not present in the placeholder data
  const DEFAULT_IMAGE_URL = "https://via.placeholder.com/500x500.png?text=Product+Image";

  return (
    <>
      <div
        className="text-center my-5 px-3"
        style={{ fontFamily: "Inter, sans-serif", paddingTop: "100px" }}
      >
        <h2>Featured Products</h2>
        <p className="lead" style={{ color: "#555" }}>
          Check out our most popular items
        </p>
      </div>

      <div className="container py-5">
        <div className="row g-4 justify-content-center">

          {products.length > 0 ? (
            products.slice(0, 3).map((p) => (
             
              <div className="col-12 col-sm-6 col-lg-4" key={p.id}>
                <div className="card shadow-sm h-100 product-card">
                  <div className="image-wrapper">
                  
                    <img
                      
                      src={p.imageUrl} 
                      className="card-img-top zoom-img"
                      alt={p.name}
                      style={{ maxHeight: "250px", objectFit: "cover" }}
                    />
                  </div>
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title d-flex justify-content-between align-items-center">
                      {p.name}{" "}
                      <span className="badge bg-secondary">{p.category}</span>
                    </h5>
                    <p className="card-text flex-grow-1">{p.description}</p> 

                    <div className="d-flex justify-content-between align-items-center mb-2 mt-auto"> 
                      <h4 className="text-primary">${p.price}</h4>
                      <div className="d-flex gap-2">
                        <button
                          className="btn btn-outline-primary btn-sm"
                          onClick={() => navigate(`/product/${p.id}`)}
                        >
                          View
                        </button>
                        <button
                          className="btn btn-dark btn-sm"
                          onClick={() => handleAddToCart(p.name)}
                        >
                          <i className="bi bi-cart"></i> Add
                        </button>
                      </div>
                    </div>

                    {p.rating && (
                      <div className="text-warning">
                        {"★".repeat(Math.floor(p.rating))}
                        {"☆".repeat(5 - Math.floor(p.rating))}
                        <span className="text-muted"> ({p.rating})</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            
            <>
              {/* Shoes Placeholder Card */}
              <div className="col-12 col-sm-6 col-lg-4">
                <div className="card shadow-sm h-100 product-card">
                  <div className="image-wrapper">
                    {/* Dynamic Image Path (Placeholder) */}
                    <img
                      src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop"
                      className="card-img-top zoom-img"
                      alt="Shoes"
                      style={{ maxHeight: "250px", objectFit: "cover" }}
                    />
                  </div>
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title d-flex justify-content-between align-items-center">
                      Shoes <span className="badge bg-secondary">Sports</span>
                    </h5>
                    <p className="card-text flex-grow-1">
                      Comfortable running shoes with advanced cushioning
                      technology.
                    </p>

                    <div className="d-flex justify-content-between align-items-center mb-2 mt-auto">
                      <h4 className="text-primary">$149.99</h4>
                      <div className="d-flex gap-2">
                        <button
                          className="btn btn-outline-primary btn-sm"
                          onClick={() => navigate("/product/Shoes")}
                        >
                          View
                        </button>
                        <button
                          className="btn btn-dark btn-sm"
                          onClick={() => handleAddToCart("Shoes")}
                        >
                          <i className="bi bi-cart"></i> Add
                        </button>
                      </div>
                    </div>

                    <div className="text-warning">
                      ★★★★☆ <span className="text-muted">(4.7)</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Yoga Mat Placeholder Card */}
              <div className="col-12 col-sm-6 col-lg-4">
                <div className="card shadow-sm h-100 product-card">
                  <div className="image-wrapper">
                    {/* Dynamic Image Path (Placeholder) */}
                    <img
                      src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=500&h=500&fit=crop"
                      className="card-img-top zoom-img"
                      alt="Yoga Mat"
                      style={{ maxHeight: "250px", objectFit: "cover" }}
                    />
                  </div>
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title d-flex justify-content-between align-items-center">
                      Yoga Mat <span className="badge bg-secondary">Sports</span>
                    </h5>
                    <p className="card-text flex-grow-1">
                      Non-slip yoga mat made from eco-friendly materials.
                    </p>

                    <div className="d-flex justify-content-between align-items-center mb-2 mt-auto">
                      <h4 className="text-primary">$79.99</h4>
                      <div className="d-flex gap-2">
                        <button
                          className="btn btn-outline-primary btn-sm"
                          onClick={() => navigate("/product/Yoga Mat")}
                        >
                          View
                        </button>
                        <button
                          className="btn btn-dark btn-sm"
                          onClick={() => handleAddToCart("Yoga Mat")}
                        >
                          <i className="bi bi-cart"></i> Add
                        </button>
                      </div>
                    </div>

                    <div className="text-warning">
                      ★★★★☆ <span className="text-muted">(4.5)</span>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* View All Products Button */}
        <div className="text-center mt-5">
          <button
            id="view-btn"
            className="btn btn-lg" // Use btn-lg for a larger button on all screens
            style={{
              backgroundColor: "#ffffffff",
              color: "black",
              borderColor: "#b3b1b1ff",
              fontWeight: "500",
            }}
            onClick={() => navigate("/products")}
          >
            View All Products
          </button>
        </div>
      </div>

      {/* Toast Container */}
      <ToastContainer
        position="fixed"
        className="p-3"
        style={{ zIndex: 9999, bottom: 0, right: 0 }}
      >
        <Toast
          show={showToast}
          onClose={() => setShowToast(false)}
          bg="dark"
          delay={2500}
          autohide
        >
          <Toast.Body className="text-white">{toastMsg}</Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  );
}

export default Products;