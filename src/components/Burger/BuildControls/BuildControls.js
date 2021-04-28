import React from 'react';
import BuildControl from './BuildControl/BuildControl';
import classes from './BuildControls.module.css';

const controls = [
  { label: 'Salad', type: 'salad' },
  { label: 'Bacon', type: 'bacon' },
  { label: 'Cheese', type: 'cheese' },
  { label: 'Meat', type: 'meat' },
];

const buildControl = (props) => {
  return (
    <div className={classes.BuildControls}>
      <p>
        Current Price: <strong> {props.price.toFixed(2)} </strong>
      </p>

      {controls.map((ctrl) => (
        <BuildControl
          key={ctrl.label}
          label={ctrl.label}
          added={() => {
            props.ingredientAdded(ctrl.type);
          }}
          removed={() => {
            props.ingredientRemoved(ctrl.type);
          }}
          disabled={props.disableInfo[ctrl.type]}
        />
      ))}
      <button
        className={classes.OrderButton}
        disabled={!props.purchaseble}
        onClick={props.orderClicked}
      >
        {props.isAuth ? 'ORDER NOW!' : 'SIGN UP TO ORDER!'}
      </button>
    </div>
  );
};

export default buildControl;
