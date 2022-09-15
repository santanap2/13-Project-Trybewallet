import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes, { string } from 'prop-types';
import '../css/Header.css';

class Header extends Component {
  sumExpenses = () => {
    const { expenses } = this.props;
    let sum = 0;
    expenses.forEach((item) => {
      const conversion = item.value * item.exchangeRates[item.currency].ask;
      const number = parseFloat(conversion);
      sum += number;
    });
    return sum;
  };

  render() {
    const { user: { email } } = this.props;
    const total = this.sumExpenses().toFixed(2);
    return (
      <div className="header-container">
        <header className="header">
          <img
            src="https://imgur.com/Wmsv3zx.png"
            alt="logo"
            className="logo-header"
          />
          <div className="total-expenses">
            <img
              src="https://i.imgur.com/mhTlALx.png"
              alt="moedas"
            />
            <span className="total-title">Total de despesas: </span>
            <span data-testid="total-field" className="total">{ total }</span>
            <span data-testid="header-currency-field"> BRL</span>
          </div>

          <div className="email-container">
            <img
              src="https://i.imgur.com/6zQ4s5v.png"
              alt="email-logo"
            />
            <span data-testid="email-field">{ email }</span>
          </div>
        </header>
      </div>
    );
  }
}

Header.propTypes = {
  user: propTypes.shape({ email: string }).isRequired,
  expenses: propTypes.instanceOf(Array).isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Header);
