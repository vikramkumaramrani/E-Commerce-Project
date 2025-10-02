import React from "react";

function ProductTable({ products, onEdit, onDelete }) {
  return (
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
        {products.map(p => (
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
              <button className="btn btn-sm btn-outline-primary me-2" onClick={() => onEdit(p)}>
                Edit
              </button>
              <button className="btn btn-sm btn-outline-danger" onClick={() => onDelete(p.id)}>
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
export default ProductTable;
