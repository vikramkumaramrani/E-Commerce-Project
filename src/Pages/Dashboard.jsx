import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { auth } from "../Firebase/firebase";
import MyNavbar from "../components/MyNavbar";
import Footer from "../components/Footer";
import "./product.css";

import { FiTrendingUp } from "react-icons/fi"; 
import { 
  FiBox, 
  FiShoppingCart, 
  FiDollarSign, 
  FiUsers, 
  FiAlertCircle, 
  FiPlus, 
  FiSettings 
} from "react-icons/fi";


function Dashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    const user = auth.currentUser;
    if (!user || user.email !== "admin@ecommerce.com") {
      alert("Access denied! Only admin can view this page.");
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div>
      <MyNavbar />
      <Container className="py-5 text-center">
        <h2 className="mb-2">Admin Dashboard</h2>
        <p className="mb-4">Manage your e-commerce store</p>

    

 <Row className="mb-4 g-2 justify-content-center text-center">
        <Col xs={12} md={3}>
          <Button variant="dark" className="w-100">
            <FiBox className="me-2" />
            Manage Products
          </Button>
        </Col>
        <Col xs={12} md={3}>
          <Button variant="outline-dark" className="w-100">
            <FiShoppingCart className="me-2" />
            Manage Orders
          </Button>
        </Col>
        <Col xs={12} md={3}>
          <Button variant="outline-dark" className="w-100">
            <FiPlus className="me-2" />
            Add Product
          </Button>
        </Col>
        <Col xs={12} md={3}>
          <Button variant="outline-dark" className="w-100">
            <FiSettings className="me-2" />
            Settings
          </Button>
        </Col>
      </Row>

      {/*  Stats Cards */}
      <Row className="g-3">
        <Col xs={12} md={3}>
          <Card className="p-3 shadow-sm">
            <Card.Body className="text-center">
              <h5>Total Products</h5>
              <h2>6</h2>
              <p className="text-muted">0 low stock</p>
              <FiBox size={20} />
            </Card.Body>
          </Card>
        </Col>

        <Col xs={12} md={3}>
          <Card className="p-3 shadow-sm h-100">
            <Card.Body className="text-center">
              <h5>Total Orders</h5>
              <h2>0</h2>
              <p className="text-muted">0 pending</p>
              <FiShoppingCart size={20} />
            </Card.Body>
          </Card>
        </Col>

        <Col xs={12} md={3}>
          <Card className="p-3 shadow-sm h-100">
            <Card.Body className="text-center">
              <h5>Total Revenue</h5>
              <h2>$0.00</h2>
              <p className="text-muted">All time revenue</p>
              <FiDollarSign size={20} />
            </Card.Body>
          </Card>
        </Col>

        <Col xs={12} md={3}>
          <Card className="p-3 shadow-sm h-100">
            <Card.Body className="text-center">
              <h5>Active Users</h5>
              <h2>1</h2>
              <p className="text-muted">Registered users</p>
              <FiUsers size={20} />
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Bottom Section */}
      <Row className="mt-4 g-3">
        <Col xs={12} md={6}>
          <Card className="p-3 shadow-sm h-100">
            <Card.Body>
              <h5>
                <FiShoppingCart className="me-2" />
                Recent Orders
              </h5>
              <p className="text-muted mt-3">No orders yet</p>
            </Card.Body>
          </Card>
        </Col>

        <Col xs={12} md={6}>
          <Card className="p-3 shadow-sm h-100">
            <Card.Body>
              <h5>
                <FiAlertCircle className="me-2 text-warning" />
                Low Stock Alert
              </h5>
              <p className="text-muted mt-3">All products are well stocked</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
        
          <Card className="shadow-sm rounded-3 p-3 my-4">
      <Card.Body>
        {/* Header */}
        <div className="d-flex align-items-center mb-4">
          <FiTrendingUp className="me-2" />
          <h6 className="mb-0">Quick Insights</h6>
        </div>

        {/* Stats Row */}
        <Row className="text-center">
          <Col xs={12} md={4} className="mb-3 mb-md-0">
            <h5 className="text-primary">$0.00</h5>
            <small className="text-muted">Average Order Value</small>
          </Col>

          <Col xs={12} md={4} className="mb-3 mb-md-0">
            <h5 className="text-success">0%</h5>
            <small className="text-muted">Order Fulfillment Rate</small>
          </Col>

          <Col xs={12} md={4}>
            <h5 style={{ color: "purple" }}>320</h5>
            <small className="text-muted">Total Inventory</small>
          </Col>
        </Row>
      </Card.Body>
    </Card>
      </Container>
      <Footer />
    </div>
  );
}

export default Dashboard;
