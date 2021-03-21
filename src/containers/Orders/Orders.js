import React, { Component } from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-order';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import classes from './Orders.module.css';

class Orders extends Component {
  state = {
    orders: null,
  };

  componentDidMount() {
    axios
      .get('/orders.json')
      .then((res) => {
        this.setState({
          orders: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    let ordersEle = (
      <p className={classes.NoOrder}>there is no orders for now!</p>
    );

    if (this.state.orders) {
      const orders = this.state.orders;
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

export default withErrorHandler(Orders, axios);
