import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { fetchCurrencies } from '../redux/actions';

class WalletForm extends Component {
  state = {
    value: 0,
    description: '',
    currency: 'USD',
    payment: 'Cartão de crédito',
    type: 'Alimentação',
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCurrencies());
  }

  inputHandler = ({ target }) => {
    this.setState({
      [target.name]: target.value,
    });
  };

  render() {
    const { currencies } = this.props;
    const { value, description, currency, payment, type } = this.state;

    return (
      <div>
        <form>
          <label htmlFor="value">
            <input
              type="number"
              id="value"
              name="value"
              data-testid="value-input"
              placeholder="Valor da despesa"
              onChange={ this.inputHandler }
              value={ value }
            />
          </label>

          <label htmlFor="description">
            <input
              type="text"
              id="description"
              name="description"
              data-testid="description-input"
              placeholder="Descrição"
              value={ description }
              onChange={ this.inputHandler }
            />
          </label>
          <select
            name="currency"
            data-testid="currency-input"
            value={ currency }
            onChange={ this.inputHandler }
          >
            { currencies.map((item) => (
              <option
                value={ item }
                key={ item }
              >
                { item }
              </option>
            ))}
          </select>

          <select
            name="payment"
            data-testid="method-input"
            value={ payment }
            onChange={ this.inputHandler }
          >
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
            <option value="Dinheiro">Dinheiro</option>
          </select>

          <select
            name="type"
            data-testid="tag-input"
            value={ type }
            onChange={ this.inputHandler }
          >
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Saúde">Saúde</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
          </select>
        </form>
      </div>
    );
  }
}

WalletForm.propTypes = {
  dispatch: propTypes.func.isRequired,
  currencies: propTypes.instanceOf(Array).isRequired,
};

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

export default connect(mapStateToProps)(WalletForm);
