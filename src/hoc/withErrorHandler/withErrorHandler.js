import React, { Component } from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Aux/Aux';

const withErrorHandler = (WrapperContainer, axios) => {
  return class extends Component {
    state = {
      error: null,
    };

    componentWillMount() {
      axios.interceptors.request.use((req) => {
        this.setState({
          error: null,
        });

        return req;
      });

      axios.interceptors.response.use(
        (res) => res,
        (err) => {
          this.setState({
            error: err,
          });
        }
      );
    }

    onErrorConfirmHandler = () => {
      this.setState({
        error: null,
      });
    };

    render() {
      return (
        <Aux>
          <Modal
            show={this.state.error}
            modalClosed={this.onErrorConfirmHandler}
          >
            Something went wrong...
            {this.state.error ? this.state.error.message : null}
          </Modal>
          <WrapperContainer {...this.props} />
        </Aux>
      );
    }
  };
};

export default withErrorHandler;
