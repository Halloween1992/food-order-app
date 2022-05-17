import classes from "./Header.module.css";
import headerImage from "../../assets/meals.jpg";
import HeaderCartBtn from "./HeaderCartBtn";

const Header = (props) => {
  return (
    <>
      <header className={classes.header}>
        <h1>React Food Order App</h1>
        <HeaderCartBtn />
      </header>
      <div className={classes["main-image"]}>
        <img src={headerImage} alt="table full of deleacius food" />
      </div>
    </>
  );
};

export default Header;
