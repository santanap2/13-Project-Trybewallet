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
        <form className="main-form">

          <div className="first-form-row">
            <label htmlFor="description" className="label-form">
              <span>Descrição da despesa</span>
              <input
                type="text"
                id="description"
                name="description"
                data-testid="description-input"
                value={ description }
                onChange={ this.inputHandler }
                className="description-input"
              />
            </label>

            <label htmlFor="tag" className="label-form">
              <span>Categoria da despesa</span>
              <select
                name="tag"
                data-testid="tag-input"
                value={ type }
                onChange={ this.inputHandler }
                className="tag-input"
                id="tag"
              >
                <option value="Alimentação">Alimentação</option>
                <option value="Lazer">Lazer</option>
                <option value="Saúde">Saúde</option>
                <option value="Trabalho">Trabalho</option>
                <option value="Transporte">Transporte</option>
              </select>
            </label>
          </div>

          <div className="second-form-row">
            <label htmlFor="value" className="label-form">
              <span>Valor</span>
              <input
                type="number"
                id="value"
                name="value"
                data-testid="value-input"
                onChange={ this.inputHandler }
                value={ value }
                className="value-input"
              />
            </label>

            <label htmlFor="method">
              <span>Método de pagamento</span>
              <select
                name="method"
                data-testid="method-input"
                value={ payment }
                onChange={ this.inputHandler }
                id="method"
                className="select-method"
              >
                <option value="Cartão de crédito">Cartão de crédito</option>
                <option value="Cartão de débito">Cartão de débito</option>
                <option value="Dinheiro">Dinheiro</option>
              </select>
            </label>

            <label htmlFor="currency">
              <span>Moeda</span>
              <select
                name="currency"
                data-testid="currency-input"
                value={ currency }
                onChange={ this.inputHandler }
                id="currency"
                className="select-currency"
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
            </label>
          </div>

        </form>

        <div className="button-container">
          <button
            type="submit"
            onClick={ this.onClickAddButton }
            className="add-button"
          >
            Adicionar despesa
          </button>
        </div>
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
