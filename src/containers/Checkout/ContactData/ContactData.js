import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import axios from '../../../axios-order';
import { connect } from 'react-redux';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import classes from './ContactData.module.css';
import { purchaseBurger } from '../../../store/actions';

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your name',
        },
        validation: {
          required: true,
        },
        value: '',
        isValid: false,
        touched: false,
        errorMessage: '[name error mesg]',
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Your E-Mail',
        },
        validation: {
          required: true,
        },
        value: '',
        isValid: false,
        touched: false,
        errorMessage: '[email error mesg]',
      },
      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Street',
        },
        validation: {
          required: true,
        },
        value: '',
        isValid: false,
        touched: false,
        errorMessage: '[street error mesg]',
      },
      postalCode: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Postal Code',
        },
        validation: {
          required: true,
          minLength: 5,
          maxLength: 5,
        },
        value: '',
        isValid: false,
        touched: false,
        errorMessage: 'The length of postal code should be 5!',
      },
      country: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Country',
        },
        validation: {
          required: true,
        },
        value: '',
        isValid: false,
        touched: false,
        errorMessage: '[country error mesg]',
      },
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: [
            { value: 'fastest', displayValue: 'Fastest' },
            { value: 'cheapest', displayValue: 'Cheapest' },
          ],
        },
        value: 'cheapest',
        validation: {},
        isValid: true,
      },
    },
    isFormValid: false,
  };

  orderHandler = (e) => {
    e.preventDefault();

    let formData = {};

    for (let inputField in this.state.orderForm) {
      formData[inputField] = this.state.orderForm[inputField].value;
    }

    const order = {
      ingredients: this.props.ings,
      totalPrice: this.props.price,
      order: formData,
    };

    this.props.onBurgerOrder(order, this.props.token);
  };

  checkValidity = (rules, value) => {
    let isValid = true;

    if (rules.required) {
      isValid = value.trim() !== '' && isValid;
    }

    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }

    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }

    return isValid;
  };

  inputChangeHandler = (event, inputField) => {
    // should copy deeply instead of mutating the original state...see lecture 240.
    let updatedOrderForm = { ...this.state.orderForm };
    let updateOrderFormEle = { ...updatedOrderForm[inputField] };

    updateOrderFormEle.value = event.target.value;

    // to check the validity of a input
    updateOrderFormEle.isValid = this.checkValidity(
      updateOrderFormEle.validation,
      updateOrderFormEle.value
    );

    // set to true, if user starts to input something.. so can show the invalid state of an input.
    updateOrderFormEle.touched = true;

    updatedOrderForm[inputField] = updateOrderFormEle;

    // loop through all the isValid of each input element...
    let isFormValid = true;
    for (let inputField in updatedOrderForm) {
      isFormValid = updatedOrderForm[inputField].isValid && isFormValid;
    }

    this.setState({
      orderForm: updatedOrderForm,
      isFormValid: isFormValid,
    });
  };

  render() {
    let orderForm = this.state.orderForm;
    let orderFormArray = [];

    for (let key in orderForm) {
      orderFormArray.push({
        id: key,
        setup: orderForm[key],
      });
    }

    return (
      <div className={classes.ContactData}>
        <h4>Write down your contact data!</h4>
        {!this.props.loading ? (
          <form onSubmit={this.orderHandler}>
            {orderFormArray.map((formEle) => {
              return (
                <Input
                  key={formEle.id}
                  elementType={formEle.setup.elementType}
                  elementConfig={formEle.setup.elementConfig}
                  value={formEle.setup.value}
                  invalid={!formEle.setup.isValid}
                  shouldValid={formEle.setup.validation}
                  touched={formEle.setup.touched}
                  errorMessage={formEle.setup.errorMessage}
                  changed={(evt) => {
                    this.inputChangeHandler(evt, formEle.id);
                  }}
                />
              );
            })}
            <Button btnType="Success" disabled={!this.state.isFormValid}>
              ORDER
            </Button>
          </form>
        ) : (
          <Spinner />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    loading: state.order.loading,
    token: state.auth.token,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onBurgerOrder: (orderData, token) => {
      dispatch(purchaseBurger(orderData, token));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(ContactData, axios));
