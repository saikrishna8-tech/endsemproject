export default function CheckoutDrawer({
  open,
  cart,
  total,
  deliveryPincode,
  setDeliveryPincode,
  paymentMethod,
  setPaymentMethod,
  onClose,
  onPlaceOrder
}) {
  return (
    <>
      <div className={`overlay ${open ? "show" : ""}`} onClick={onClose} />
      <aside className={`drawer checkout-drawer ${open ? "open" : ""}`}>
        <div className="drawer-head">
          <div>
            <p className="drawer-label">Checkout</p>
            <h2>Deliver & Pay</h2>
          </div>
          <button className="icon-btn" onClick={onClose}>✕</button>
        </div>

        <div className="drawer-body">
          <div className="checkout-card">
            <h3>Delivery address</h3>
            <input
              type="text"
              value={deliveryPincode}
              onChange={(e) => setDeliveryPincode(e.target.value)}
              placeholder="Pincode"
            />
          </div>

          <div className="checkout-card">
            <h3>Payment method</h3>
            <label className="radio">
              <input
                type="radio"
                checked={paymentMethod === "cod"}
                onChange={() => setPaymentMethod("cod")}
              />
              Cash on Delivery / Pay on Delivery
            </label>
            <label className="radio">
              <input
                type="radio"
                checked={paymentMethod === "upi"}
                onChange={() => setPaymentMethod("upi")}
              />
              UPI / Digital payment
            </label>
            <label className="radio">
              <input
                type="radio"
                checked={paymentMethod === "card"}
                onChange={() => setPaymentMethod("card")}
              />
              Credit / Debit card
            </label>
          </div>

          <div className="checkout-card">
            <h3>Order summary</h3>
            <div className="summary-line"><span>Items</span><strong>{cart.length}</strong></div>
            <div className="summary-line total"><span>Payable</span><strong>₹ {total.toFixed(2)}</strong></div>
            <p className="muted-note">
              Amazon’s help pages state that Pay on Delivery can be paid using cash or digital payment options on eligible orders, and COD is available for select items. citeturn932914search1turn932914search4turn932914search6
            </p>
          </div>
        </div>

        <div className="drawer-footer">
          <button className="primary-btn full" onClick={onPlaceOrder} disabled={!cart.length}>
            Place order
          </button>
        </div>
      </aside>
    </>
  );
}
