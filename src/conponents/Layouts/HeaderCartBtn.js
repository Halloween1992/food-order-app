import { useContext, useState, useEffect } from "react";
import CartIcon from "../Cart/CartIcon";
import classes from "./HeaderCartBtn.module.css";
import CartContext from "../Store/cart-context";

const HeaderCartBtn = (props) => {
  const [isBtnHighlited, setIsBtnHighlited] = useState(false);
  const ctx = useContext(CartContext);

  const { items } = ctx;

  const cartItmes = items.reduce((cur, item) => {
    return cur + item.amount;
  }, 0);

  const btnClasses = `${classes.button} ${isBtnHighlited && classes.bump}`;

  useEffect(() => {
    setIsBtnHighlited(true);

    const timer = setTimeout(() => {
      setIsBtnHighlited(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [items]);

  return (
    <button className={btnClasses} onClick={ctx.showCart}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your cart</span>
      <span className={classes.badge}>{cartItmes}</span>
    </button>
  );
};

export default HeaderCartBtn;
