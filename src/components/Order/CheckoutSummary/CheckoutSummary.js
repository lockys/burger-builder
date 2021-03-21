import React from 'react';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button.js';

import classes from './CheckoutSummary.module.css';

const checkoutSummary = ({
  ingredients,
  checkoutButtonCancel,
  checkoutButtonContinue,
}) => {
  return (
    <div className={classes.CheckoutSummary}>
      <h1>We hope it taste well!</h1>
      <div
        style={{
          width: '100%',
          margin: 'auto',
        }}
      >
        <Burger ingredients={ingredients} />
        <Button btnType="Danger" clicked={checkoutButtonCancel}>
          CANCEL
        </Button>
        <Button btnType="Success" clicked={checkoutButtonContinue}>
          CONTINUE
        </Button>
      </div>
    </div>
  );
};

export default checkoutSummary;
