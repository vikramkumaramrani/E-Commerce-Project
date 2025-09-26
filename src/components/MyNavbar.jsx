import React from "react";
import {
  Navbar,
  Container,
  Nav,
  Form,
  Button,
} from "react-bootstrap";
import { Link, useLocation } from "react-router-dom"; 
import "../Styles/navbar.css";

function MyNavbar() {   
  const location = useLocation();

  return (
    <Navbar
      expand="lg"
      className="shadow-sm px-5"
      style={{ padding: "20px" }}
      id="navbar"
    >
      <Container fluid>
        {/* Left: Logo + Brand */}
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center px-3">
          <i className="bi bi-box-seam fs-4 text-primary me-2"></i>
          <span className="fw-bold text-primary">E-Commerce</span>
        </Navbar.Brand>

        {/* Responsive for mobile */}
        <Navbar.Toggle aria-controls="navbar-nav" />

        <Navbar.Collapse id="navbar-nav">
          {/* Center: Search */}
          <Form
            className="d-flex mx-lg-auto my-2 my-lg-0 w-lg-50"
            id="search-form"
            style={{ width: "600px" }}
          >
            <Form.Control
              type="search"
              placeholder="Search products..."
              className="me-2 rounded-2"
            />
          </Form>

          {/* Right: Links */}
          <Nav className="ms-lg-auto mt-2 mt-lg-0 d-flex align-items-center">
            <Nav.Link
              as={Link}
              to="/product"
              className={location.pathname === "/product" ? "active me-3 fw-semibold" : "me-3 fw-semibold"}
              id="product"
            >
              Products
            </Nav.Link>

            <Nav.Link
              as={Link}
              to="/login"
              className={location.pathname === "/login" ? "active me-3 fw-semibold" : "me-3 fw-semibold"}
              id="product"
            >
              Login
            </Nav.Link>

              <Nav.Link
              as={Link}
              to="/signup"
              className={location.pathname === "/signup" ? "active me-3 fw-semibold" : "me-3 fw-semibold"}
              id="product"
            >
              Signup
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MyNavbar;
