import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import MyNavbar from "../components/MyNavbar";
import Footer from "../components/Footer";
import { auth, db } from "../Firebase/firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

function Signup() {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }
    if (password !== confirm) {
      setError("Passwords do not match");
      return;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password, phone);
      const user = userCredential.user;
      await updateProfile(user, { displayName: fullName });

      
      await setDoc(doc(db, "users", user.uid), {
        fullName: fullName,
        email: user.email,
        phone: phone,
        createdAt: new Date(),
        active: true,
      });

      alert("Account created successfully!");
      navigate("/Home");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      <MyNavbar />
      <Container className="d-flex justify-content-center align-items-center" style={{ paddingTop: "120px" }}>
        <Row className="w-100">
          <Col md={{ span: 5, offset: 3 }}>
            <Card className="p-4 rounded-4">
              <p className="text-center" style={{ fontSize: "25px", fontWeight: "400" }}>Create an account</p>
              <p className="text-center" style={{ color: "#a3a2a2ff" }}>Sign up to start shopping with us</p>
              <Form onSubmit={handleSignup}>
                <Form.Group className="mb-3">
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your full name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />



                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control
                    type="tel"
                    placeholder="Enter your phone number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
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
                  {password.length > 0 && password.length < 8 && (
                    <Form.Text style={{ color: "red" }}>
                      Password must be at least 8 characters
                    </Form.Text>
                  )}
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Confirm Password"
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                    required
                  />
                  {confirm.length > 0 && confirm !== password && (
                    <Form.Text style={{ color: "red" }}>
                      Passwords do not match
                    </Form.Text>
                  )}
                </Form.Group>
                {error && <p className="text-danger text-center">{error}</p>}
                <Button variant="primary" type="submit" className="w-100">
                  Create Account
                </Button>
                <Row className="align-items-center my-3">
                  <Col><hr /></Col>
                  <Col xs="auto" className="text-muted">Already have an account?</Col>
                  <Col><hr /></Col>
                </Row>
                <NavLink
                  to="/login"
                  className="w-100 d-block text-center"
                  style={{
                    border: "1px solid #c7c7c7ff",
                    backgroundColor: "white",
                    color: "#000",
                    padding: "8px",
                    borderRadius: "5px",
                    textDecoration: "none",
                  }}
                >
                  Sign in instead
                </NavLink>
              </Form>
            </Card>
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
}

export default Signup;
