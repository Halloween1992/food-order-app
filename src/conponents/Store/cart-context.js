import React from "react";

const CartContext = React.createContext({
  items: [],
  totalAmount: 0,
  addItem: (item) => {},
  removeItem: (id) => {},
  showCart: () => {},
  hideCart: () => {},
  order: () => {},
  isCartShown: false,
  isCheckOut: false,
});

export default CartContext;
