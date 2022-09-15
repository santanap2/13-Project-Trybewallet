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

  componentDidMount() {
    const { expenseBeingEdited } = this.props;
    const {
      value, description, currency, method, tag, exchangeRates,
    } = expenseBeingEdited;
    this.setState({
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates,
    });
  }

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
        <form className="main-form">

          <div className="first-form-row">
            <label htmlFor="description">
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

            <label htmlFor="tag">
              <span>Categoria da despesa</span>
              <select
                name="tag"
                data-testid="tag-input"
                value={ type }
                onChange={ this.inputHandler }
                id="tag"
                className="tag-input"
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
            type="button"
            onClick={ () => this.onClickEditButton() }
            className="add-button"
          >
            Editar despesa
          </button>
        </div>
      </div>
    );
  }
}

ExpenseEditor.propTypes = {
  dispatch: propTypes.func.isRequired,
  currencies: propTypes.instanceOf(Array).isRequired,
  idToEdit: propTypes.number.isRequired,
  expenses: propTypes.instanceOf(Array).isRequired,
  expenseBeingEdited: propTypes.shape({
    value: propTypes.string.isRequired,
    description: propTypes.string.isRequired,
    currency: propTypes.string.isRequired,
    method: propTypes.string.isRequired,
    tag: propTypes.string.isRequired,
    exchangeRates: propTypes.shape({}).isRequired,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
  idToEdit: state.wallet.idToEdit,
  expenseBeingEdited: state.wallet.expenseBeingEdited,
});

export default connect(mapStateToProps)(ExpenseEditor);
