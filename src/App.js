import { useContext } from "react";
import Cart from "./conponents/Cart/Cart";
import Header from "./conponents/Layouts/Header";
import Meals from "./conponents/Meals/Meals";
import CartContext from "./conponents/Store/cart-context";
function App() {
  const ctx = useContext(CartContext);
  return (
    <>
      {ctx.isCartShown && <Cart />}
      <Header />
      <Meals />
    </>
  );
}

export default App;
