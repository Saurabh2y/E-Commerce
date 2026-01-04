import { useEffect, useState } from "react";

export function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then(res => res.json())
      .then(data => {
        const withStock = data.slice(0, 20).map(p => ({
          ...p,
          stock: Math.floor(Math.random() * 10) + 1
        }));
        setProducts(withStock);
        setLoading(false);
      });
  }, []);

  return { products, loading };
}