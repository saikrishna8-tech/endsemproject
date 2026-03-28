export default function ProductCard({ product, onAddToCart, onBuy }) {
  return (
    <article className="product-card">
      <div className="img-shell">
        <img className="product-img" src={product.image} alt={product.title} />
      </div>

      <div className="card-body">
        <div className="badge">{product.category}</div>
        <h3>{product.title}</h3>
        <div className="rating-row">
          <span>★★★★☆</span>
          <span className="muted">1,200+ reviews</span>
        </div>
        <p className="price">₹ {Number(product.price).toFixed(2)}</p>
        <div className="card-actions">
          <button className="ghost-btn" onClick={() => onAddToCart(product)}>Add to cart</button>
          <button className="accent-btn" onClick={() => onBuy(product)}>Buy now</button>
        </div>
      </div>
    </article>
  );
}
