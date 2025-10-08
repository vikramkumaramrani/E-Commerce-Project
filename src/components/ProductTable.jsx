import React, { useState } from "react";

function ProductTable({ products, onEdit, onDelete }) {
  const [showAll, setShowAll] = useState(false);

  // Show only first 3 products unless "View More" is clicked
  const visibleProducts = showAll ? products : products.slice(0, 3);

  return (
    <>
      <table className="table table-hover align-middle">
        <thead>
          <tr>
            <th>Product</th>
            <th>Category</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {visibleProducts.map((p) => (
            <tr key={p.id}>
              <td>
                <strong>{p.name}</strong>
                <br />
                <small className="text-muted">{p.description}</small>
              </td>
              <td>{p.category}</td>
              <td>${p.price}</td>
              <td>{p.stock}</td>
              <td>
                <button
                  className="btn btn-sm btn-outline-primary me-2"
                  onClick={() => onEdit(p)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-sm btn-outline-danger"
                  onClick={() => onDelete(p.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Show "View More" button only if products are more than 3 */}
      {products.length > 3 && (
        <div className="text-center mt-3">
          <button
            className="btn btn-outline-secondary"
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? "View Less" : "View More"}
          </button>
        </div>
      )}
    </>
  );
}

export default ProductTable;
