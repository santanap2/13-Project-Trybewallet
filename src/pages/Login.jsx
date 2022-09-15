import React from 'react';
import propTypes, { func } from 'prop-types';
import { connect } from 'react-redux';
import { loginDone } from '../redux/actions';
import '../css/Login.css';

class Login extends React.Component {
  state = {
    buttonDisabled: true,
    email: '',
    password: '',
  };

  inputHandler = ({ target }) => {
    this.setState({
      [target.name]: target.value,
    }, () => {
      const { password, email } = this.state;
      const passwordMinLength = 6;
      const validator = /^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
      const enabledButton = password.length >= passwordMinLength
      && validator.test(email)
      && email.length > 0;
      this.setState({
        buttonDisabled: !enabledButton,
      });
    });
  };

  onClickLoginButton = (event) => {
    event.preventDefault();
    const { history: { push }, dispatch } = this.props;
    push('/carteira');
    const { email } = this.state;
    dispatch(loginDone({ email }));
  };

  render() {
    const { buttonDisabled } = this.state;
    return (
      <div className="login-container">
        <img
          src="https://imgur.com/Wmsv3zx.png"
          alt="logo"
          className="logo-img"
        />
        <form className="login-form">
          <label htmlFor="input-email">
            <input
              type="email"
              data-testid="email-input"
              name="email"
              id="input-email"
              placeholder="Digite seu email"
              onChange={ this.inputHandler }
              className="input"
            />
          </label>

          <label htmlFor="input-password">
            <input
              type="password"
              data-testid="password-input"
              name="password"
              id="password-email"
              placeholder="Digite sua senha"
              onChange={ this.inputHandler }
              className="input"
            />
          </label>

          <button
            type="submit"
            onClick={ this.onClickLoginButton }
            disabled={ buttonDisabled }
            className="login-button"
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  history: propTypes.shape({ push: func }).isRequired,
  dispatch: propTypes.func.isRequired,
};

export default connect()(Login);
