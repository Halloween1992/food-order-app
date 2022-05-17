import { useState, useReducer } from "react";
import CartContext from "./cart-context";
const defaultCart = {
  items: [],
  totalAmount: 0,
};
const cartReducer = (state, action) => {
  if (action.type === "ADD") {
    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;

    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );
    const existingCartItem = state.items[existingCartItemIndex];

    let updatedItems = [...state.items];

    if (existingCartItem) {
      const updateItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.item.amount,
      };
      updatedItems[existingCartItemIndex] = updateItem;
    } else {
      //   updatedItems = state.items.concat(action.item);
      updatedItems.push(action.item);
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }

  if (action.type === "REMOVE") {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
    const existingItem = state.items[existingCartItemIndex];
    const updatedTotalAmount = state.totalAmount - existingItem.price;
    let updatedItems;
    if (existingItem.amount === 1) {
      updatedItems = state.items.filter((item) => item.id !== action.id);
    } else {
      const updatedItem = { ...existingItem, amount: existingItem.amount - 1 };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }
  if (action.type === "CLEAR") return defaultCart;

  return defaultCart;
};
const CartContextProvider = (props) => {
  const [cartState, cartDisp] = useReducer(cartReducer, defaultCart);
  const [isCheckOut, setIsCheckout] = useState(false);
  const [isCartShown, setisCartShown] = useState(false);

  const onShowCartHandler = () => {
    setisCartShown(true);
  };

  const onHideCartHandler = () => {
    setisCartShown(false);
    setIsCheckout(false);
  };

  const onOrderHandler = () => {
    setIsCheckout(true);
  };

  const addItemTOcart = (item) => {
    cartDisp({
      type: "ADD",
      item,
    });
  };

  const removeItemFromCart = (id) => {
    cartDisp({
      type: "REMOVE",
      id,
    });
  };

  const clearCartHandler = () => {
    cartDisp({
      type: "CLEAR",
    });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemTOcart,
    removeItem: removeItemFromCart,
    showCart: onShowCartHandler,
    hideCart: onHideCartHandler,
    isCartShown: isCartShown,
    isCheckOut,
    clearCart: clearCartHandler,
    order: onOrderHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
