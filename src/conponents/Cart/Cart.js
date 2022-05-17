import { useContext } from "react";
import Model from "../UI/Model";
import CartContext from "../Store/cart-context";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";
import CheckOut from "./CheckOut";
import { useState } from "react";

const Cart = (props) => {
  const ctx = useContext(CartContext);
  const [isSubmiting, setIsSubmiting] = useState(false);
  const [sumitedOrder, setSumitedOrder] = useState(false);

  const totalAmount = `$${ctx.totalAmount.toFixed(2)}`;

  const onRemoveItmeHandler = (id) => {
    ctx.removeItem(id);
  };

  const onAddItemHandler = (item) => {
    ctx.addItem({ ...item, amount: 1 });
  };

  const cartItmes = (
    <ul className={classes["cart-items"]}>
      {ctx.items.map((item) => (
        <CartItem
          key={item.id}
          id={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={onRemoveItmeHandler.bind(null, item.id)}
          onAdd={onAddItemHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const isEmptyCart = ctx.items.length === 0;
  const actionContent = (
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={ctx.hideCart}>
        Close
      </button>
      {!isEmptyCart && (
        <button className={classes.button} onClick={ctx.order}>
          Order
        </button>
      )}
    </div>
  );

  const onConfirmCheckOutHandler = async (userData) => {
    setIsSubmiting(true);
    try {
      await fetch(
        "https://react-http-d79c3-default-rtdb.firebaseio.com/order.json",
        {
          method: "POST",
          body: JSON.stringify({
            user: userData,
            orderedItems: ctx.items,
          }),
        }
      );
    } catch (error) {
      console.log(error.message);
    }
    setIsSubmiting(false);
    setSumitedOrder(true);

    //clean the cart
    ctx.clearCart();
    setTimeout(() => {
      ctx.hideCart();
    }, 4000);
  };

  const cartModelContent = (
    <>
      {cartItmes}
      <div className={classes.total}>
        <h3>Total amount</h3>
        <h3>{totalAmount}</h3>
      </div>
      {ctx.isCheckOut && <CheckOut onCofirm={onConfirmCheckOutHandler} />}
      {!ctx.isCheckOut && actionContent}
    </>
  );

  const submitingContent = (
    <section>
      <h4>Submiting your order please wiat...</h4>
    </section>
  );
  const submitedContent = (
    <section>
      <h4>Your order submited successfully!</h4>
      <div className={classes.actions}>
        <button className={classes["button--alt"]} onClick={ctx.hideCart}>
          Close
        </button>
      </div>
    </section>
  );
  return (
    <Model>
      {!isSubmiting && !sumitedOrder && cartModelContent}
      {isSubmiting && submitingContent}
      {!isSubmiting && sumitedOrder && submitedContent}
    </Model>
  );
};

export default Cart;
