import { useRef } from "react";
import Input from "../../UI/Input";
import classes from "./MealFrom.module.css";

const MealFrom = (props) => {
  const amountRef = useRef();

  const onSubmitHandler = (e) => {
    e.preventDefault();
    const enteredAmount = +amountRef.current.value;
    props.onAddToCart(enteredAmount);
  };

  return (
    <form className={classes.form} onSubmit={onSubmitHandler}>
      <Input
        ref={amountRef}
        label="amount"
        input={{
          id: "amount_" + props.id,
          type: "number",
          min: 1,
          max: 5,
          steps: 1,
          defaultValue: 1,
        }}
      />
      <button type="submit" className={classes.button}>
        + Add
      </button>
    </form>
  );
};

export default MealFrom;
