import "./cart.css";

export default function Cart({ cart, onRemove, onUpdate }) {
  if (cart.length === 0) {
    return <p className="empty-cart">Empty cart</p>;
  }

  const totalItems = cart.reduce((sum, i) => sum + i.qty, 0);
  const totalPrice = cart.reduce((sum, i) => sum + i.qty * i.price, 0);

  return (
    <div className="cart">
      <h2>Cart</h2>

      <div className="cart-items">
        {cart.map(item => (
          <div key={item.id} className="cart-item">
            <span className="cart-title">{item.title}</span>

            <input
              type="number"
              min="1"
              max={item.stock}
              value={item.qty}
              onChange={(e) =>
                onUpdate(item.id, Number(e.target.value))
              }
            />

            <button
              className="remove-btn"
              onClick={() => onRemove(item.id)}
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <div className="cart-summary">
        <p><strong>Total Items:</strong> {totalItems}</p>
        <p><strong>Total Price:</strong> ₹ {totalPrice.toFixed(2)}</p>
      </div>
    </div>
  );
}