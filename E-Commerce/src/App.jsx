import { useState, useMemo } from "react";
import { useProducts } from "./hooks/useProducts";
import { useCart } from "./hooks/useCart";
import { useDebounce } from "./hooks/useDebounce";

import ProductGrid from "./components/Product/ProductGrid";
import Cart from "./components/Cart/Cart";
import ProductModal from "./components/Product/ProductModal";

function App() {
  const { products, loading } = useProducts();


  const { cart, addToCart, removeFromCart, updateQty } = useCart();

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("");
  const debouncedSearch = useDebounce(search);

  const [selectedProduct, setSelectedProduct] = useState(null);

  const filteredProducts = useMemo(() => {
    let list = [...products];

    if (debouncedSearch) {
      list = list.filter(p =>
        p.title.toLowerCase().includes(debouncedSearch.toLowerCase())
      );
    }

    if (category) {
      list = list.filter(p => p.category === category);
    }

    if (sort === "asc") {
      list.sort((a, b) => a.price - b.price);
    }

    if (sort === "desc") {
      list.sort((a, b) => b.price - a.price);
    }

    return list;
  }, [products, debouncedSearch, category, sort]);


  if (loading) return <h2>Loading...</h2>;

  return (
  <div className="app">
    <h1>E-Commerce UI</h1>

    {/* FILTERS */}
<div className="filters">
  <input
    type="text"
    placeholder="Search products..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
  />

  <select
    value={category}
    onChange={(e) => setCategory(e.target.value)}
  >
    <option value="">All Categories</option>
    <option value="men's clothing">Men's Clothing</option>
    <option value="women's clothing">Women's Clothing</option>
    <option value="jewelery">Jewelery</option>
    <option value="electronics">Electronics</option>
  </select>

  <select
    value={sort}
    onChange={(e) => setSort(e.target.value)}
  >
    <option value="">Sort by Price</option>
    <option value="asc">Low → High</option>
    <option value="desc">High → Low</option>
  </select>

  <button
    onClick={() => {
      setSearch("");
      setCategory("");
      setSort("");
    }}
  >
    Clear Filters
  </button>
  </div>

    <ProductGrid
      products={filteredProducts}
      onAddToCart={addToCart}
      onView={setSelectedProduct}
    />

    <Cart
      cart={cart}
      onRemove={removeFromCart}
      onUpdate={updateQty}
    />

    <ProductModal
      product={selectedProduct}
      onClose={() => setSelectedProduct(null)}
      onAdd={addToCart}
    />
  </div>
  );


}

export default App;