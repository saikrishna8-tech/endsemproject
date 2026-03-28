import { useState } from "react";

export default function AddProduct({ addProduct }) {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("custom");

  const handleSubmit = (e) => {
    e.preventDefault();
    addProduct({
      id: Date.now(),
      title,
      price: Number(price),
      image: image || "https://via.placeholder.com/300",
      category
    });
    setTitle("");
    setPrice("");
    setImage("");
    setCategory("custom");
  };

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <div className="section-head">
        <h2>Add a product</h2>
        <p>New item appears instantly in the store grid.</p>
      </div>

      <div className="form-grid">
        <input
          type="text"
          placeholder="Product title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <input
          type="url"
          placeholder="Image URL (optional)"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
      </div>

      <button className="primary-btn" type="submit">Save product</button>
    </form>
  );
}
