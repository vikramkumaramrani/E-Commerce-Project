import React from "react";

function Hero() {
  return (
    <div
      className="container text-center py-5 d-flex flex-column justify-content-center align-items-center"
      style={{ marginTop: "200px", fontFamily: "Inter, sans-serif" }}
    >
      <h1 className="display-4">Welcome to Our Store</h1>
      <p className="lead text-muted">
        Discover amazing products at great prices. Fast shipping, secure
        checkout, and excellent customer service.
      </p>

      <div className="d-flex  align-items-center gap-3 mt-4">
        <a href="#" className="btn btn-primary btn-lg">
          Shop Now <i className="bi bi-arrow-right"></i>
        </a>
        <a href="#" className="btn btn-outline-secondary btn-lg">
          Browse Electronics
        </a>
      </div>
      
    </div>
  );
}

export default Hero;
