import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Button, Toast, ToastContainer } from "react-bootstrap";
import { BsArrowLeft } from "react-icons/bs";
import MyNavbar from "./MyNavbar.jsx"; // Assuming this component exists
import { db } from "../Firebase/firebase.js"; // Assuming db is correctly imported and configured
import { doc, getDoc, collection, query, where, limit, getDocs } from "firebase/firestore";

function ProductDetail() {
  const { productId } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState("");

  // Fetch product details
  useEffect(() => {
    const fetchProduct = async () => {
      // Reset states on productId change
      setProduct(null);
      setSimilarProducts([]);

      try {
        const docRef = doc(db, "products", productId);
        const snap = await getDoc(docRef);

        if (snap.exists()) {
          const productData = { id: snap.id, ...snap.data() };
          setProduct(productData);

          // Fetch similar products
          if (productData.category) {
            const q = query(
              collection(db, "products"),
              where("category", "==", productData.category),
              // Filter out the current product ID on the client side
              limit(5)
            );
            const querySnap = await getDocs(q);
            const allProducts = querySnap.docs.map((d) => ({ id: d.id, ...d.data() }));
            
            // Exclude current product and take up to 4 similar ones
            const filtered = allProducts.filter((p) => p.id !== productData.id).slice(0, 4);
            setSimilarProducts(filtered);
          }
        } else {
          console.warn(`Product with ID ${productId} not found in Firestore`);
          setProduct(false); // Signal that product was searched for but not found
        }
      } catch (error) {
        console.error("Error fetching product:", error);
        setProduct(false); // Signal an error occurred
      }
    };
    fetchProduct();
  }, [productId]);

  const handleDecrease = () => setQuantity((q) => Math.max(1, q - 1));
  const handleIncrease = () => setQuantity((q) => q + 1);

  const handleAddToCart = () => {
    // In a real app, you'd dispatch an action or update a global cart state here
    setToastMsg(`${quantity} ${product.name}(s) added to cart!`);
    setShowToast(true);
    // Optionally, reset quantity to 1 after adding to cart
    setQuantity(1); 
  };
  
  // Handle Loading and Not Found states
  if (product === null) return <div className="text-center py-5">Loading...</div>;
  if (product === false) return <div className="text-center py-5">Product not found!</div>;

  return (
    <>
      <MyNavbar />
      <div className="container py-5" style={{ background: "#f7f9fa", minHeight: "100vh" }}>
      
        {/* Breadcrumb Navigation */}
        <nav aria-label="breadcrumb" className="mb-2">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/products" style={{ color: "#111", textDecoration: "none", fontWeight: 500 }}>
                Products
              </Link>
            </li>
            {product.category && (
              <li className="breadcrumb-item">
                <Link
                  to={`/products?category=${encodeURIComponent(product.category)}`}
                  style={{ color: "#111", textDecoration: "none", fontWeight: 500 }}
                >
                  {product.category}
                </Link>
              </li>
            )}
            <li className="breadcrumb-item active" aria-current="page">
              {product.name}
            </li>
          </ol>
        </nav>

        <Button variant="light" onClick={() => navigate("/products")} className="mb-3">
          <BsArrowLeft style={{ marginRight: "6px", marginBottom: "2px" }} />
          <span style={{ fontWeight: 600 }}>Back to Products</span>
        </Button>

        {/* Product Details Row */}
        <div className="row">
          <div className="col-md-6">
            <img
              src={product.image}
              alt={product.name}
              className="img-fluid rounded"
              
              style={{ maxHeight: "400px", objectFit: "contain" }} 
            />
          </div>
          <div className="col-md-6">
            {product.category && (
                <span className="badge bg-light text-dark mb-2">{product.category}</span>
            )}
            <h2>{product.name}</h2>
            {product.rating && (
              <div className="mb-2">
                <span className="text-warning">
                  {"★".repeat(Math.floor(product.rating))}
                  {"☆".repeat(5 - Math.floor(product.rating))}
                </span>
                <span className="ms-2 text-muted">
                  ({product.rating} - {product.reviews || 0} reviews)
                </span>
              </div>
            )}
            <h3 className="text-primary mb-3">${Number(product.price).toFixed(2)}</h3>
            <h5>Description</h5>
            <p>{product.description}</p>
            {product.stock > 0 ? (
              <div className="mb-2">
                <span className="badge bg-success">{product.stock} in stock</span>
              </div>
            ) : (
                <div className="mb-2">
                    <span className="badge bg-danger">Out of stock</span>
                </div>
            )}

            {/* Quantity Selector */}
            <div className="d-flex align-items-center mb-3">
              <span className="me-2">Quantity</span>
              <Button 
                variant="outline-secondary" 
                size="sm" 
                onClick={handleDecrease} 
                disabled={quantity === 1}
              >
                -
              </Button>
              <span className="mx-2">{quantity}</span>
              <Button 
                variant="outline-secondary" 
                size="sm" 
                onClick={handleIncrease}
                disabled={product.stock && quantity >= product.stock} 
              >
                +
              </Button>
            </div>

            <Button 
                variant="dark" 
                className="w-100 mb-3" 
                onClick={handleAddToCart}
                disabled={product.stock <= 0} 
            >
              <i className="bi bi-cart"></i> Add to Cart - ${Number(product.price * quantity).toFixed(2)}
            </Button>
          </div>
        </div>

        
        {similarProducts.length > 0 && (
          <div className="mt-5">
            <h4>Similar Products</h4>
            <div className="row">
              {similarProducts.map((p) => (
                <div className="col-md-3 mb-4" key={p.id}>
                  <div className="card h-100">
                    <img
                      src={p.image}
                      className="card-img-top"
                      alt={p.name}
                      style={{ height: "180px", objectFit: "contain" }}
                    />
                    <div className="card-body d-flex flex-column">
                      <h6 className="card-title">{p.name}</h6>
                      <p className="text-primary fw-bold">${Number(p.price).toFixed(2)}</p>
                      <Button
                        as={Link}
                        to={`/product/${p.id}`}
                        variant="outline-dark"
                        className="mt-auto"
                      >
                        View
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Toast Notification */}
        <ToastContainer 
            position="bottom-end" 
            className="p-3" 
            style={{ zIndex: 9999 }}
        >
          <Toast 
            show={showToast} 
            onClose={() => setShowToast(false)} 
            bg="success" 
            delay={3000} 
            autohide
          >
            <Toast.Body style={{ color: "#fff", fontWeight: 500 }}>
              {toastMsg}
            </Toast.Body>
          </Toast>
        </ToastContainer>
      </div>
    </>
  );
}

export default ProductDetail;