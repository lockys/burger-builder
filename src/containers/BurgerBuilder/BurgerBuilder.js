import React, { Component } from 'react';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/BuildControls/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-order';
import { connect } from 'react-redux';
import {
  addIngredient,
  removeIngredient,
  initIngredients,
  purchaseBurgerInit,
} from '../../store/actions/index';

class BurgerBuilder extends Component {
  state = {
    purchasing: false,
  };

  isBurgerPurchaseble = (ingredients) => {
    const sum = Object.keys(ingredients)
      .map((igKey) => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);

    return sum > 0;
  };

  updatePurchasingStateHandler = () => {
    if (this.props.isAuth) {
      this.setState({
        purchasing: true,
      });
    } else {
      this.props.history.push('/auth');
    }
  };

  cancelPurchasingHandler = () => {
    this.setState({
      purchasing: false,
    });
  };

  continuePurchasingHandler = () => {
    this.props.onPurchaseInit();
    this.props.history.push('/checkout');
  };

  componentDidMount() {
    this.props.initIngredient();
  }

  render() {
    let disableInfo = {
      ...this.props.ings,
    };

    for (let k in disableInfo) {
      disableInfo[k] = disableInfo[k] <= 0;
    }

    let orderSummary = null;

    if (this.props.ings) {
      orderSummary = (
        <OrderSummary
          ingredients={this.props.ings}
          purchaseCancelled={this.cancelPurchasingHandler}
          purchaseContinued={this.continuePurchasingHandler}
          price={this.props.price}
        />
      );
    }

    if (this.state.isLoading) {
      orderSummary = <Spinner />;
    }

    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.cancelPurchasingHandler}
        >
          {orderSummary}
        </Modal>

        {this.props.ings ? (
          <Aux>
            <Burger ingredients={this.props.ings} />

            <BuildControls
              ingredientAdded={this.props.onIngredientAdd}
              ingredientRemoved={this.props.onIngredientRemove}
              disableInfo={disableInfo}
              purchaseble={this.isBurgerPurchaseble(this.props.ings)}
              orderClicked={this.updatePurchasingStateHandler}
              price={this.props.price}
              isAuth={this.props.isAuth}
            />
          </Aux>
        ) : (
          <Spinner />
        )}
      </Aux>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    isAuth: state.auth.token !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onIngredientAdd: (ingredientName) => {
      dispatch(addIngredient(ingredientName));
    },
    onIngredientRemove: (ingredientName) => {
      dispatch(removeIngredient(ingredientName));
    },
    initIngredient: () => {
      dispatch(initIngredients());
    },
    onPurchaseInit: () => {
      dispatch(purchaseBurgerInit());
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
