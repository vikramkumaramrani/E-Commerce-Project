import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Card, Button, Badge } from "react-bootstrap";
// Duplicate import removed, kept a single line for Link and useLocation
import { Link, useLocation } from "react-router-dom"; 
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../Firebase/firebase";
import MyNavbar from "../components/MyNavbar";
import Footer from "../components/Footer";
import "./product.css";
// Static images are kept as fallback/placeholders, but the Firebase image URL is preferred.
import coffee from "../assets/images/coffee.jpg"; 
import laptop from "../assets/images/laptop.jpg";
import shoes from "../assets/images/shoes.jpg";
import headphones from "../assets/images/headphone.jpg";
import tshirt from "../assets/images/tshirt.jpg";
import watch from "../assets/images/watch.jpg";

function Product() {
  const location = useLocation();

  // ❌ Removed the hardcoded 'allProducts' array as it conflicts with the state.
  // The logic now relies only on the data fetched from Firebase.

  const [allProducts, setAllProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [price, setPrice] = useState("all");
  const [sort, setSort] = useState("name");

  // ✅ useEffect to fetch products from Firestore using a real-time listener (onSnapshot)
  useEffect(() => {
    // Check if db object is available before attempting connection
    if (!db) {
        console.error("Firebase db is not initialized.");
        return;
    }

    const unsub = onSnapshot(collection(db, "products"), (snapshot) => {
      const list = snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          // Ensure price is a number for sorting, default to 0 if missing/invalid
          price: Number(data.price) || 0, 
        };
      });
      setAllProducts(list);
    }, (error) => {
        console.error("Error fetching Firestore products:", error);
    });
    
    // Cleanup function to unsubscribe from the listener
    return () => unsub();
  }, []);

  // ✅ useEffect to read category from URL search parameters
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const cat = params.get("category");
    // Ensure category is not null/empty and is a valid category (using lowercase for comparison)
    if (cat) {
        // You can refine this list based on your actual categories in Firestore
        setCategory(cat.toLowerCase()); 
    }
  }, [location.search]);


  // 🔹 Filtering Logic
  let filteredProducts = allProducts;

  // Filter by Search
  if (search) {
    filteredProducts = filteredProducts.filter((p) =>
      p.name?.toLowerCase().includes(search.toLowerCase()) || 
      p.description?.toLowerCase().includes(search.toLowerCase()) ||
      p.category?.toLowerCase().includes(search.toLowerCase())
    );
  }

  // Filter by Category
  if (category !== "all") {
    filteredProducts = filteredProducts.filter(
      (p) => p.category?.toLowerCase() === category
    );
  }

  // Filter by Price Range
  if (price !== "all") {
    filteredProducts = filteredProducts.filter((p) => {
      const pPrice = p.price || 0; // Use 0 if price is missing/invalid
      if (price === "0-50") return pPrice <= 50;
      if (price === "50-100") return pPrice > 50 && pPrice <= 100;
      if (price === "100+") return pPrice > 100;
      return true;
    });
  }

  // 🔹 Sorting Logic
  const sortedProducts = [...filteredProducts].sort((a, b) => { // Use a copy of the array for sorting
    if (sort === "name") {
      return (a.name || "").localeCompare(b.name || "");
    } else if (sort === "name-desc") {
      return (b.name || "").localeCompare(a.name || "");
    } else if (sort === "price-low") {
      return (a.price || 0) - (b.price || 0);
    } else if (sort === "price-high") {
      return (b.price || 0) - (a.price || 0);
    }
    return 0;
  });

  // Function to get static image based on product image URL
  const getStaticImage = (imageUrl) => {
    if (typeof imageUrl === 'string' && imageUrl.startsWith('data:image')) {
        return imageUrl; // Keep base64 images
    }
    // Simple way to map common image names if Firebase provides them
    if (imageUrl?.includes('coffee')) return coffee;
    if (imageUrl?.includes('laptop')) return laptop;
    if (imageUrl?.includes('shoes')) return shoes;
    if (imageUrl?.includes('headphones')) return headphones;
    if (imageUrl?.includes('tshirt')) return tshirt;
    if (imageUrl?.includes('watch')) return watch;

    return imageUrl; // Fallback to the image URL from Firestore (if it's a valid remote URL)
  };


  return (
    <div>
      <MyNavbar />

      <div style={{ backgroundColor: "#f7f9fa", minHeight: "100vh", paddingTop: '80px' }}> {/* Added paddingTop to account for MyNavbar */}
        <Container className="py-4">
          <Row className="mb-3">
            <Col>
              <h2 className="fw-bold">All Products</h2>
              <p className="text-muted mb-0">
                Browse our complete collection of products
              </p>
            </Col>
          </Row>

          {/* 🔹 Filter and Sort Controls */}
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
                  {/* You might want to dynamically load other categories from Firestore data */}
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

          {/* 🔹 Product Count */}
          <Row className="mb-2">
            <Col>
              <p className="fw-semibold mb-1 text-secondary">
                Showing {sortedProducts.length} of {allProducts.length} products
              </p>
            </Col>
          </Row>

          {/* 🔹 Product Grid */}
          <Row className="g-4">
            {sortedProducts.map((p) => (
              <Col key={p.id} xs={12} sm={6} md={4} lg={3}>
                <Card className="shadow-sm h-100 product-card">
                  <div className="image-wrapper">
                    <Card.Img
                      variant="top"
                      // Use the image URL from Firestore data, falling back to static imports if needed
                      src={getStaticImage(p.image)} 
                      className="zoom-img"
                      style={{ height: "200px", objectFit: "cover" }}
                    />
                  </div>
                  <Card.Body>
                    <div className="d-flex align-items-center mb-2">
                      <Badge bg="secondary" className="me-2">
                        {p.category || 'N/A'}
                      </Badge>
                      <h5 className="mb-0 fw-bold" style={{ fontSize: '1.1rem'}}>{p.name || 'Untitled Product'}</h5>
                    </div>

                    <Card.Text style={{ fontSize: '0.9rem', color: '#6c757d' }}>
                      {p.description || "No description available."}
                    </Card.Text>

                    <div className="d-flex justify-content-between align-items-center mb-3 mt-3">
                      <h4 className="text-primary mb-0">${Number(p.price).toFixed(2)}</h4>
                      <div className="text-warning">
                        {/* Static rating for demonstration */}
                        ★<span className="text-muted">(N/A)</span>
                      </div>
                    </div>
                    <div className="d-flex gap-2">
                      <Button
                        as={Link}
                        to={`/product/${p.id}`} // Navigate using Firestore doc id
                        variant="outline-primary"
                        size="sm"
                        className="flex-fill fw-semibold"
                      >
                        View Details
                      </Button>

                      <Button variant="dark" size="sm" className="flex-fill fw-semibold">
                        <i className="bi bi-cart me-1"></i> Add to Cart
                      </Button>
                    </div>
                    <p className="text-center mt-2 mb-0 text-muted" style={{ fontSize: '0.8rem'}}>
                      {p.stock !== undefined ? `${p.stock} in stock` : 'Stock info unavailable'}
                    </p>
                  </Card.Body>
                </Card>
              </Col>
            ))}

            {/* Handle no products found */}
            {sortedProducts.length === 0 && allProducts.length > 0 && (
                <Col xs={12} className="text-center py-5">
                    <p className="lead text-muted">No products match your current filters. Try adjusting your search or categories.</p>
                </Col>
            )}
            {allProducts.length === 0 && (
                 <Col xs={12} className="text-center py-5">
                    <p className="lead text-muted">Loading products or no products available in the database.</p>
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