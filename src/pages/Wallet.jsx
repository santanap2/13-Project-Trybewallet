import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import Header from '../components/Header';
import WalletForm from '../components/WalletForm';
import Table from '../components/Table';
import ExpenseEditor from '../components/ExpenseEditor';
import '../css/Wallet.css';

class Wallet extends React.Component {
  render() {
    const { editor } = this.props;
    return (
      <div>
        <Header />
        <div className="wallet-container">
          { editor ? <ExpenseEditor /> : <WalletForm /> }
          <Table />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  editor: state.wallet.editor,
});

Wallet.propTypes = {
  editor: propTypes.bool,
};

Wallet.defaultProps = {
  editor: propTypes.bool,
};

export default connect(mapStateToProps)(Wallet);
