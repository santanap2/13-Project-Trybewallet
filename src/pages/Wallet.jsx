import React from 'react';
import { connect } from 'react-redux';
import propTypes, { string } from 'prop-types';

class Wallet extends React.Component {
  render() {
    const { userData: { email } } = this.props;
    return (
      <div>
        <header>
          <span data-testid="email-field">{ email }</span>
          <span data-testid="total-field">0</span>
          <span data-testid="header-currency-field"> BRL</span>
        </header>
      </div>
    );
  }
}

Wallet.propTypes = {
  userData: propTypes.shape({ email: string }).isRequired,
};

const mapStateToProps = (state) => ({
  userData: state.user,
});

export default connect(mapStateToProps)(Wallet);
