import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes, { string } from 'prop-types';

class Header extends Component {
  render() {
    const { userData: { email } } = this.props;
    return (
      <div>
        <header>
          <p data-testid="email-field">{ email }</p>
          <span data-testid="total-field"> 0</span>
          <span data-testid="header-currency-field"> BRL</span>
          <br />
          <br />
        </header>
      </div>
    );
  }
}

Header.propTypes = {
  userData: propTypes.shape({ email: string }).isRequired,
};

const mapStateToProps = (state) => ({
  userData: state.user,
});

export default connect(mapStateToProps)(Header);
