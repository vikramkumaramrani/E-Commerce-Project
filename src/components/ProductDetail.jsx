import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Toast, ToastContainer } from "react-bootstrap";
import { BsArrowLeft } from "react-icons/bs";
import MyNavbar from "./MyNavbar.jsx";
import { Link } from "react-router-dom";
import Yoga from "../assets/images/yoga.jpg";
import Shoes from "../assets/images/shoes.jpg"; 
import Headphones from "../assets/images/headphone.jpg";


const productData = {
  "Wireless Headphones": {
    name: "Wireless Bluetooth Headphones",
    image: Headphones, 
    price: 99.99,
    category: "Electronics",
    rating: 4.5,
    reviews: 123,
    description: "Premium quality wireless headphones with noise cancellation and 30-hour battery life.",
    stock: 50,
    features: [
      "Free shipping over $50",
      "1 year warranty",
      "30-day returns"
    ],
    related: {
      name: "Smartphone Case",
      image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&h=500&fit=crop",
      price: 24.99,
      description: "Durable protective case for smartphones with shock absorption technology."
    }
  },
  "Smartphone Case": {
    name: "Wireless Bluetooth Headphones",
    image: Headphones,
    price: 99.99,
    category: "Electronics",
    rating: 4.2,
    reviews: 87,
    description: "Premium quality wireless headphones with noise cancellation and 30-hour battery life.",
    stock: 100,
    features: [
      "Free shipping over $50",
      "1 year warranty",
      "30-day returns"
    ],
    related: {
      name: "Wireless Bluetooth Headphones",
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop",
      price: 99.99,
      description: "Premium quality wireless headphones with noise cancellation and 30-hour battery life."
    }
  },
  "Yoga Mat": {
    name: "Yoga Mat",
    image: Yoga, 
    price: 79.99,
    category: "Sports",
    rating: 4.3,
    reviews: 45,
    description: "Non-slip yoga mat made from eco-friendly materials.",
    stock: 30,
    features: [
      "Free shipping over $50",
      "1 year warranty",
      "30-day returns"
    ],
    related: {
      name: "Running Shoes",
      image: Shoes, 
      price: 59.99,
      description: "Comfortable running shoes with advanced cushioning technology."
    }
  }
};

function ProductDetail() {
  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const handleAddToCart = () => {
    setToastMsg(`${quantity} ${product.name}(s) added to cart!`);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2500);
  };
  useEffect(() => {
    const originalBg = document.body.style.background;
    document.body.style.background = '#f7f9fa';
    return () => { document.body.style.background = originalBg; };
  }, []);
  const { productName } = useParams();
  const navigate = useNavigate();
  const product = productData[productName] || productData["Wireless Headphones"];
  const [quantity, setQuantity] = useState(1);
  const handleDecrease = () => setQuantity(q => Math.max(1, q - 1));
  const handleIncrease = () => setQuantity(q => q + 1);

  return (
    <>
      <MyNavbar />
  <div className="container py-5" style={{ background: '#f7f9fa', minHeight: '100vh' }}>
        
        <nav aria-label="breadcrumb" className="mb-2">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/product" style={{ color: '#111', textDecoration: 'none', fontWeight: 500 }}>Products</Link>
            </li>
            <li className="breadcrumb-item">
              <Link to={`/product?category=${encodeURIComponent(product.category)}`}
                style={{ color: '#111', textDecoration: 'none', fontWeight: 500 }}>
                {product.category}
              </Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              {product.name}
            </li>
          </ol>
        </nav>
      <Button variant="light" onClick={() => navigate("/products")} className="mb-3">
  <BsArrowLeft style={{marginRight: '6px', marginBottom: '2px'}} />
  <span style={{fontWeight: 600}}>Back to Products</span>
      </Button>
      <div className="row">
        <div className="col-md-6">
          <img src={product.image} alt={product.name} className="img-fluid rounded" style={{ }} />
        </div>
        <div className="col-md-6">
          <span className="badge bg-light text-dark mb-2">{product.category}</span>
          <h2>{product.name}</h2>
          <div className="mb-2">
            <span className="text-warning">{'★'.repeat(Math.floor(product.rating))}{'☆'.repeat(5-Math.floor(product.rating))}</span>
            <span className="ms-2 text-muted">({product.rating} - {product.reviews} reviews)</span>
          </div>
          <h3 className="text-primary mb-3">${product.price.toFixed(2)}</h3>
          <h5>Description</h5>
          <p>{product.description}</p>
          <div className="mb-2">
            <span className="badge bg-success">{product.stock} in stock</span>
          </div>
          <div className="d-flex align-items-center mb-3">
            <span className="me-2">Quantity</span>
            <Button variant="outline-secondary" size="sm" onClick={handleDecrease} disabled={quantity === 1}>-</Button>
            <span className="mx-2">{quantity}</span>
            <Button variant="outline-secondary" size="sm" onClick={handleIncrease}>+</Button>
          </div>
          <Button variant="dark" className="w-100 mb-3" onClick={handleAddToCart}>
            <i className="bi bi-cart"></i> Add to Cart - ${(product.price * quantity).toFixed(2)}
          </Button>
          <div className="d-flex gap-4">
            <span><i className="bi bi-truck"></i> {product.features[0]}</span>
            <span><i className="bi bi-shield-check"></i> {product.features[1]}</span>
            <span><i className="bi bi-arrow-counterclockwise"></i> {product.features[2]}</span>
          </div>
        </div>
      </div>
     
  <ToastContainer position="fixed" className="p-3" style={{ zIndex: 9999, bottom: -120, end: 0, right: 0 }}>
        <Toast show={showToast} onClose={() => setShowToast(false)} bg="white" delay={2500} autohide>
          <Toast.Body style={{ color: '#111', fontWeight: 500 }}>
            <span style={{ color: 'green', marginRight: 8 }}>&#10003;</span> {toastMsg}
          </Toast.Body>
        </Toast>
      </ToastContainer>
      <div className="mt-5">
        <h4>Related Products</h4>
        <div className="card" style={{width:'16rem'}}>
          <img src={product.related.image} className="card-img-top" alt={product.related.name} />
          <div className="card-body">
            <h5 className="card-title">{product.related.name}</h5>
            <p className="card-text">{product.related.description}</p>
            <div className="d-flex align-items-center justify-content-between">
              <span className="text-primary fw-bold">${product.related.price.toFixed(2)}</span>
              <Button
                variant="outline-dark"
                as={Link}
                to={`/product/${encodeURIComponent(product.related.name)}`}
              >
                View
              </Button>
            </div>
          </div>
        </div>
      </div>
      </div>
    </>
  );
}

export default ProductDetail;
