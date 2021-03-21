import React from 'react';
import classes from './Order.module.css';

const order = ({ ingredients, price }) => (
  <div className={classes.Order}>
    <p>
      Ingredient:
      {Object.keys(ingredients).map((k, idx) => {
        return (
          <span
            key={k + idx}
            style={{
              textTransform: 'capitalize',
              padding: '5px',
              border: '1px solid #ccc',
              margin: '0 5px',
            }}
          >
            {k} ({ingredients[k]})
          </span>
        );
      })}
    </p>
    <p>
      Total price: <strong>{price.toFixed(2)}</strong>
    </p>
  </div>
);

export default order;
