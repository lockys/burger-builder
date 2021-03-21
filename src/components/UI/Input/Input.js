import React from 'react';
import classes from './Input.module.css';

const input = (props) => {
  let inputElement = null;
  let errorMessage = null;
  let attachClasses = [classes.InputElement];

  if (props.invalid && props.shouldValid && props.touched) {
    attachClasses.push(classes.Invalid);
    errorMessage = <p className={classes.ErrorMessage}>{props.errorMessage}</p>;
  }

  switch (props.elementType) {
    case 'input':
      inputElement = (
        <input
          className={attachClasses.join(' ')}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;
    case 'textarea':
      inputElement = (
        <textarea
          className={attachClasses.join(' ')}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;
    case 'select':
      inputElement = (
        <select
          className={attachClasses.join(' ')}
          value={props.value}
          onChange={props.changed}
        >
          {props.elementConfig.options.map((option) => {
            return (
              <option value={option.value} key={option.value}>
                {option.displayValue}
              </option>
            );
          })}
        </select>
      );
      break;
    default:
      inputElement = (
        <input
          className={classes.InputElement}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;
  }

  return (
    <div className={classes.Input}>
      <label className={classes.Label}>{props.label}</label>
      {inputElement}
      {errorMessage}
    </div>
  );
};

export default input;
