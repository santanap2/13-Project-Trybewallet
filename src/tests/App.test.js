import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen, waitFor } from '@testing-library/react';
import renderWithRouterAndRedux from './helpers/renderWith';
import App from '../App';

describe('Testa a aplicação Trybewallet na página de Login', () => {
  const emailID = 'email-input';
  const passwordID = 'password-input';
  const correctEmail = 'emailCorreto@gmail.com';

  it('Testa se a tela de login é renderizada corretamtente', () => {
    // pagina carrega
    renderWithRouterAndRedux(<App />);
    const emailInput = screen.getByTestId(emailID);
    const passwordInput = screen.getByTestId(passwordID);
    const loginButton = screen.getByRole('button', { name: /entrar/i });

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
  });

  it('Testa se o botão inicia desabilitado e é habilitado ao digitar corretamente nos inputs', () => {
    renderWithRouterAndRedux(<App />);
    const loginButton = screen.getByRole('button', { name: /entrar/i });
    const emailInput = screen.getByTestId(emailID);
    const passwordInput = screen.getByTestId(passwordID);

    // pagina carrega
    expect(loginButton).toBeDisabled();

    // digita email e senha errados
    userEvent.type(emailInput, 'emailErrado');
    userEvent.type(passwordInput, '12345');

    expect(loginButton).toBeDisabled();

    // digita email e senha corretamente
    userEvent.type(emailInput, correctEmail);
    userEvent.type(passwordInput, '123456');

    expect(loginButton).not.toBeDisabled();
  });

  it('Testa se ao clicar no botão Entrar as informações são salvas no estado global', () => {
    const { store, history } = renderWithRouterAndRedux(<App />);
    const emailInput = screen.getByTestId(emailID);
    const passwordInput = screen.getByTestId(passwordID);
    const loginButton = screen.getByRole('button', { name: /entrar/i });

    userEvent.type(emailInput, correctEmail);
    userEvent.type(passwordInput, '123456');
    userEvent.click(loginButton);

    const { user: { email } } = store.getState();
    const { location: { pathname } } = history;

    expect(email).toBe(correctEmail);
    expect(pathname).toBe('/carteira');
  });
});

describe('Testa a aplicação Trybewallet na página da Carteira', () => {
  const valueID = 'value-input';
  const descriptionID = 'description-input';
  const initialState = {
    user: {
      email: '',
    },
    wallet: {
      currencies: ['USD', 'CAD', 'GBP', 'ARD', 'BTC', 'LTC', 'EUR', 'JPY', 'CHF', 'AUD', 'CNY', 'ILS', 'ETH', 'XRP', 'DOGE'],
      expenses: [],
      editor: false,
      idToEdit: 0,
    },
  };

  it('Testa se os inputs funcionam corretamente', () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'], initialState });
    const valueInput = screen.getByTestId(valueID);
    const descriptionInput = screen.getByTestId(descriptionID);

    userEvent.type(valueInput, '10');
    userEvent.type(descriptionInput, 'teste');

    expect(valueInput.value).toBe('10');
    expect(descriptionInput.value).toBe('teste');
  });

  it('Testa se as informações são salvas no estado global', async () => {
    const { store } = renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });

    const valueInput = screen.getByTestId(valueID);
    const descriptionInput = screen.getByTestId(descriptionID);
    const addButton = screen.getByRole('button', { name: /adicionar despesa/i });

    userEvent.type(valueInput, '10');
    userEvent.type(descriptionInput, 'teste');
    userEvent.click(addButton);

    await waitFor(() => {
      expect(store.getState().wallet.expenses.length).toBe(1);
    });
  });
});

describe('Testa o componente Table da aplicação Trybewallet', () => {
  it('Testa se o botão de editar funciona corretamente', async () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });

    const addButton = screen.getByRole('button', { name: /adicionar despesa/i });
    userEvent.click(addButton);

    await waitFor(() => {
      const editButton = screen.getByRole('button', { name: 'Editar' });
      userEvent.click(editButton);

      const editExpenseButton = screen.getByRole('button', { name: /editar despesa/i });
      expect(editExpenseButton).toBeInTheDocument();
    });
  });

  it('Testa se o botão de excluir funciona corretamente', async () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });

    const addButton = screen.getByRole('button', { name: /adicionar despesa/i });
    userEvent.click(addButton);

    await waitFor(() => {
      const deleteButton = screen.getByRole('button', { name: 'Excluir' });
      userEvent.click(deleteButton);

      expect(deleteButton).not.toBeInTheDocument();
    });
  });
});

describe('Testa o componente ExpenseEditor da aplicação Trybewallet', () => {
  jest.setTimeout(10000);
  it('Testa se é possível editar uma despesa', async () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });

    const addButton = screen.getByRole('button', { name: /adicionar despesa/i });
    const value = screen.getByTestId('value-input');
    const description = screen.getByTestId('description-input');

    userEvent.type(value, '10');
    userEvent.type(description, 'teste 1');
    userEvent.click(addButton);

    await waitFor(async () => {
      userEvent.type(value, '20');
      userEvent.type(description, 'teste 2');
      userEvent.click(addButton);

      await waitFor(async () => {
        const editButtonArray = screen.getAllByRole('button', { name: 'Editar' });
        userEvent.click(editButtonArray[0]);

        const editExpenseButton = screen.getByRole('button', { name: /editar despesa/i });
        userEvent.type(description, 'testando 1');
        userEvent.click(editExpenseButton);

        await waitFor(() => {
          const expense1 = screen.getByText('testando 1');
          const expense2 = screen.getByText('teste 2');

          expect(expense1).toBeInTheDocument();
          expect(expense2).toBeInTheDocument();
        });
      });
    });
  });

  // it('Testa', async () => {
  //   const { store } = renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });

  //   const addButton = screen.getByRole('button', { name: /adicionar despesa/i });
  //   userEvent.click(addButton);

  //   await waitFor(async () => {
  //     userEvent.click(addButton);

  //     await waitFor(async () => {
  //       const editButtonArray = screen.getAllByRole('button', { name: 'Editar' });
  //       userEvent.click(editButtonArray[0]);

  //       const editButtonForm = screen.getByRole('button', { name: 'Editar despesa' });
  //       userEvent.click(editButtonForm);

  //       await waitFor(() => {
  //         console.log(store.getState().wallet.expenses);
  //       });
  //     });
  //   });
  // });
});
