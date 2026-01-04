import ProductCard from "./ProductCard";
import "./product.css";

export default function ProductGrid({
  products,
  onAddToCart,
  onView
}) {
  if (!products || products.length === 0) {
    return <p>No products found</p>;
  }

  return (
    <div className="grid">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={onAddToCart}
          onView={onView}
        />
      ))}
    </div>
  );
}