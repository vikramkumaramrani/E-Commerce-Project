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

  const handleAddToCart = () => {
    // yahan future me cart logic add kar sakte ho
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

        {/* ✅ Product Detail Section */}
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

        {/* ✅ Related Products Section */}
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
    </>
  );
}

export default ProductDetail;
