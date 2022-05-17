import { useContext } from "react";
import useInput from "../../Hooks/use-input";

import CartContext from "../Store/cart-context";
import classes from "./CheckOut.module.css";

const CheckOut = (props) => {
  const ctx = useContext(CartContext);

  const {
    value: enteredName,
    isTouched: isNameTouched,
    onchage: onNameChangeHandler,
    onBlur: onNameBlurHandler,
    isInputValid: enteredNameIsValid,
  } = useInput(
    { type: { change: "NAME", blur: "NAME_BLUR" } },
    (value) => value !== ""
  );

  const {
    value: enteredEmail,
    isTouched: isEmailTouched,
    onchage: onEmailChangeHandler,
    onBlur: onEmailBlurHandler,
    isInputValid: enteredEmailIsValid,
  } = useInput({ type: { change: "EMAIL", blur: "EMAIL_BLUR" } }, (value) =>
    value.includes("@")
  );

  const {
    value: enteredAddress,
    isTouched: isAddressTouched,
    onchage: onAddressChangeHandler,
    onBlur: onAddressBlurHandler,
    isInputValid: enteredAddressIsValid,
  } = useInput(
    { type: { change: "ADDRESS", blur: "ADDRESS_BLUR" } },
    (value) => value !== ""
  );

  const formIsValid =
    enteredNameIsValid && enteredAddressIsValid && enteredNameIsValid;

  const onConfirmOrderHandler = (e) => {
    e.preventDefault();

    if (!formIsValid) return;

    // pass data to Cart
    props.onCofirm({
      name: enteredName,
      email: enteredEmail,
      address: enteredAddress,
    });
  };

  const nameClasses = `${classes.control} ${
    !enteredNameIsValid && isNameTouched && classes.invalid
  }`;
  const emailClasses = `${classes.control} ${
    !enteredEmailIsValid && isEmailTouched && classes.invalid
  }`;
  const addressClasses = `${classes.control} ${
    !enteredAddressIsValid && isAddressTouched && classes.invalid
  }`;

  return (
    <form onSubmit={onConfirmOrderHandler}>
      <h2>Customer detials</h2>
      <div className={nameClasses}>
        <label htmlFor="name">Your name</label>
        <input
          onBlur={onNameBlurHandler}
          value={enteredName}
          type={"text"}
          id="name"
          onChange={onNameChangeHandler}
        />
        {!enteredNameIsValid && isNameTouched && (
          <p className={classes[`error-text`]}>Please enter a valid name</p>
        )}
      </div>
      <div className={emailClasses}>
        <label htmlFor="email">Your Email</label>
        <input
          onBlur={onEmailBlurHandler}
          value={enteredEmail}
          type={"text"}
          id="email"
          onChange={onEmailChangeHandler}
        />
        {!enteredEmailIsValid && isEmailTouched && (
          <p className={classes[`error-text`]}>Please enter a valid email</p>
        )}
      </div>
      <div className={addressClasses}>
        <label htmlFor="address">Your Address</label>
        <input
          onBlur={onAddressBlurHandler}
          value={enteredAddress}
          type={"text"}
          id="address"
          onChange={onAddressChangeHandler}
        />
        {!enteredAddressIsValid && isAddressTouched && (
          <p className={classes[`error-text`]}>Please enter a valid address</p>
        )}
      </div>

      <div className={classes.actions}>
        <button type="button" onClick={ctx.hideCart}>
          Cancel
        </button>
        <button
          disabled={!formIsValid}
          className={classes.submit}
          type="submit"
        >
          Confirm
        </button>
      </div>
    </form>
  );
};

export default CheckOut;
