import React from 'react';
import burgerLogo from '../../assets/images/burger-logo.png';
import classes from './Logo.module.css';

const logo = () => {
  return (
    <div className={classes.Logo}>
      <img src={burgerLogo} alt="My burger" />
    </div>
  );
};

export default logo;
