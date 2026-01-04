import "./modal.css";

export default function ProductModal({ product, onClose, onAdd }) {
  if (!product) return null;

  return (
    <div className="overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <h2>{product.title}</h2>
        <img src={product.image} width="120" />
        <p>{product.description}</p>
        <p>₹ {product.price}</p>
        <p>{product.stock > 0 ? "In Stock" : "Out of Stock"}</p>

        <button
          disabled={product.stock === 0}
          onClick={() => onAdd(product)}
        >
          Add to Cart
        </button>

        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}