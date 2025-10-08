import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Toast, ToastContainer } from "react-bootstrap";
import { db } from "../Firebase/firebase";
import { collection, getDocs } from "firebase/firestore";
import "./../Styles/products.css";
import shoes from "../assets/images/shoes.jpg";

function Products() {
  const navigate = useNavigate();
  const [, setCart] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);



  const DEFAULT_IMAGE_URL = "https://placehold.co/500x500?text=Product+Image";

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsRef = collection(db, "products");
        const snapshot = await getDocs(productsRef);
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(data);
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
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

  if (loading) {
    return (
      <div
        className="text-center my-5"
        style={{ fontFamily: "Inter, sans-serif", paddingTop: "100px" }}
      >
        <h4>Loading products...</h4>
      </div>
    );
  }

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
                      src={p.image || DEFAULT_IMAGE_URL}
                      className="card-img-top zoom-img"
                      alt={p.name}
                      style={{ maxHeight: "250px", objectFit: "cover" }}
                    />
                  </div>
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title d-flex justify-content-between align-items-center">
                      {p.name}
                      <span className="badge bg-secondary">{p.category}</span>
                    </h5>
                    <p className="card-text flex-grow-1">
                      {p.desc || "No description available."}
                    </p>
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
              <div className="col-12 col-sm-6 col-lg-4">
                <div className="card shadow-sm h-100 product-card">
                  <div className="image-wrapper">
                    <img
                      src={shoes}
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
                          onClick={() => navigate(`/product/local-shoes`)}
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

              <div className="col-12 col-sm-6 col-lg-4">
                <div className="card shadow-sm h-100 product-card">
                  <div className="image-wrapper">
                    <img
                      src="https://media.istockphoto.com/id/814423752/photo/eye-of-model-with-colorful-art-make-up-close-up.jpg?s=612x612&w=0&k=20&c=l15OdMWjgCKycMMShP8UK94ELVlEGvt7GmB_esHWPYE="
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
                          onClick={() => navigate("/product/local-yogamat")}
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

        <div className="text-center mt-5">
          <button
            id="view-btn"
            className="btn btn-lg"
            style={{
              backgroundColor: "#fff",
              color: "black",
              borderColor: "#b3b1b1ff",
              fontWeight: "500",
            }}
            onClick={() => navigate("/products")}
          >
            View All Product
          </button>
        </div>
      </div>

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
