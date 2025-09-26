import React, { useState } from "react";
import { Container, Row, Col, Form, Card, Button, Badge } from "react-bootstrap";
import MyNavbar from "../components/MyNavbar";
import Footer from "../components/Footer";
import "./product.css";
import coffee from "./coffee.jpg";

function Product() {
  const allProducts = [
    { id: 1, name: "Coffee Maker", price: 129.99, stock: 45, category: "Home", Image: "{lamp.jpg}" },
    { id: 2, name: "Laptop", price: 899.99, stock: 10, category: "Electronics" },
    { id: 3, name: "Shoes", price: 59.99, stock: 30, category: "Fashion" },
    { id: 4, name: "Headphones", price: 199.99, stock: 20, category: "Electronics" },
    { id: 5, name: "T-Shirt", price: 25.0, stock: 60, category: "Fashion" },
    { id: 6, name: "Watch", price: 149.99, stock: 12, category: "Fashion" },
  ];

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [price, setPrice] = useState("all");
  const [sort, setSort] = useState("name");

  //  Filter + Sort Logic
  let filteredProducts = allProducts.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  if (category !== "all") {
    filteredProducts = filteredProducts.filter(
      (p) => p.category.toLowerCase() === category
    );
  }

  if (price !== "all") {
    filteredProducts = filteredProducts.filter((p) => {
      if (price === "0-50") return p.price <= 50;
      if (price === "50-100") return p.price > 50 && p.price <= 100;
      if (price === "100+") return p.price > 100;
      return true;
    });
  }

  if (sort === "name") {
    filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sort === "name-desc") {
    filteredProducts.sort((a, b) => b.name.localeCompare(a.name));
  } else if (sort === "price-low") {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sort === "price-high") {
    filteredProducts.sort((a, b) => b.price - a.price);
  }

  return (
    <>
      <MyNavbar />
      <div style={{ backgroundColor: "#f7f9fa", minHeight: "100vh" }}>
        <Container className="py-4">
          <Row className="mb-3">
            <Col>
              <h2 className="fw-bold">All Products</h2>
              <p className="text-muted mb-0">
                Browse our complete collection of products
              </p>
            </Col>
          </Row>

          {/* Filter Bar wapas */}
          <Row className="g-3 align-items-center p-3 bg-white rounded shadow-sm mb-4">
            <Col xs={12} md={3}>
              <Form.Group>
                <Form.Label className="fw-semibold">Search Products</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Search products..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </Form.Group>
            </Col>

            <Col xs={12} md={3}>
              <Form.Group>
                <Form.Label className="fw-semibold">Category</Form.Label>
                <Form.Select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="all">All Categories</option>
                  <option value="electronics">Electronics</option>
                  <option value="fashion">Fashion</option>
                  <option value="home">Home</option>
                </Form.Select>
              </Form.Group>
            </Col>

            <Col xs={12} md={3}>
              <Form.Group>
                <Form.Label className="fw-semibold">Price Range</Form.Label>
                <Form.Select
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                >
                  <option value="all">All Prices</option>
                  <option value="0-50">$0 - $50</option>
                  <option value="50-100">$50 - $100</option>
                  <option value="100+">$100+</option>
                </Form.Select>
              </Form.Group>
            </Col>

            <Col xs={12} md={3}>
              <Form.Group>
                <Form.Label className="fw-semibold">Sort By</Form.Label>
                <Form.Select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                >
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
                Showing {filteredProducts.length} of {allProducts.length} products
              </p>
            </Col>
          </Row>

          {/*  Product Grid */}
          <Row className="g-4">
            {filteredProducts.map((p) => (
              <Col key={p.id} xs={12} sm={6} md={4} lg={3}>
                <Card className="shadow-sm h-100 product-card">
                  <div className="image-wrapper">
                    <Card.Img
                      variant="top"
                      src={coffee} 
                      className="zoom-img"
                      style={{ height: "200px", objectFit: "cover" }}
                    />
                  </div>
                  <Card.Body>
                    <div className="d-flex align-items-center mb-2">
                      <Badge bg="secondary" className="me-2">{p.category}</Badge>
                      <h5 className="mb-0">{p.name}</h5>
                    </div>
                    <Card.Text>
                      Programmable coffee maker with built-in grinder and thermal carafe.
                    </Card.Text>
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <h4 className="text-primary mb-0">${p.price}</h4>
                      <div className="text-warning">
                        ★★★★☆ <span className="text-muted">(4.5)</span>
                      </div>
                    </div>
                    <div className="d-flex gap-2">
                      <Button variant="outline-primary" size="sm" className="flex-fill">
                        View Details
                      </Button>
                      <Button variant="dark" size="sm" className="flex-fill">
                        <i className="bi bi-cart"></i> Add to Cart
                      </Button>
                    </div>
                    <p className="text-center mt-2 mb-0 text-muted">
                      {p.stock} in stock
                    </p>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
         
        </Container>
      </div>
       <Footer />
    </>
  );
}

export default Product;
