import React, { useState, useEffect } from "react";
import { FiBox, FiEdit2, FiTrash2, FiPlus, FiSearch } from "react-icons/fi";
import { Container, Row, Col, Table, Button, Form, InputGroup, Badge, Modal } from "react-bootstrap";
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { db } from "../Firebase/firebase";
import MyNavbar from "../components/MyNavbar";
import Footer from "../components/Footer";
import "bootstrap/dist/css/bootstrap.min.css";

const categories = ["All Categories", "Electronics", "Sports", "Home", "Glossary"];

const ProductManage = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Categories");
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    desc: "",
    image: "",
    category: "",
    stock: "",
    featured: false,
  });

  const fetchProducts = async () => {
    try {
      const snapshot = await getDocs(collection(db, "products"));
      const productList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        price: Number(doc.data().price),
        stock: Number(doc.data().stock),
      }));
      setProducts(productList);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async id => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await deleteDoc(doc(db, "products", id));
        setProducts(products.filter(p => p.id !== id));
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    }
  };

  const handleEdit = product => {
    setEditMode(true);
    setCurrentId(product.id);
    setNewProduct({
      name: product.name || "",
      price: product.price?.toString() || "",
      desc: product.desc || "",
      image: product.image || "",
      category: product.category || "",
      stock: product.stock?.toString() || "",
      featured: product.featured || false,
    });
    setShowModal(true);
  };

  const handleShowModal = () => {
    setEditMode(false);
    setCurrentId(null);
    setNewProduct({
      name: "",
      price: "",
      desc: "",
      image: "",
      category: "",
      stock: "",
      featured: false,
    });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditMode(false);
    setCurrentId(null);
    setNewProduct({ name: "", price: "", desc: "", image: "", category: "", stock: "", featured: false });
  };

  const handleInputChange = e => {
    const { name, value, type, checked } = e.target;
    setNewProduct(prev => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const handleSaveProduct = async e => {
    e.preventDefault();
    try {
      const productData = {
        ...newProduct,
        price: parseFloat(newProduct.price),
        stock: parseInt(newProduct.stock),
        inStock: parseInt(newProduct.stock) > 0,
      };

      if (editMode && currentId) {
        const productRef = doc(db, "products", currentId);
        await updateDoc(productRef, productData);
        setProducts(products.map(p => (p.id === currentId ? { id: currentId, ...productData } : p)));
      } else {
        const docRef = await addDoc(collection(db, "products"), { ...productData, createdAt: new Date() });
        setProducts([...products, { id: docRef.id, ...productData }]);
      }

      handleCloseModal();
    } catch (error) {
      console.error("Error saving product:", error);
    }
  };

  const filteredProducts = products.filter(
    p =>
      (category === "All Categories" || p.category === category) &&
      (p.name?.toLowerCase().includes(search.toLowerCase()) || p.desc?.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div style={{ background: "#f8f9fb", minHeight: "100vh", marginTop: 85, paddingTop: 20 }}>
      <MyNavbar />
      <Container fluid className="py-4">
        <Row className="justify-content-center">
          <Col xs={12} md={10} lg={9}>
            <h1 className="fw-bold mb-1" style={{ fontSize: 32 }}>Product Management</h1>
            <div className="text-secondary mb-4">Manage your product inventory</div>

            <Row className="g-2 align-items-center mb-4">
              <Col xs={12} md={6}>
                <InputGroup>
                  <InputGroup.Text><FiSearch /></InputGroup.Text>
                  <Form.Control type="text" placeholder="Search products..." value={search} onChange={e => setSearch(e.target.value)} />
                </InputGroup>
              </Col>
              <Col xs={12} md={4}>
                <Form.Select value={category} onChange={e => setCategory(e.target.value)}>
                  {categories.map(c => <option key={c} value={c}>{c}</option>)}
                </Form.Select>
              </Col>
              <Col xs={12} md={2} className="text-md-end mt-3 mt-md-0">
                <Button variant="dark" className="w-100 w-md-auto d-flex align-items-center justify-content-center" onClick={handleShowModal}>
                  <FiPlus className="me-2" /> Add Product
                </Button>
              </Col>
            </Row>

            <div className="bg-white rounded-4 shadow-sm p-0 overflow-auto">
              <div className="d-flex align-items-center gap-2 px-4 pt-4 fw-semibold" style={{ fontSize: 18 }}>
                <FiBox style={{ fontSize: 22 }} />
                Products <span className="text-secondary">({filteredProducts.length})</span>
              </div>
              <Table responsive hover className="align-middle mt-3 mb-0">
                <thead>
                  <tr className="text-secondary" style={{ fontWeight: 600, fontSize: 16 }}>
                    <th>Product</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Stock</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map(product => (
                    <tr key={product.id}>
                      <td>
                        <div className="d-flex align-items-center gap-2">
                          <img src={product.image || "https://via.placeholder.com/48"} alt={product.name} style={{ width: 48, height: 48, borderRadius: 8, objectFit: "cover", border: "1px solid #eee" }} />
                          <div>
                            <div className="fw-semibold" style={{ fontSize: 16 }}>{product.name}</div>
                            <div className="text-secondary" style={{ fontSize: 14 }}>{product.desc}</div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <Badge bg="light" text="dark" className="fw-semibold px-3 py-2 rounded-3" style={{ fontSize: 14 }}>
                          {product.category || "N/A"}
                        </Badge>
                      </td>
                      <td className="fw-semibold">${Number(product.price).toFixed(2)}</td>
                      <td className="fw-semibold">{product.stock}</td>
                      <td>
                        {product.featured && <Badge bg="dark" className="me-1">Featured</Badge>}
                        {product.inStock || product.stock > 0 ? <Badge bg="success">In Stock</Badge> : <Badge bg="danger">Out of Stock</Badge>}
                      </td>
                      <td>
                        <Button variant="light" className="me-2 p-2" onClick={() => handleEdit(product)}><FiEdit2 /></Button>
                        <Button variant="outline-danger" className="p-2" onClick={() => handleDelete(product.id)}><FiTrash2 /></Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              {filteredProducts.length === 0 && <div className="text-center text-muted py-4">No products found.</div>}
            </div>
          </Col>
        </Row>
      </Container>

      <Modal show={showModal} onHide={handleCloseModal} centered size="lg">
        <Modal.Body style={{ padding: 32 }}>
          <div className="d-flex justify-content-between align-items-start mb-2">
            <div>
              <h4 className="fw-bold mb-1">{editMode ? "Edit Product" : "Add New Product"}</h4>
              <div className="text-secondary mb-3" style={{ fontSize: 15 }}>
                {editMode ? "Update product details" : "Create a new product for your store"}
              </div>
            </div>
            <Button variant="link" onClick={handleCloseModal} style={{ fontSize: 22, color: "#222", textDecoration: "none", marginTop: -8, marginRight: -8 }}>&times;</Button>
          </div>
          <Form onSubmit={handleSaveProduct}>
            <Row className="g-3">
              <Col xs={12} md={6}><Form.Label className="fw-semibold">Product Name *</Form.Label><Form.Control name="name" value={newProduct.name} onChange={handleInputChange} required autoFocus /></Col>
              <Col xs={12} md={6}><Form.Label className="fw-semibold">Price *</Form.Label><Form.Control name="price" type="number" step="0.01" min="0" value={newProduct.price} onChange={handleInputChange} required /></Col>
              <Col xs={12}><Form.Label className="fw-semibold">Description *</Form.Label><Form.Control as="textarea" name="desc" value={newProduct.desc} onChange={handleInputChange} required rows={2} /></Col>
              <Col xs={12}><Form.Label className="fw-semibold">Image URL</Form.Label><Form.Control name="image" value={newProduct.image} onChange={handleInputChange} placeholder="https://example.com/image.jpg" /></Col>
              <Col xs={12} md={6}><Form.Label className="fw-semibold">Category *</Form.Label>
                <Form.Select name="category" value={newProduct.category} onChange={handleInputChange} required>
                  <option value="">Select category</option>
                  {categories.filter(c => c !== "All Categories").map(c => <option key={c} value={c}>{c}</option>)}
                </Form.Select>
              </Col>
              <Col xs={12} md={6}><Form.Label className="fw-semibold">Stock Quantity *</Form.Label><Form.Control name="stock" type="number" min="0" value={newProduct.stock} onChange={handleInputChange} required /></Col>
              <Col xs={12} className="d-flex align-items-center">
                <Form.Check type="checkbox" name="featured" checked={newProduct.featured} onChange={handleInputChange} className="me-2" id="featuredProduct" />
                <Form.Label htmlFor="featuredProduct" className="mb-0">Featured Product</Form.Label>
              </Col>
            </Row>
            <div className="d-flex gap-2 mt-4">
              <Button type="submit" variant="dark" className="flex-grow-1 py-2 fw-semibold">{editMode ? "Update Product" : "Add Product"}</Button>
              <Button variant="light" onClick={handleCloseModal} className="py-2 fw-semibold">Cancel</Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>

      <Footer />
    </div>
  );
};

export default ProductManage;
