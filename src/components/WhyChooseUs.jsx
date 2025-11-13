import React from "react";

function WhyChooseUs() {
  return (
    <>
      <div
        className="text-center my-5 px-3"
        style={{ fontFamily: "Inter, sans-serif", paddingTop: "100px" }}
      >
        <h2>Why Choose Us?</h2>
        <p style={{ fontSize: "20px", color: "#555" }}>
          We provide the best shopping experience with top-quality products and
          exceptional service.
        </p>
      </div>

      <div className="container my-5">
        <div className="row g-4">
          <div className="col-md-4">
            <div className="p-4 border rounded shadow text-center">
              <div
                className="d-inline-flex align-items-center justify-content-center rounded-circle bg-primary text-white mb-3"
                style={{
                  width: "70px",
                  height: "70px",
                  // borderRadius: "10px",
                  // color: "blue",
                  // backgroundColor: "#dbebff",
                }}
              >
                <i className="bi bi-truck fs-3"></i>
              </div>
              <h4>Fast Delivery</h4>
              <p>Free shipping on orders over $50. Express delivery available.</p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="p-4 border rounded shadow text-center">
              <div
                className="d-inline-flex align-items-center justify-content-center rounded-circle bg-primary text-white mb-3"
                style={{ width: "70px", height: "70px" }}
              >
                <i className="bi bi-shield fs-3"></i>
              </div>
              <h4>Secure Shopping</h4>
              <p>Your data is protected with industry-standard encryption.</p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="p-4 border rounded shadow text-center">
              <div
                className="d-inline-flex align-items-center justify-content-center rounded-circle bg-primary text-white mb-3"
                style={{ width: "70px", height: "70px" }}
              >
                <i className="bi bi-credit-card fs-3"></i>
              </div>
              <h4>Money-Back Guarantee</h4>
              <p>
                30-day money-back guarantee on all <br /> purchases.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default WhyChooseUs;
