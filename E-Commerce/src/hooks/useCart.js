import { useEffect, useReducer } from "react";
import { cartReducer } from "./cartReducer";

const init = () => {
  const savedCart = localStorage.getItem("cart");
  return savedCart ? JSON.parse(savedCart) : [];
};

export function useCart() {
  const [cart, dispatch] = useReducer(cartReducer, [], init);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) =>
    dispatch({ type: "ADD", product });

  const removeFromCart = (id) =>
    dispatch({ type: "REMOVE", id });

  const updateQty = (id, qty) =>
    dispatch({ type: "UPDATE_QTY", id, qty });

  return { cart, addToCart, removeFromCart, updateQty };
}