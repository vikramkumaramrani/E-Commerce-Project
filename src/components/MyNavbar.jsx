import React from "react"; 
import { FiUser, FiSearch } from "react-icons/fi";
import {
  Navbar,
  Container,
  Nav,
  Form,
} from "react-bootstrap";
import { Link, useLocation } from "react-router-dom"; 
import "../Styles/navbar.css";

function MyNavbar() {   
  const location = useLocation();


  const hiddenRoutes = ["/dashboard", "/productManage", "/OrderManage", "/Product"];

  
  const hideAuthLinks = hiddenRoutes.some(route => location.pathname.startsWith(route));

  return (
    <Navbar
      expand="lg"
      className="shadow-sm px-5"
      style={{ padding: "20px" }}
      id="navbar"
    >
      <Container fluid>
        {/* Logo */}
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center px-3">
          <i className="bi bi-box-seam fs-4 text-primary me-2"></i>
          <span className="fw-bold text-primary">E-Commerce</span>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbar-nav" />

        <Navbar.Collapse id="navbar-nav">
          {/* Search Bar */}
          <Form
            className="d-flex mx-lg-auto my-2 my-lg-0 w-lg-50"
            id="search-form"
            style={{ width: "600px" }}
          >
            <div className="input-group w-100">
              <span 
                className="input-group-text bg-white" 
                style={{ borderTopRightRadius: 0, borderBottomRightRadius: 0, borderRight: 0 }}
              >
                <FiSearch />
              </span>
              <Form.Control
                type="search"
                placeholder="Search products..."
                style={{
                  borderTopLeftRadius: 0,
                  borderBottomLeftRadius: 0,
                  boxShadow: "none"
                }}
              />
            </div>
          </Form>

          {/* Right Side */}
          <Nav className="ms-lg-auto mt-2 mt-lg-0 d-flex align-items-center">
            <div className="d-flex align-items-center">
              <Nav.Link
                as={Link}
                to="/product"
                className={location.pathname === "/product" ? "active me-3 fw-semibold" : "me-3 fw-semibold"}
                id="product"
              >
                Products
              </Nav.Link>
              <FiUser className="ms-1" size={22} />
            </div>

            {/* Login / Signup hide karne ka logic */}
            {!hideAuthLinks && (
              <>
                <Nav.Link
                  as={Link}
                  to="/login"
                  className={location.pathname === "/login" ? "active me-3 fw-semibold" : "me-3 fw-semibold"}
                >
                  Login
                </Nav.Link>
                <Nav.Link
                  as={Link}
                  to="/signup"
                  className={location.pathname === "/signup" ? "active me-3 fw-semibold" : "me-3 fw-semibold"}
                >
                  Signup
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MyNavbar;
