import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../Firebase/firebase"; // ✅ adjust path if needed

function Category() {
  const [categoryCounts, setCategoryCounts] = useState({});
  const navigate = useNavigate();

  // Fetch product data from Firestore
  useEffect(() => {
    const fetchCategoryCounts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "products"));
        const counts = {};

        querySnapshot.forEach((doc) => {
          const data = doc.data();
          const category = data.category || "Uncategorized";
          counts[category] = (counts[category] || 0) + 1;
        });

        setCategoryCounts(counts);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategoryCounts();
  }, []);

  const handleCategoryClick = (category) => {
    let selectedCategory = category;
    if (category === "Sports") selectedCategory = "Fashion"; // ✅ keep your custom mapping

    navigate(`/products?category=${encodeURIComponent(selectedCategory)}`);
  };

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
          {Object.keys(categoryCounts).map((category, index) => (
            <div key={index} className="col-md-4 col-sm-6">
              <div
                className="card text-center shadow-sm p-3"
                style={{ cursor: "pointer" }}
                onClick={() => handleCategoryClick(category)}
              >
                <div className="card-body">
                  <h5 className="card-title fw-bold">{category}</h5>
                  <p className="text-muted">
                    {categoryCounts[category]}{" "}
                    {categoryCounts[category] === 1 ? "product" : "products"}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Category;
