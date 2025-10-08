import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { db } from "../Firebase/firebase";
import { doc, getDoc, collection, query, where, limit, getDocs } from "firebase/firestore";
import { Container, Row, Col, Button, Spinner, Badge, Card } from "react-bootstrap";
import { BsArrowLeft } from "react-icons/bs";
import MyNavbar from "./MyNavbar";
import Footer from "./Footer";

function ProductDetail() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const docRef = doc(db, "products", productId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const productData = { id: docSnap.id, ...docSnap.data() };
          setProduct(productData);
          fetchRelatedProducts(productData.category, productData.id);
        } else {
          setProduct(false);
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchRelatedProducts = async (category, currentId) => {
      try {
        const q = query(collection(db, "products"), where("category", "==", category), limit(5));
        const querySnapshot = await getDocs(q);
        const products = querySnapshot.docs
          .map((doc) => ({ id: doc.id, ...doc.data() }))
          .filter((p) => p.id !== currentId)
          .slice(0, 4);
        setRelatedProducts(products);
      } catch (error) {
        console.error("Error fetching related products:", error);
      }
    };

    fetchProduct();
  }, [productId]);

  if (loading)
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" variant="primary" />
        <p>Loading product...</p>
      </div>
    );

  if (product === false)
    return (
      <div className="text-center mt-5">
        <p>Product not found.</p>
        <Button variant="secondary" onClick={() => navigate(-1)}>
          <BsArrowLeft /> Go Back
        </Button>
      </div>
    );

  return (
    <>
      <MyNavbar />
      <Container className="py-5" style={{ minHeight: "100vh" }}>
        <div className="mb-3 d-flex justify-content-between align-items-center">
          <Button variant="light" onClick={() => navigate("/products")} className="border-0">
            <BsArrowLeft className="me-2" /> Back to Products
          </Button>
        </div>

        <Row className="align-items-center">
          <Col md={6} className="text-center">
            <div
              style={{
                width: "100%",
                maxWidth: "500px",
                height: "400px",
                margin: "0 auto",
                overflow: "hidden",
                borderRadius: "10px",
                background: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img
                src={product.image || "https://via.placeholder.com/500x500.png?text=Product+Image"}
                alt={product.name}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
          </Col>

          <Col md={6}>
            <Badge bg="light" text="dark" className="mb-2">
              {product.category || "Electronics"}
            </Badge>
            <h3 className="fw-bold">{product.name}</h3>
            <div className="d-flex align-items-center mb-2">
              <span className="text-warning me-2">
                {"★".repeat(Math.floor(product.rating || 4.5))}
                {"☆".repeat(5 - Math.floor(product.rating || 4.5))}
              </span>
              <span className="text-muted">
                ({product.rating || 4.5}) • {product.reviews || 123} reviews
              </span>
            </div>
            <hr />
            <h4 className="text-primary mb-3">${product.price || "99.99"}</h4>

            <h6 className="fw-semibold">Description</h6>
            <p className="text-muted">
              {product.desc ||
                "Premium quality wireless headphones with noise cancellation and 30-hour battery life."}
            </p>
            <hr />

            {product.stock > 0 ? (
              <Badge bg="success" className="mb-3">
                {product.stock} in stock
              </Badge>
            ) : (
              <Badge bg="danger" className="mb-3">
                Out of stock
              </Badge>
            )}

            <div className="d-flex align-items-center mb-3">
              <span className="me-2">Quantity</span>
              <Button
                variant="outline-secondary"
                size="sm"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >
                −
              </Button>
              <span className="mx-2 fw-bold">{quantity}</span>
              <Button
                variant="outline-secondary"
                size="sm"
                onClick={() =>
                  setQuantity(
                    product.stock ? Math.min(product.stock, quantity + 1) : quantity + 1
                  )
                }
              >
                +
              </Button>
            </div>

            <Button
              variant="dark"
              className="w-100 py-2"
              disabled={product.stock <= 0}
            >
              🛒 Add to Cart — ${Number(product.price * quantity).toFixed(2)}
            </Button>

            <div className="mt-4 d-flex justify-content-around text-muted small">
              <div>🚚 Free shipping over $50</div>
              <div>🛡 1 year warranty</div>
              <div>↩️ 30-day returns</div>
            </div>
          </Col>
        </Row>

        {relatedProducts.length > 0 && (
          <div className="mt-5">
            <h4 className="fw-bold mb-4">Related Products</h4>
            <Row>
              {relatedProducts.map((item) => (
                <Col md={3} sm={6} key={item.id} className="mb-4">
                  <Card className="h-100 shadow-sm border-0">
                    <div
                      style={{
                        height: "180px",
                        overflow: "hidden",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: "#f8f9fa",
                      }}
                    >
                      <Card.Img
                        variant="top"
                        src={
                          item.image ||
                          "https://via.placeholder.com/300x180.png?text=Product"
                        }
                        alt={item.name}
                        style={{ height: "100%", width: "100%", objectFit: "cover" }}
                      />
                    </div>
                    <Card.Body className="text-center d-flex flex-column">
                      <Card.Title className="fs-6">{item.name}</Card.Title>
                      <Card.Text className="text-primary fw-bold mb-3">
                        ${item.price}
                      </Card.Text>
                      <Button
                        as={Link}
                        to={`/product/${item.id}`}
                        variant="outline-dark"
                        size="sm"
                        className="mt-auto"
                      >
                        View Details
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
        )}
      </Container>
      <Footer />
    </>
  );
}

export default ProductDetail;
