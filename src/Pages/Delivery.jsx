import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import MyNavbar from "../components/MyNavbar";

// Firebase
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../Firebase/firebase";

const Delivery = () => {
  const [selectedCity, setSelectedCity] = useState("");
  const [areasList, setAreasList] = useState([]);

  // --- City-wise Areas ---
  const areas = {
    Karachi: ["Gulshan-e-Iqbal","Gulistan-e-Johar","North Karachi","Nazimabad","Saddar","DHA","Clifton","Korangi","Malir","Landhi"],
    Lahore: ["Johar Town","Gulberg","Model Town","DHA","Cantt","Bahria Town","Faisal Town","Allama Iqbal Town","Garden Town"],
    Islamabad: ["F-6","F-7","F-8","G-6","G-7","G-8","PWD","Bahria Town","Blue Area"],
    Multan: ["Cantt","Shah Rukn-e-Alam","Gulgasht","Bosan Road"],
    Rawalpindi: ["Saddar","Peshawar Road","Chaklala","Bahria Town"],
    Faisalabad: ["D Ground","Madina Town","Millat Town","Jaranwala Road"],
    Hyderabad: ["Qasimabad","Latifabad","Hirabad","City Area"]
  };

  const handleCityChange = (e) => {
    const city = e.target.value;
    setSelectedCity(city);
    setAreasList(areas[city] || []);
  };

  //  REALTIME CART ITEMS FROM FIRESTORE
  const [cartItems, setCartItems] = useState([]);

useEffect(() => {
  const unsub = onSnapshot(collection(db, "cartItems"), (snapshot) => {
    const items = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setCartItems(items);

    //  check items in console
    console.log("Cart Items from Firestore:", items);

    // Optional: make it accessible in browser console
    window.cartItems = items;
  });

  return unsub;
}, []);


  // TOTALS
  const itemsTotal = cartItems.reduce(
    (sum, item) => sum + (item.price || 0) * (item.qty || 1),
    0
  );
  const deliveryFee = 130;
  const grandTotal = itemsTotal + deliveryFee;

  return (
    <>
      <MyNavbar />
      <div className="container-fluid p-4" style={{ marginTop: "100px" }}>
        <div className="row">

          {/* Left Section - Delivery Form */}
          <div className="col-lg-8 col-md-7 col-sm-12">
            <h4 className="mb-3">Delivery Information</h4>

            <div className="row g-3">

              <div className="col-md-6">
                <label className="form-label">Full name</label>
                <input type="text" className="form-control" placeholder="Enter your first and last name" />
              </div>

              <div className="col-md-6">
                <label className="form-label">Province</label>
                <select className="form-select">
                  <option>Please choose your province</option>
                  <option>Azad Kashmir</option>
                  <option>Balochistan</option>
                  <option>FATA</option>
                  <option>Gilgit-Baltistan</option>
                  <option>Islamabad</option>
                  <option>Khyber Pakhtunkhwa</option>
                  <option>Punjab</option>
                  <option>Sindh</option>
                </select>
              </div>

              <div className="col-md-12">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Please enter your phone number"
                  maxLength={11}
                  onInput={(e) => {
                    e.target.value = e.target.value.replace(/\D/g, "");
                  }}
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">City</label>
                <select className="form-select" onChange={handleCityChange}>
                  <option>Please choose your city</option>
                  {Object.keys(areas).map((city, idx) => (
                    <option key={idx}>{city}</option>
                  ))}
                </select>
              </div>

              <div className="col-md-6">
                <label className="form-label">Area / Zone</label>
                <select className="form-select">
                  <option>Select Area</option>
                  {areasList.map((a, i) => (
                    <option key={i}>{a}</option>
                  ))}
                </select>
              </div>

              <div className="col-md-12">
                <label className="form-label">Address</label>
                <input type="text" className="form-control" placeholder="House# 123, Street 123, ABC Road" />
              </div>

              <div className="col-md-12 mt-2">
                <label>Select a label for effective delivery:</label>
                <div className="d-flex gap-3 mt-2">
                  <button className="btn btn-outline-primary">🏢 OFFICE</button>
                  <button className="btn btn-outline-danger">🏠 HOME</button>
                </div>
              </div>

              <div className="col-md-12 text-center mt-4">
                <button className="btn btn-info px-5 text-white fw-bold">SAVE</button>
              </div>

            </div>
          </div>

          {/* Right Section - Summary */}
          <div className="col-lg-4 col-md-5 col-sm-12 mt-sm-4 mt-4 mt-md-0">
            <div className="border p-3 rounded shadow-sm mb-3">
              <h5 className="mb-3">Promotion</h5>
              <div className="input-group">
                <input type="text" className="form-control" placeholder="Enter Code" />
                <button className="btn btn-primary">APPLY</button>
              </div>
            </div>

            <div className="border p-3 rounded shadow-sm">
              <h5>Order Summary</h5>

              <div className="d-flex justify-content-between">
                <span>Items Total ({cartItems?.length || 0} items)</span>
                <strong>Rs. {itemsTotal.toLocaleString()}</strong>
              </div>

              <div className="d-flex justify-content-between">
                <span>Delivery Fee</span>
                <strong>Rs. {deliveryFee.toLocaleString()}</strong>
              </div>

              <hr />

              <div className="d-flex justify-content-between fs-5 fw-bold text-danger">
                <span>Total:</span>
                <span>Rs. {grandTotal.toLocaleString()}</span>
              </div>

              <button className="btn btn-warning w-100 mt-3">Proceed to Pay</button>
            </div>
          </div>
        </div>

        {/* PRODUCTS SECTION */}
        <div className="mt-4 p-3 border rounded shadow-sm bg-white">
          <h5 className="mb-3">Package 1 of 1</h5>

          <div className="border rounded p-3 d-flex justify-content-between align-items-center">
            <div className="form-check">
              <input className="form-check-input" type="radio" checked readOnly />
              <label className="ms-2">Rs. 130 - Standard Delivery (18–20 Nov)</label>
            </div>
          </div>

          {/* CART PRODUCTS REALTIME */}
          {cartItems.length > 0 ? (
            cartItems.map((item, index) => (
              <div
                key={index}
                className="d-flex mt-3 align-items-center p-3 border rounded shadow-sm"
                style={{ background: "#fafafa" }}
              >
                <img
                  src={item.image || "/placeholder.png"}
                  width="80"
                  height="80"
                  className="rounded border me-3"
                  alt={item.title || "product"}
                  style={{ objectFit: "cover" }}
                />

                <div className="flex-grow-1">
                  <h6 className="fw-bold m-0">{item.title || "Product Name"}</h6>
                  <p className="text-muted m-0" style={{ fontSize: "14px" }}>
                    {item.brand || "Brand"}
                  </p>

                  <div className="mt-1">
                    <span className="fw-bold text-danger" style={{ fontSize: "18px" }}>
                      Rs. {(item.price * item.qty).toLocaleString()}
                    </span>

                    {item.oldPrice && (
                      <small className="text-muted text-decoration-line-through ms-2">
                        Rs. {item.oldPrice.toLocaleString()}
                      </small>
                    )}

                    {item.discount && (
                      <span className="text-success ms-2">-{item.discount}%</span>
                    )}
                  </div>
                </div>

                <div className="ms-auto fw-bold">Qty: {item.qty}</div>
              </div>
            ))
          ) : (
            <p className="text-center text-muted mt-3">Your cart is empty</p>
          )}
        </div>

      </div>
    </>
  );
};

export default Delivery;
F