import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import MyNavbar from "../components/MyNavbar";
import Footer from "../components/Footer";
import { auth } from "../Firebase/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      if (email === "admin@ecommerce.com" && password === "admin123") {
        navigate("/dashboard");
      } else {
        setError("Only admin can login here");
      }
    } catch {
      setError("Failed to log in. Please check your credentials.");
    }
  };

  return (
    <>
      <MyNavbar />
      <Container className="d-flex justify-content-center align-items-center" style={{ paddingTop: "120px" }}>
        <Row className="w-100">
          <Col md={{ span: 5, offset: 3 }}>
            <Card className="p-4 rounded-4">
              <p className="text-center" style={{ fontSize: "25px", fontWeight: "400" }}>
                Sign in to your account
              </p>
              <p className="text-center" style={{ color: "#a3a2a2ff" }}>
                Enter your email and password to access your account
              </p>
              <Form onSubmit={handleLogin}>
                <Form.Group className="mb-3">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </Form.Group>
                {error && <p className="text-danger text-center">{error}</p>}
                <Button variant="primary" type="submit" className="w-100">
                  Login
                </Button>
                <Row className="align-items-center my-3">
                  <Col><hr /></Col>
                  <Col xs="auto" className="text-muted">Don't have an account?</Col>
                  <Col><hr /></Col>
                </Row>
                <NavLink
                  to="/signup"
                  className="w-100 d-block text-center"
                  style={{
                    border: "1px solid #c7c7c7ff",
                    backgroundColor: "white",
                    color: "#000000ff",
                    padding: "8px",
                    borderRadius: "5px",
                    textDecoration: "none"
                  }}
                >
                  Create new account
                </NavLink>
                <p
                  className="mt-2"
                  style={{
                    color: "#0022aaff",
                    backgroundColor: "#e1e8fcff",
                    borderRadius: "5px",
                    padding: "7px"
                  }}
                >
                  <b>Demo Credentials:</b><br />
                  Admin: admin@ecommerce.com / admin123
                </p>
              </Form>
            </Card>
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
}

export default Login;
