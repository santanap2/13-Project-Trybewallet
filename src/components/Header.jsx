import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes, { string } from 'prop-types';

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
      <div>
        <header>
          <p data-testid="email-field">{ email }</p>
          <span data-testid="total-field">{ total }</span>
          <span data-testid="header-currency-field"> BRL</span>
          <br />
          <br />
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
