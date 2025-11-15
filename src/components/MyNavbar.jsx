import React, { useEffect, useState } from "react";
import { FiUser, FiSearch, FiShoppingCart } from "react-icons/fi";
import { Navbar, Container, Nav, Form, Button, Badge } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { auth } from "../Firebase/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../Firebase/firebase";
import "../Styles/navbar.css";

function MyNavbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [cartItems, setCartItems] = useState([]);

  const hiddenRoutes = ["/dashboard", "/productManage", "/OrderManage", "/Product"];
  const hideAuthLinks = hiddenRoutes.some((route) => location.pathname.startsWith(route));

  // 🔥 Firebase auth listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  // 🔥 Firebase cartItems realtime listener
  useEffect(() => {
    const unsub = onSnapshot(collection(db, "cartItems"), (snapshot) => {
      const items = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCartItems(items);
    });

    return unsub;
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  // 🔥 Total quantity of items in cart
  const totalQty = cartItems.reduce((sum, item) => sum + (item.qty || 1), 0);

  return (
    <Navbar expand="lg" className="shadow-sm px-5" style={{ padding: "20px" }} id="navbar">
      <Container fluid>
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center px-3">
          <i className="bi bi-box-seam fs-4 text-primary me-2"></i>
          <span className="fw-bold text-primary">E-Commerce</span>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbar-nav" />

        <Navbar.Collapse id="navbar-nav">
          <Form
            className="d-flex mx-lg-auto my-2 my-lg-0 w-lg-50"
            id="search-form"
            style={{ width: "600px" }}
          >
            <div className="input-group w-100">
              <span
                className="input-group-text bg-white"
                style={{
                  borderTopRightRadius: 0,
                  borderBottomRightRadius: 0,
                  borderRight: 0,
                }}
              >
                <FiSearch />
              </span>
              <Form.Control
                type="search"
                placeholder="Search products..."
                style={{
                  borderTopLeftRadius: 0,
                  borderBottomLeftRadius: 0,
                  boxShadow: "none",
                }}
              />
            </div>
          </Form>

          <Nav className="ms-lg-auto mt-2 mt-lg-0 d-flex align-items-center">
            <div className="d-flex align-items-center me-3">

              {/*  Cart Icon with total quantity badge — only if user is logged in */}
              {user && (
                <div className="position-relative me-3">
                  <Nav.Link as={Link} to="/cart">
                    <FiShoppingCart size={22} />
                    {totalQty > 0 && (
                      <Badge
                        bg="danger"
                        pill
                        className="position-absolute top-0 start-100 translate-middle"
                      >
                        {totalQty}
                      </Badge>
                    )}
                  </Nav.Link>
                </div>
              )}

              <Nav.Link
                as={Link}
                to="/product"
                className={
                  location.pathname === "/product"
                    ? "active me-3 fw-semibold"
                    : "me-3 fw-semibold"
                }
                id="product"
              >
                Products
              </Nav.Link>

              {location.pathname === "/dashboard" && <FiUser className="ms-1" size={22} />}
            </div>

            {/* Auth Links Hide on Admin Routes */}
            {!hideAuthLinks && (
              <>
                {user ? (
                  <Button
                    variant="outline-danger"
                    size="sm"
                    className="ms-3"
                    onClick={handleLogout}
                  >
                    Logout
                  </Button>
                ) : (
                  <>
                    <Nav.Link
                      as={Link}
                      to="/login"
                      className={
                        location.pathname === "/login"
                          ? "active me-3 fw-semibold"
                          : "me-3 fw-semibold"
                      }
                    >
                      Login
                    </Nav.Link>

                    <Nav.Link
                      as={Link}
                      to="/signup"
                      className={
                        location.pathname === "/signup"
                          ? "active me-3 fw-semibold"
                          : "me-3 fw-semibold"
                      }
                    >
                      Signup
                    </Nav.Link>
                  </>
                )}
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MyNavbar;
