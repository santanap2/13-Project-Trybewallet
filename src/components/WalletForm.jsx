import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { fetchCurrencies, saveExpense } from '../redux/actions';
import requestExchange from '../services/requestExchange';

class WalletForm extends Component {
  state = {
    value: '',
    description: '',
    currency: 'USD',
    method: 'Cartão de crédito',
    tag: 'Alimentação',
    id: 0,
    exchangeRates: {},
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

  onClickAddButton = async (event) => {
    event.preventDefault();
    const { dispatch } = this.props;
    const resultExchange = await requestExchange();
    this.setState({
      exchangeRates: resultExchange,
    }, () => {
      const { value, description, currency, method, tag, id, exchangeRates } = this.state;
      const expense = { id, value, description, currency, method, tag, exchangeRates };
      dispatch(saveExpense(expense));

      this.setState((previousState) => ({
        value: '',
        description: '',
        id: previousState.id + 1,
      }));
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
            name="method"
            data-testid="method-input"
            value={ payment }
            onChange={ this.inputHandler }
          >
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
            <option value="Dinheiro">Dinheiro</option>
          </select>

          <select
            name="tag"
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

          <button
            type="submit"
            onClick={ this.onClickAddButton }
          >
            Adicionar despesa
          </button>
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
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(WalletForm);
