import React from "react";
import "./product.css";

function ProductCard({ product, onAddToCart, onView }) {
  const { title, price, category, stock, image } = product;

  return (
    <div className="card">
      <img src={image} alt={title} className="product-img" />

      <h4 className="product-title">{title}</h4>

      <p className="product-price">₹ {price}</p>

      <p className="product-category">{category}</p>

      <p className={`product-stock ${stock > 0 ? "in" : "out"}`}>
        {stock > 0 ? "In Stock" : "Out of Stock"}
      </p>

      <div className="product-actions">
        <button
          className="btn"
          disabled={stock === 0}
          onClick={() => onAddToCart(product)}
        >
          Add to Cart
        </button>

        <button
          className="btn secondary"
          onClick={() => onView(product)}
        >
          View
        </button>
      </div>
    </div>
  );
}

export default React.memo(ProductCard);