import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Button,
  Breadcrumb,
  Card,
  Toast,
  ToastContainer,
} from "react-bootstrap";
// import MyNavbar from "../components/MyNavbar";
import Footer from "../components/Footer";

import coffee from "../assets/images/coffee.jpg";
import laptop from "../assets/images/laptop.jpg";
import shoes from "../assets/images/shoes.jpg";
import headphones from "../assets/images/headphone.jpg";
import tshirt from "../assets/images/tshirt.jpg";
import watch from "../assets/images/watch.jpg";

function ProductDetail() {
  const { id } = useParams();
  const [showToast, setShowToast] = useState(false);

  const allProducts = [
    { id: 1, name: "Coffee Maker", price: 129.99, stock: 25, category: "Home", image: coffee, description: "Programmable coffee maker with built-in grinder and thermal carafe." },
    { id: 2, name: "Laptop", price: 899.99, stock: 10, category: "Electronics", image: laptop, description: "High-performance laptop with 16GB RAM and SSD storage." },
    { id: 3, name: "Shoes", price: 59.99, stock: 30, category: "Fashion", image: shoes, description: "Comfortable running shoes with breathable fabric." },
    { id: 4, name: "Headphones", price: 199.99, stock: 20, category: "Electronics", image: headphones, description: "Noise-cancelling wireless headphones with 30hr battery life." },
    { id: 5, name: "T-Shirt", price: 25.0, stock: 60, category: "Fashion", image: tshirt, description: "Soft cotton t-shirt available in multiple colors." },
    { id: 6, name: "Watch", price: 149.99, stock: 12, category: "Fashion", image: watch, description: "Stylish analog watch with leather strap." },
  ];

  const product = allProducts.find((p) => p.id === parseInt(id));

  if (!product) {
    return <h2 className="text-center py-5">Product not found!</h2>;
  }

  const related = allProducts.filter(
    (p) => p.category === product.category && p.id !== product.id
  );

import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Button, Toast, ToastContainer } from "react-bootstrap";
import { BsArrowLeft } from "react-icons/bs";
import MyNavbar from "./MyNavbar.jsx";
import { db } from "../Firebase/firebase.js";
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
              limit(5) // 1 current + 4 similar
            );
            const querySnap = await getDocs(q);
            const allProducts = querySnap.docs.map((d) => ({ id: d.id, ...d.data() }));
            // Exclude current product
            const filtered = allProducts.filter((p) => p.id !== productData.id).slice(0, 4);
            setSimilarProducts(filtered);
          }
        } else {
          console.warn("Product not found in Firestore");
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };
    fetchProduct();
  }, [productId]);


  const handleAddToCart = () => {
    
    setShowToast(true);
  };

  return (
    <>
      {/* <MyNavbar /> */}

      <Container className="py-4">
       
        <Breadcrumb className="mt-2" style={{ ["--bs-breadcrumb-divider"]: "'>'" }}>
          <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/" }}>
            Home
          </Breadcrumb.Item>
          <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/products" }}>
            Products
          </Breadcrumb.Item>
          <Breadcrumb.Item active>{product.name}</Breadcrumb.Item>
        </Breadcrumb>

       
        <Row className="gy-4 align-items-center">
          <Col xs={12} md={6}>
            <img
              src={product.image}
              alt={product.name}
              className="img-fluid rounded shadow"
              style={{ width: "100%", height: "550px", objectFit: "cover" }}
            />
          </Col>

          <Col xs={12} md={6}>
            <h2>{product.name}</h2>
            <div className="mb-2 text-warning">
              ★★★★☆ <span className="text-muted">(4.5 - 123 reviews)</span>
            </div>
            <h3 className="text-primary">${product.price}</h3>
            <p className="text-muted">{product.description}</p>
            <p>
              <strong className="text-success">{product.stock} in stock</strong>
            </p>

            <div className="d-flex flex-wrap gap-2 mb-3">
              <Button
                variant="dark"
                className="flex-fill"
                onClick={handleAddToCart}
              >
                Add to Cart - ${product.price}
              </Button>
            </div>

            <div className="d-flex flex-wrap gap-3 text-muted small">
              <span>🚚 Free shipping over $50</span>
              <span>🛡️ 1 year warranty</span>
              <span>↩️ 30-day returns</span>
            </div>
          </Col>
        </Row>

       
        {related.length > 0 && (
          <div className="mt-5">
            <h4>Related Products</h4>
            <Row className="g-4 mt-2">
              {related.map((r) => (
                <Col key={r.id} xs={12} sm={6} md={4} lg={3}>
                  <Card className="h-100 shadow-sm">
                    <Card.Img
                      variant="top"
                      src={r.image}
                      alt={r.name}
                      style={{ height: "200px", width: "100%", objectFit: "cover" }}
                    />
                    <Card.Body>
                      <Card.Title as="h6">{r.name}</Card.Title>
                      <Card.Text className="text-primary fw-bold">
                        ${r.price}
                      </Card.Text>
                      <Link to={`/product/${r.id}`}>
                        <Button
                          size="sm"
                          variant="outline-primary"
                          className="w-100"
                        >
                          View
                        </Button>
                      </Link>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
        )}
      </Container>

     
      <ToastContainer position="bottom-end" className="p-3" style={{ marginTop: "30px" }}>
        <Toast
          onClose={() => setShowToast(false)}
          show={showToast}
          delay={3000}
          autohide
          bg="success"
        >
          
          <Toast.Body>
             1 {product.name}(s) added to cart!
          </Toast.Body>
        </Toast>
      </ToastContainer>

      <Footer />


  const handleDecrease = () => setQuantity((q) => Math.max(1, q - 1));
  const handleIncrease = () => setQuantity((q) => q + 1);

  if (!product) return <div className="text-center py-5">Loading...</div>;

  return (
    <>
      <MyNavbar />
      <div className="container py-5" style={{ background: "#f7f9fa", minHeight: "100vh" }}>
      
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
            <span className="badge bg-light text-dark mb-2">{product.category || "General"}</span>
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
            {product.stock && (
              <div className="mb-2">
                <span className="badge bg-success">{product.stock} in stock</span>
              </div>
            )}

            
            <div className="d-flex align-items-center mb-3">
              <span className="me-2">Quantity</span>
              <Button variant="outline-secondary" size="sm" onClick={handleDecrease} disabled={quantity === 1}>
                -
              </Button>
              <span className="mx-2">{quantity}</span>
              <Button variant="outline-secondary" size="sm" onClick={handleIncrease}>
                +
              </Button>
            </div>

            <Button variant="dark" className="w-100 mb-3" onClick={handleAddToCart}>
              <i className="bi bi-cart"></i> Add to Cart - ${(product.price * quantity).toFixed(2)}
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
        <ToastContainer position="fixed" className="p-3" style={{ zIndex: 9999, bottom: -120, end: 0, right: 0 }}>
          <Toast show={showToast} onClose={() => setShowToast(false)} bg="white" delay={2500} autohide>
            <Toast.Body style={{ color: "#111", fontWeight: 500 }}>
              <span style={{ color: "green", marginRight: 8 }}>&#10003;</span> {toastMsg}
            </Toast.Body>
          </Toast>
        </ToastContainer>
      </div>
    </>
  );
}

export default ProductDetail;
