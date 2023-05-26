import React from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import Loading from './Loading';

export default class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      userName: 'user',
      disabledButton: true,
      loading: false,
      redirect: false,
    };
  }

  keyPressed = (value) => {
    const { code } = value;
    const { disabledButton } = this.state;
    if (code === 'Enter' && disabledButton === false) {
      return this.onClickButton();
    }
  }

  changeStateName = (input) => {
    const { target } = input;
    this.setState({
      userName: target.value,
    }, () => this.buttonDisabled());
  }

  buttonDisabled = () => {
    const { userName } = this.state;
    const number = 3;
    if (userName.length >= number) {
      this.setState({
        disabledButton: false,
      });
    } else {
      this.setState({
        disabledButton: true,
      });
    }
  }

  onClickButton = () => {
    const { userName } = this.state;
    this.setState({
      loading: true,
    });
    createUser({ name: userName });
    this.setState({
      loading: false,
      redirect: true,
    });
  }

  render() {
    const { disabledButton, loading, redirect } = this.state;

    return (
      <div data-testid="page-login">
        {loading ? (<Loading />) : (
          <form>
            <input
              placeholder="digite seu nome"
              type="text"
              data-testid="login-name-input"
              onChange={ this.changeStateName }
              onKeyDown={ this.keyPressed }
            />
            <button
              type="button"
              data-testid="login-submit-button"
              disabled={ disabledButton }
              onClick={ this.onClickButton }
            >
              Entrar
            </button>
          </form>
        )}

        {redirect && <Redirect to="/search" /> }
      </div>
    );
  }
}

Login.propTypes = {
  disabledButton: PropTypes.bool,
  onClickButton: PropTypes.func,
  userName: PropTypes.string,
  changeStateName: PropTypes.func,
  loading: PropTypes.bool,
  redirect: PropTypes.bool,
}.isRequired;
