import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';

class Table extends Component {
  render() {
    const { expenses } = this.props;
    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
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
                <tr key={ id }>
                  <td>{ description }</td>
                  <td>{ tag }</td>
                  <td>{ method }</td>
                  <td>{ finalValue }</td>
                  <td>{ name }</td>
                  <td>{ exchange }</td>
                  <td>{ convertedValue }</td>
                  <td>{ real }</td>
                  <td>
                    <button type="button">Editar</button>
                    <button type="button">Excluir</button>
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
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Table);
