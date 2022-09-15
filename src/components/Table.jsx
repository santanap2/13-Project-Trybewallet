import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { removeExpense, editExpense } from '../redux/actions';
import '../css/Table.css';

class Table extends Component {
  onClickDeleteButton = (id) => {
    const { dispatch } = this.props;
    dispatch(removeExpense(id));
  };

  onClickEditButton = (item) => {
    const { dispatch } = this.props;
    dispatch(editExpense(item));
  };

  render() {
    const { expenses, editor } = this.props;
    return (
      <div className="table-container">
        <table className="main-table">
          <thead>
            <tr className="titles-row">
              <th className="table-title description">Descrição</th>
              <th className="table-title tag">Categoria</th>
              <th className="table-title">Método de pagamento</th>
              <th className="table-title">Valor</th>
              <th className="table-title currency">Moeda</th>
              <th className="table-title">Câmbio utilizado</th>
              <th className="table-title">Valor convertido</th>
              <th className="table-title">Moeda de conversão</th>
              <th className="table-title buttons">Editar/Excluir</th>
            </tr>
          </thead>

          <tbody>
            { expenses.map((item) => {
              const {
                currency,
                description,
                exchangeRates,
                id,
                method,
                tag,
                value,
              } = item;

              const { name, ask } = exchangeRates[currency];
              const exchange = parseFloat(ask).toFixed(2);
              const conversion = item.value * item.exchangeRates[item.currency].ask;
              const convertedValue = parseFloat(conversion).toFixed(2);
              const finalValue = parseFloat(value).toFixed(2);
              const real = 'Real';
              return (
                <tr key={ id } className="item-row">
                  <td className="item-block item-description">{ description }</td>
                  <td className="item-block item-tag">{ tag }</td>
                  <td className="item-block">{ method }</td>
                  <td className="item-block">{ finalValue }</td>
                  <td className="item-block item-currency">{ name }</td>
                  <td className="item-block">{ exchange }</td>
                  <td className="item-block">{ convertedValue }</td>
                  <td className="item-block">{ real }</td>
                  <td className="item-block">
                    <button
                      type="button"
                      data-testid="edit-btn"
                      onClick={ () => this.onClickEditButton(item) }
                      className="edit-delete-button"
                      disabled={ editor }
                    >
                      <img
                        src="https://i.imgur.com/nmWttEL.png"
                        alt="edit-button"
                        className="edit-delete-img"
                      />
                    </button>
                    <button
                      type="button"
                      data-testid="delete-btn"
                      onClick={ () => this.onClickDeleteButton(id) }
                      className="edit-delete-button"
                      disabled={ editor }
                    >
                      <img
                        src="https://i.imgur.com/0tJm1Na.png"
                        alt="delete-button"
                        className="edit-delete-img"
                      />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

Table.propTypes = {
  expenses: propTypes.instanceOf(Array).isRequired,
  dispatch: propTypes.func.isRequired,
  editor: propTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
  idToEdit: state.wallet.idToEdit,
  editor: state.wallet.editor,
});

export default connect(mapStateToProps)(Table);
