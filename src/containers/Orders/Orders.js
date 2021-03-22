import React, { Component } from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-order';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import classes from './Orders.module.css';
import { connect } from 'react-redux';
import { fetchOrder } from '../../store/actions';

class Orders extends Component {
  componentDidMount() {
    this.props.onFetchOrders();
  }

  render() {
    let ordersEle = (
      <p className={classes.NoOrder}>there is no orders for now!</p>
    );

    if (this.props.orders) {
      const orders = this.props.orders;
      ordersEle = Object.keys(orders).map((k) => {
        return (
          <Order
            key={k}
            ingredients={orders[k].ingredients}
            price={orders[k].totalPrice}
          />
        );
      });
    }

    return <div>{ordersEle}</div>;
  }
}

const mapStateToProps = (state) => {
  return {
    orders: state.order.orders,
    loading: state.order.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchOrders: () => {
      dispatch(fetchOrder());
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(Orders, axios));
