import React from 'react';
import classes from './Burger.module.css';
import BurgerIngredient from './BurgetIngredient/BurgerIngredient';

const burger = (props) => {
  let transformedIngredient = Object.keys(props.ingredients)
    .map((igKey) => {
      let a = Array(props.ingredients[igKey]);

      return [...a].map((e, idx) => {
        return <BurgerIngredient type={igKey} key={igKey + idx} />;
      });
    })
    .reduce((arr, el) => {
      return arr.concat(el);
    }, []);

  if (transformedIngredient.length === 0) {
    transformedIngredient = <p>Please start adding ingredients!</p>;
  }

  return (
    <div className={classes.burger}>
      <BurgerIngredient type="bread-top" />
      {transformedIngredient}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};

export default burger;
