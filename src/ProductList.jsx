import ProductCard from "./ProductCard.jsx";

export default function ProductList({ products, onAddToCart, onBuy }) {
  if (!products.length) {
    return <div className="empty-state">No products found.</div>;
  }

  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={onAddToCart}
          onBuy={onBuy}
        />
      ))}
    </div>
  );
}
