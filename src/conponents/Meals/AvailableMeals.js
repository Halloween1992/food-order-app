import { useState, useEffect } from "react";
import Card from "../UI/Card";
import classes from "./AvailableMeals.module.css";
import MealItem from "./mealItem/MealItem";

const AvailableMeals = () => {
  const [mealsList, setMealsList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, SetErrorMsg] = useState();

  useEffect(() => {
    const loadMeals = async () => {
      const response = await fetch(
        "https://react-http-d79c3-default-rtdb.firebaseio.com/meals.json"
      );
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      const data = await response.json();
      const loadedData = [];
      for (const key in data) {
        loadedData.push({
          id: key,
          name: data[key].name,
          description: data[key].description,
          price: data[key].price,
        });
      }
      setMealsList(loadedData);
      setIsLoading(false);
    };

    loadMeals().catch((error) => {
      setIsLoading(false);
      SetErrorMsg(error.message);
    });
  }, []);

  if (isLoading)
    return (
      <section className={classes.loadingText}>
        <h4>Loading...</h4>
      </section>
    );

  if (errorMsg)
    return (
      <section className={classes.loadingText}>
        <h4>{errorMsg}</h4>
      </section>
    );

  const mealList = mealsList.map((meal) => (
    <MealItem
      id={meal.id}
      key={meal.id}
      name={meal.name}
      price={meal.price}
      description={meal.description}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
