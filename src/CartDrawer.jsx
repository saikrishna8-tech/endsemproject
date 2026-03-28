export default function CartDrawer({
  open,
  cart,
  subtotal,
  shipping,
  total,
  onClose,
  onIncrease,
  onDecrease,
  onRemove,
  onClear,
  onCheckout
}) {
  return (
    <>
      <div className={`overlay ${open ? "show" : ""}`} onClick={onClose} />
      <aside className={`drawer ${open ? "open" : ""}`}>
        <div className="drawer-head">
          <div>
            <p className="drawer-label">Shopping Cart</p>
            <h2>Your items</h2>
          </div>
          <button className="icon-btn" onClick={onClose}>✕</button>
        </div>

        <div className="drawer-body">
          {cart.length === 0 ? (
            <div className="empty-cart">
              <h3>Cart is empty</h3>
              <p>Items you add will show here separately, just like a marketplace drawer.</p>
            </div>
          ) : cart.map((item) => (
            <div className="cart-item" key={item.id}>
              <img src={item.image} alt={item.title} />
              <div className="cart-info">
                <h4>{item.title}</h4>
                <p>₹ {Number(item.price).toFixed(2)}</p>
                <div className="qty-row">
                  <button className="qty-btn" onClick={() => onDecrease(item.id)}>-</button>
                  <span>{item.quantity}</span>
                  <button className="qty-btn" onClick={() => onIncrease(item.id)}>+</button>
                  <button className="remove-btn" onClick={() => onRemove(item.id)}>Remove</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="drawer-footer">
          <div className="summary-line"><span>Subtotal</span><strong>₹ {subtotal.toFixed(2)}</strong></div>
          <div className="summary-line"><span>Shipping</span><strong>₹ {shipping.toFixed(2)}</strong></div>
          <div className="summary-line total"><span>Total</span><strong>₹ {total.toFixed(2)}</strong></div>
          <div className="footer-actions">
            <button className="secondary-btn" onClick={onClear} disabled={!cart.length}>Clear cart</button>
            <button className="primary-btn" onClick={onCheckout} disabled={!cart.length}>Checkout</button>
          </div>
        </div>
      </aside>
    </>
  );
}
