export const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD": {
      const item = state.find(i => i.id === action.product.id);

      if (item) {
        if (item.qty >= item.stock) return state;
        return state.map(i =>
          i.id === item.id ? { ...i, qty: i.qty + 1 } : i
        );
      }

      return [...state, { ...action.product, qty: 1 }];
    }

    case "REMOVE":
      return state.filter(i => i.id !== action.id);

    case "UPDATE_QTY":
      return state.map(i =>
        i.id === action.id ? { ...i, qty: action.qty } : i
      );

    case "SET":
      return action.payload;

    default:
      return state;
  }
};