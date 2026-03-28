import { useEffect, useMemo, useState } from "react";
import ProductList from "./ProductList.jsx";
import CartDrawer from "./CartDrawer.jsx";
import CheckoutDrawer from "./CheckoutDrawer.jsx";
import AddProduct from "./AddProduct.jsx";

const defaultCategories = [
  "All",
  "Mobiles",
  "Fashion",
  "Electronics",
  "Home",
  "Beauty",
  "Books",
  "Grocery"
];

export default function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [toast, setToast] = useState("");
  const [deliveryPincode, setDeliveryPincode] = useState("500001");
  const [paymentMethod, setPaymentMethod] = useState("cod");

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch(() => setProducts([]));
  }, []);

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(""), 1800);
    return () => clearTimeout(timer);
  }, [toast]);

  const categoryOptions = useMemo(() => {
    const apiCategories = [...new Set(products.map((p) => p.category))];
    return [...defaultCategories, ...apiCategories.filter((c) => !defaultCategories.includes(c))];
  }, [products]);

  const visibleProducts = useMemo(() => {
    const term = search.trim().toLowerCase();
    return products.filter((p) => {
      const matchesSearch =
        !term || `${p.title} ${p.category}`.toLowerCase().includes(term);
      const matchesCategory =
        category === "All" || p.category.toLowerCase().includes(category.toLowerCase());
      return matchesSearch && matchesCategory;
    });
  }, [products, search, category]);

  const subtotal = cart.reduce((sum, item) => sum + Number(item.price) * item.quantity, 0);
  const shipping = cart.length ? 39 : 0;
  const tax = subtotal * 0.05;
  const total = subtotal + shipping + tax;

  const addProduct = (product) => {
    setProducts((prev) => [product, ...prev]);
    setToast("Product added");
  };

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setShowCart(true);
    setToast("Added to cart");
  };

  const buyNow = (product) => {
    setCart([{ ...product, quantity: 1 }]);
    setPaymentMethod("cod");
    setShowCheckout(true);
    setToast("Ready to checkout");
  };

  const increaseQty = (id) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQty = (id) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeItem = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
    setToast("Item removed");
  };

  const clearCart = () => {
    setCart([]);
    setToast("Cart cleared");
  };

  const placeOrder = () => {
    setToast(paymentMethod === "cod" ? "Order placed with Cash on Delivery" : "Order placed");
    setCart([]);
    setShowCheckout(false);
    setShowCart(false);
  };

  return (
    <div className="page">
      <header className="topbar">
        <div className="brand-block">
          <div className="brand-logo">super</div>
          <div className="brand-copy">
            <span>Hello</span>
            <strong>Select your address</strong>
          </div>
        </div>

        <div className="search-wrap">
          <select
            className="search-select"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {categoryOptions.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          <input
            className="search-input"
            type="text"
            placeholder="Search products, brands and categories"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="search-btn" onClick={() => setToast("Search applied")}>
            Search
          </button>
        </div>

        <div className="nav-actions">
          <button className="mini-link" onClick={() => setShowAdd((s) => !s)}>
            Sell on Super
          </button>
          <button className="mini-link">Orders</button>
          <button className="cart-chip" onClick={() => setShowCart(true)}>
            Cart <span>{cart.reduce((n, i) => n + i.quantity, 0)}</span>
          </button>
        </div>
      </header>

      <nav className="subnav">
        <button className={category === "All" ? "subnav-pill active" : "subnav-pill"} onClick={() => setCategory("All")}>All</button>
        {categoryOptions.filter((c) => c !== "All").slice(0, 8).map((cat) => (
          <button
            key={cat}
            className={category === cat ? "subnav-pill active" : "subnav-pill"}
            onClick={() => setCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </nav>

      <section className="hero">
        <div className="hero-content">
          <p className="hero-kicker">Cash on Delivery • Buy Now • Fast checkout</p>
          <h1>Shop like a modern marketplace</h1>
          <p className="hero-text">
            it currently highlights a broad catalog of products and surfaces free shipping and Cash on Delivery on its homepage, while its help pages explain that Pay on Delivery can be cash or digital payment for eligible items. citeturn932914search0turn932914search1turn932914search4turn932914search6turn932914search14
          </p>
          <div className="hero-buttons">
            <button className="primary-btn" onClick={() => setShowCart(true)}>Open Cart</button>
            <button className="secondary-btn" onClick={() => setShowCheckout(true)}>Buy Now</button>
          </div>
        </div>
        <div className="hero-card">
          <div className="hero-stat">
            <strong>Today’s Deals</strong>
            <span>Super fast browsing</span>
          </div>
          <div className="hero-stat">
            <strong>Pay on Delivery</strong>
            <span>Cash or digital</span>
          </div>
          <div className="hero-stat">
            <strong>Returns</strong>
            <span>Simple order flow</span>
          </div>
        </div>
      </section>

      {showAdd && (
        <section className="surface">
          <AddProduct addProduct={addProduct} />
        </section>
      )}

      <section className="surface">
        <div className="section-head">
          <h2>Top picks</h2>
          <p>Inspired by a marketplace layout with quick add-to-cart and fast checkout.</p>
        </div>
        <ProductList
          products={visibleProducts}
          onAddToCart={addToCart}
          onBuy={buyNow}
        />
      </section>

      <CartDrawer
        open={showCart}
        cart={cart}
        subtotal={subtotal}
        shipping={shipping}
        total={total}
        onClose={() => setShowCart(false)}
        onIncrease={increaseQty}
        onDecrease={decreaseQty}
        onRemove={removeItem}
        onClear={clearCart}
        onCheckout={() => setShowCheckout(true)}
      />

      <CheckoutDrawer
        open={showCheckout}
        cart={cart}
        total={total}
        deliveryPincode={deliveryPincode}
        setDeliveryPincode={setDeliveryPincode}
        paymentMethod={paymentMethod}
        setPaymentMethod={setPaymentMethod}
        onClose={() => setShowCheckout(false)}
        onPlaceOrder={placeOrder}
      />

      {toast && <div className="toast">{toast}</div>}
    </div>
  );
}
