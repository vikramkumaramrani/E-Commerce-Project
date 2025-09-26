import React from "react";

function Category() {
  return (
    <>
      <div
        className="text-center my-5 px-3"
        style={{ fontFamily: "Inter, sans-serif", paddingTop: "100px" }}
      >
        <h2>Shop by Category</h2>
        <p style={{ fontSize: "20px", color: "#555" }}>
          Find exactly what you're looking for
        </p>
      </div>

      <div className="container my-5">
        <div className="row g-4">
          {/* Card 1 */}
          <div className="col-md-4 col-sm-6">
            <div className="card text-center shadow-sm p-3">
              <div className="card-body">
                <h5 className="card-title fw-bold">Electronics</h5>
                <p className="text-muted">2 products</p>
              </div>
            </div>
          </div>


          {/* Card 2 */}
          <div className="col-md-4 col-sm-6">
            <div className="card text-center shadow-sm p-3">
              <div className="card-body">
                <h5 className="card-title fw-bold">Sports</h5>
                <p className="text-muted">2 products</p>
              </div>
            </div>
          </div>


          {/* Card 3 */}
          <div className="col-md-4 col-sm-6">
            <div className="card text-center shadow-sm p-3">
              <div className="card-body">
                <h5 className="card-title fw-bold">Home</h5>
                <p className="text-muted">2 products</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Category;
