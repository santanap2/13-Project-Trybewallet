import requestAPI from '../../services/RequestAPI';

export const LOGIN = 'Login is done';
export const loginDone = ({ email }) => ({ type: LOGIN, email });

export const FETCH_REQUEST = 'Fetch Request';
export const fetchRequest = () => ({
  type: FETCH_REQUEST,
});

export const FETCH_SUCCESS = 'Fetch Succeed';
export const fetchSuccess = (state) => ({
  type: FETCH_SUCCESS,
  currencies: state,
});

export const FETCH_FAILURE = 'Fetch Failed';
export const fetchFailure = (error) => ({
  type: FETCH_FAILURE,
  error,
});

export const fetchCurrencies = () => async (dispatch) => {
  dispatch(fetchRequest());
  try {
    const response = await requestAPI();
    dispatch(fetchSuccess(response));
  } catch (error) {
    dispatch(fetchFailure(error));
  }
};

export const SAVE_EXPENSE = 'Save expenses';
export const saveExpense = (state) => ({
  type: SAVE_EXPENSE,
  expenses: state,
});
