import { useContext } from "react";
import classes from "./Model.module.css";
import reactDom from "react-dom";
import CartContext from "../Store/cart-context";
const Backdrop = (props) => {
  const ctx = useContext(CartContext);
  return <div className={classes.backdrop} onClick={ctx.hideCart} />;
};

const Overlay = (props) => {
  return (
    <div className={classes.modal}>
      <div>{props.children}</div>
    </div>
  );
};

const portalEle = document.getElementById("backdrops");

const Model = (props) => {
  return (
    <>
      {reactDom.createPortal(<Backdrop />, portalEle)}
      {reactDom.createPortal(<Overlay>{props.children}</Overlay>, portalEle)}
    </>
  );
};

export default Model;
