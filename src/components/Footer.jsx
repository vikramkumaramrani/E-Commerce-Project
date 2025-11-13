import React from "react";
import { Container, Row, Col } from "react-bootstrap";

function Footer() {
  return (
    <footer
      className="text-dark pt-4 mt-5 shadow-sm"
      style={{ borderTop: "1px solid #dbd8d8ff" }}
    >
      <Container>
        <Row className="gy-4">
          <Col lg={3} md={6} sm={12}>
            <i className="bi bi-box-seam fs-4 text-primary me-2"> E-Commerce</i>
            <p>
              Your trusted online store for quality products and exceptional
              service.
            </p>
          </Col>

          <Col lg={3} md={6} sm={12}>
            <h5 className="fw-600">Quick Links</h5>
            <ul className="list-unstyled">
              <li>
                <a href="#home" className="text-decoration-none text-dark">
                  Home
                </a>
              </li>
              <li>
                <a href="#shop" className="text-decoration-none text-dark">
                  Shop
                </a>
              </li>
              <li>
                <a href="#about" className="text-decoration-none text-dark">
                  About
                </a>
              </li>
              <li>
                <a href="#contact" className="text-decoration-none text-dark">
                  Contact
                </a>
              </li>
            </ul>
          </Col>

          <Col lg={3} md={6} sm={12}>
            <h5 className="fw-600">Customer Service</h5>
            <ul className="list-unstyled">
              <li>
                <a href="#home" className="text-decoration-none text-dark">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#shop" className="text-decoration-none text-dark">
                  Shop
                </a>
              </li>
              <li>
                <a href="#about" className="text-decoration-none text-dark">
                  About
                </a>
              </li>
              <li>
                <a href="#contact" className="text-decoration-none text-dark">
                  Contact
                </a>
              </li>
            </ul>
          </Col>

          <Col lg={3} md={6} sm={12}>
            <h5 className="fw-600">Contact Info</h5>
            <p className="d-flex align-items-center">
              <i className="bi bi-geo-alt-fill text-primary me-2"></i>
              Commerce St, Business District Tharparkar
            </p>
            <p className="d-flex align-items-center">
              <i className="bi bi-telephone-fill text-primary me-2"></i>
              +92 349 0366631
            </p>
            <p className="d-flex align-items-center">
              <i className="bi bi-envelope-fill text-primary me-2"></i>
              amranisahb@gmail.com
            </p>
          </Col>
        </Row>

        <div
          className="d-flex flex-column flex-md-row justify-content-between align-items-center"
          style={{ borderTop: "1px solid #adacacff", padding: "10px" }}
        >
          <p className="mb-0">
            &copy; {new Date().getFullYear()} E-Commerce Store. All rights
            reserved.
          </p>
          <div className="d-flex gap-3 mt-2 mt-md-0">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
          </div>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
