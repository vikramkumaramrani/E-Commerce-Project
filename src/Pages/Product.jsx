import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Card, Button, Badge } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom"; //  Added useNavigate
import { collection, onSnapshot } from "firebase/firestore";
import { db, auth } from "../Firebase/firebase"; //  Added auth import
import MyNavbar from "../components/MyNavbar";
import Footer from "../components/Footer";
import "./product.css";
import coffee from "../assets/images/coffee.jpg";
import laptop from "../assets/images/laptop.jpg";
import shoes from "../assets/images/shoes.jpg";
import headphones from "../assets/images/headphone.jpg";
import tshirt from "../assets/images/tshirt.jpg";
import watch from "../assets/images/watch.jpg";

function Product() {
  const location = useLocation();
  const navigate = useNavigate(); //  Added for redirect
  const [allProducts, setAllProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [price, setPrice] = useState("all");
  const [sort, setSort] = useState("name");

  useEffect(() => {
    if (!db) return;

    const unsubscribe = onSnapshot(
      collection(db, "products"),
      snapshot => {
        const products = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          price: Number(doc.data().price) || 0,
        }));
        setAllProducts(products);
      },
      error => console.error("Error fetching products:", error)
    );

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const cat = params.get("category");
    if (cat) setCategory(cat.toLowerCase());
  }, [location.search]);

  let filteredProducts = allProducts;

  if (search) {
    filteredProducts = filteredProducts.filter(p =>
      p.name?.toLowerCase().includes(search.toLowerCase()) ||
      p.desc?.toLowerCase().includes(search.toLowerCase()) ||
      p.category?.toLowerCase().includes(search.toLowerCase())
    );
  }

  if (category !== "all") {
    filteredProducts = filteredProducts.filter(p => p.category?.toLowerCase() === category);
  }

  if (price !== "all") {
    filteredProducts = filteredProducts.filter(p => {
      const pPrice = p.price || 0;
      if (price === "0-50") return pPrice <= 50;
      if (price === "50-100") return pPrice > 50 && pPrice <= 100;
      if (price === "100+") return pPrice > 100;
      return true;
    });
  }

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sort === "name") return (a.name || "").localeCompare(b.name || "");
    if (sort === "name-desc") return (b.name || "").localeCompare(a.name || "");
    if (sort === "price-low") return (a.price || 0) - (b.price || 0);
    if (sort === "price-high") return (b.price || 0) - (a.price || 0);
    return 0;
  });

  const getStaticImage = imageUrl => {
    if (typeof imageUrl === "string" && imageUrl.startsWith("data:image")) return imageUrl;
    if (imageUrl?.includes("coffee")) return coffee;
    if (imageUrl?.includes("laptop")) return laptop;
    if (imageUrl?.includes("shoes")) return shoes;
    if (imageUrl?.includes("headphones")) return headphones;
    if (imageUrl?.includes("tshirt")) return tshirt;
    if (imageUrl?.includes("watch")) return watch;
    return imageUrl;
  };

  //  Add to Cart Click Function (with login check)
  const handleAddToCart = (product) => {
    const user = auth.currentUser; // check user login or not

    if (!user) {
      const confirmLogin = window.confirm("Please login or sign up to add products to your cart!");
      if (confirmLogin) {
        navigate("/login"); //  redirect to login page
      }
      return;
    }

    alert(`You selected: ${product.name}`);
    setTimeout(() => {
      alert("Added to Cart!");
    }, 600);
  };

  return (
    <div>
      <MyNavbar />
      <div style={{ backgroundColor: "#f7f9fa", minHeight: "100vh", paddingTop: 80 }}>
        <Container className="py-4">
          <Row className="mb-3">
            <Col>
              <h2 className="fw-bold">All Products</h2>
              <p className="text-muted mb-0">Browse our complete collection of products</p>
            </Col>
          </Row>

          <Row className="g-3 align-items-center p-3 bg-white rounded shadow-sm mb-4">
            <Col xs={12} md={3}>
              <Form.Group>
                <Form.Label className="fw-semibold">Search Products</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Search products..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col xs={12} md={3}>
              <Form.Group>
                <Form.Label className="fw-semibold">Category</Form.Label>
                <Form.Select value={category} onChange={e => setCategory(e.target.value)}>
                  <option value="all">All Categories</option>
                  <option value="electronics">Electronics</option>
                  <option value="fashion">Fashion</option>
                  <option value="home">Home</option>
                  <option value="grossary">Grossary</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col xs={12} md={3}>
              <Form.Group>
                <Form.Label className="fw-semibold">Price Range</Form.Label>
                <Form.Select value={price} onChange={e => setPrice(e.target.value)}>
                  <option value="all">All Prices</option>
                  <option value="0-50">₨ 0 - ₨ 50</option>
                  <option value="50-100">₨ 50 - ₨ 100</option>
                  <option value="100+">₨ 100+</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col xs={12} md={3}>
              <Form.Group>
                <Form.Label className="fw-semibold">Sort By</Form.Label>
                <Form.Select value={sort} onChange={e => setSort(e.target.value)}>
                  <option value="name">Name (A–Z)</option>
                  <option value="name-desc">Name (Z–A)</option>
                  <option value="price-low">Price (Low–High)</option>
                  <option value="price-high">Price (High–Low)</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-2">
            <Col>
              <p className="fw-semibold mb-1 text-secondary">
                Showing {sortedProducts.length} of {allProducts.length} products
              </p>
            </Col>
          </Row>

          <Row className="g-4">
            {sortedProducts.map(p => (
              <Col key={p.id} xs={12} sm={6} md={4} lg={3}>
                <Card className="shadow-sm h-100 product-card">
                  <div className="image-wrapper">
                    <Card.Img
                      variant="top"
                      src={getStaticImage(p.image)}
                      className="zoom-img"
                      style={{ height: 200, objectFit: "cover" }}
                    />
                  </div>
                  <Card.Body>
                    <div className="d-flex align-items-center flex-wrap mb-2">
                      <Badge bg="secondary" className="me-2">
                        {p.category || "N/A"}
                      </Badge>
                      <h5 className="mb-0 fw-bold truncate-1-lines" style={{ fontSize: "1.1rem" }}>
                        {p.name || "Untitled Product"}
                      </h5>
                    </div>
                    <Card.Text className="truncate-2-lines" style={{ fontSize: "0.9rem", color: "#6c757d" }}>
                      {p.desc || "No description available."}
                    </Card.Text>
                    <div className="d-flex justify-content-between align-items-center mb-3 mt-3">
                      <h4 className="text-primary mb-0">Rs. {Number(p.price).toFixed(2)}</h4>
                      <div className="text-warning">
                        ★★★★★<span className="text-muted">(4.5)</span>
                      </div>
                    </div>
                    <div className="d-flex gap-2">
                      <Button
                        as={Link}
                        to={`/product/${p.id}`}
                        variant="outline-primary"
                        size="sm"
                        className="flex-fill fw-semibold"
                      >
                        View Details
                      </Button>

                      {/*  Add to Cart button with login check */}
                      <Button
                        variant="dark"
                        size="sm"
                        className="flex-fill fw-semibold"
                        onClick={() => handleAddToCart(p)}
                      >
                        <i className="bi bi-cart me-1"></i> Add to Cart
                      </Button>
                    </div>
                    <p className="text-center mt-2 mb-0 text-muted" style={{ fontSize: "0.8rem" }}>
                      {p.stock !== undefined ? `${p.stock} in stock` : "Stock info unavailable"}
                    </p>
                  </Card.Body>
                </Card>
              </Col>
            ))}

            {sortedProducts.length === 0 && allProducts.length > 0 && (
              <Col xs={12} className="text-center py-5">
                <p className="lead text-muted">
                  No products match your current filters. Try adjusting your search or categories.
                </p>
              </Col>
            )}

            {allProducts.length === 0 && (
              <Col xs={12} className="text-center py-5">
                <p className="lead text-muted">
                  Loading products or no products available in the database.
                </p>
              </Col>
            )}
          </Row>
        </Container>
      </div>
      <Footer />
    </div>
  );
}

export default Product;
