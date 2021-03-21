import React from 'react';
import Aux from '../../../../hoc/Aux/Aux';
import Button from '../../../UI/Button/Button';

const orderSummary = (props) => {
  const ingredientList = Object.keys(props.ingredients).map((igkey) => {
    return (
      <li key={igkey}>
        <span
          style={{
            textTransform: 'capitalize',
          }}
        >
          {igkey}
        </span>
        : {props.ingredients[igkey]}
      </li>
    );
  });

  return (
    <Aux>
      <h3>Your order:</h3>
      <p>A delicious burger with following ingredients</p>
      <ul>{ingredientList}</ul>
      <p>Continue to check out?</p>
      <p>
        <strong>Price: {props.price.toFixed(2)}</strong>
      </p>
      <Button clicked={props.purchaseCancelled} btnType="Danger">
        Cancel
      </Button>
      <Button clicked={props.purchaseContinued} btnType="Success">
        Continue
      </Button>
    </Aux>
  );
};

export default orderSummary;
