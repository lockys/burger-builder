import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/Aux/Aux';

import classes from './SideDrawer.module.css';

const sideDrawer = (props) => {
  const attachClassName = [
    classes.SideDrawer,
    props.open ? classes.Open : classes.Close,
  ].join(' ');

  return (
    <Aux>
      <Backdrop show={props.open} clicked={props.closed} />
      <div className={attachClassName}>
        <div className={classes.Logo}>
          <Logo />
        </div>
        <nav>
          <NavigationItems isAuth={props.isAuthenticated} />
        </nav>
      </div>
    </Aux>
  );
};

export default sideDrawer;
