import React, { Component } from 'react';
import classes from './Auth.module.css';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import { auth } from '../../store/actions';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';

class Auth extends Component {
  state = {
    controls: {
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Email Address',
        },
        validation: {
          required: true,
          isEmail: true,
        },
        value: '',
        isValid: false,
        touched: false,
        errorMessage: '[email error mesg]',
      },
      password: {
        elementType: 'input',
        elementConfig: {
          type: 'password',
          placeholder: 'Password',
        },
        validation: {
          required: true,
          minLength: 6,
        },
        value: '',
        isValid: false,
        touched: false,
        errorMessage: '[password error mesg]',
      },
    },
    isSignup: true,
  };

  checkFormValidation = (value, validation) => {
    let isValid = true;

    if (validation.required) {
      const val = value.trim();
      isValid = isValid && val !== '';
    }

    if (validation.minLength) {
      const length = value.trim().length;
      isValid = isValid && length >= validation.minLength;
    }

    if (validation.isEmail) {
      const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      isValid = isValid && pattern.test(value);
    }

    return isValid;
  };

  inputChangeHandler = (event, inputField) => {
    const updatedControlForm = {
      ...this.state.controls,
      [inputField]: {
        ...this.state.controls[inputField],
        value: event.target.value,
        touched: true,
        isValid: this.checkFormValidation(
          event.target.value,
          this.state.controls[inputField].validation
        ),
      },
    };

    this.setState({
      controls: updatedControlForm,
    });
  };

  onSubmitHandler = (event) => {
    event.preventDefault();
    this.props.onAuth(
      this.state.controls['email'].value,
      this.state.controls['password'].value,
      this.state.isSignup
    );
  };

  switchAuthMethodHandler = () => {
    this.setState((prevState) => ({
      isSignup: !prevState.isSignup,
    }));
  };

  render() {
    const formElementArray = [];
    for (let key in this.state.controls) {
      formElementArray.push({
        id: key,
        setup: this.state.controls[key],
      });
    }

    let form = formElementArray.map((formElement) => {
      return (
        <Input
          key={formElement.id}
          elementType={formElement.setup.elementType}
          elementConfig={formElement.setup.elementConfig}
          value={formElement.setup.value}
          invalid={!formElement.setup.isValid}
          shouldValid={formElement.setup.validation}
          touched={formElement.setup.touched}
          errorMessage={formElement.setup.errorMessage}
          changed={(evt) => {
            this.inputChangeHandler(evt, formElement.id);
          }}
        />
      );
    });

    if (this.props.loading) {
      form = <Spinner />;
    }

    let errorMessage = null;

    if (this.props.error) {
      errorMessage = <p>{this.props.error.message}</p>;
    }

    let authRedirect = null;
    if (this.props.isAuth) {
      authRedirect = <Redirect to="/" />;
    }

    return (
      <div className={classes.Auth}>
        {authRedirect}
        {errorMessage}
        <form
          onSubmit={(event) => {
            this.onSubmitHandler(event);
          }}
        >
          {form}
          <Button btnType="Success">SUBMIT</Button>
        </form>
        <Button btnType="Danger" clicked={this.switchAuthMethodHandler}>
          SWITCH TO {this.state.isSignup ? 'SIGNIN' : 'SIGNUP'}
        </Button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuth: state.auth.token !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (email, password, isSignup) => {
      dispatch(auth(email, password, isSignup));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
