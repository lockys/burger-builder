import React, { Component } from 'react';
import Aux from '../../../hoc/Aux/Aux';
import Backdrop from '../Backdrop/Backdrop';
import classes from './Modal.module.css';

class Modal extends Component {
  shouldComponentUpdate(nextProps, nextStates) {
    return (
      this.props.show !== nextProps.show ||
      this.props.children !== nextProps.children
    );
  }

  render() {
    return (
      <Aux>
        <Backdrop show={this.props.show} clicked={this.props.modalClosed} />
        <div
          className={classes.Modal}
          style={{
            transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
            opacity: this.props.show ? '1' : '0',
          }}
        >
          {this.props.children}
        </div>
      </Aux>
    );
  }
}

export default Modal;
