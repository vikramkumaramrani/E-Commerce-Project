import React, { useState } from "react";   
import MyNavbar from "../components/MyNavbar";
import { Container, Row, Col, Card, Form } from "react-bootstrap";
import { BsCart } from "react-icons/bs";
import Footer from "../components/Footer";


function OrderManage() {
  const [Filter, SetFilter] = useState("All Orders");
  const [Orders, SetOrders] = useState([]);

  return (
    <div style={{ background: "#f8f9fb", minHeight: "100vh", paddingTop: 20}}>
      <MyNavbar />

      <div className="container mt-10">
        <h2>Order Management</h2>
        <p>Track and manage customer orders</p>

        <Card className="p-3 mb-4">
        <Row className="align-items-center">
          <Col md={4}>
            <Form.Label>Filter by status:</Form.Label>
            <Form.Select
              value={Filter}
              onChange={(e) => SetFilter(e.target.value)}
            >
              <option>All Orders</option>
              <option>Pending</option>
              <option>Processing</option>
              <option>Shipped</option>
              <option>Delivered</option>
              <option>Cancelled</option>
            </Form.Select>
          </Col>
          <Col md={4} className="text-center">
            <strong>Total Orders:</strong> {Orders.length}
          </Col>
          <Col md={4} className="text-center">
            <strong>Showing:</strong> {Orders.length}
          </Col>
        </Row>
      </Card>

     
      <Card className="p-4 text-center">
        {Orders.length === 0 ? (
          <>
           
            <h5>No orders found</h5>
            <p className="text-muted">
              Orders will appear here when customers place them
            </p>
          </>
        ) : (
          <div>
           
            
          </div>
        )}
      </Card>
      </div>
       <Footer />
    </div>
  );
}

export default OrderManage;

