import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { saveNewExpenses } from '../redux/actions';
import requestExchange from '../services/requestExchange';

class ExpenseEditor extends Component {
  state = {
    value: '',
    description: '',
    currency: 'USD',
    method: 'Cartão de crédito',
    tag: 'Alimentação',
    exchangeRates: {},
  };

  inputHandler = ({ target }) => {
    this.setState({
      [target.name]: target.value,
    });
  };

  onClickEditButton = async () => {
    const resultExchange = await requestExchange();
    this.setState({ exchangeRates: resultExchange }, () => {
      const { value, description, currency, method, tag, exchangeRates } = this.state;
      const { dispatch, idToEdit, expenses } = this.props;
      const updatedExpenses = expenses.map((item) => {
        if (item.id === idToEdit) {
          return {
            ...item, value, description, currency, method, tag, exchangeRates };
        }
        return item;
      });
      dispatch(saveNewExpenses(updatedExpenses));
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
            type="button"
            onClick={ () => this.onClickEditButton() }
          >
            Editar despesa
          </button>
        </form>
      </div>
    );
  }
}

ExpenseEditor.propTypes = {
  dispatch: propTypes.func.isRequired,
  currencies: propTypes.instanceOf(Array).isRequired,
  idToEdit: propTypes.number.isRequired,
  expenses: propTypes.instanceOf(Array).isRequired,
};

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
  idToEdit: state.wallet.idToEdit,
});

export default connect(mapStateToProps)(ExpenseEditor);
