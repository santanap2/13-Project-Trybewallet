import {
  FETCH_REQUEST,
  FETCH_SUCCESS,
  FETCH_FAILURE,
  SAVE_EXPENSE,
  REMOVE_EXPENSE,
} from '../actions';

const INITIAL_STATE = {
  currencies: [],
  isFetching: false,
  error: '',
  expenses: [],
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case FETCH_REQUEST:
    return {
      ...state,
      isFetching: true,
    };

  case FETCH_SUCCESS:
    return {
      ...state,
      currencies: action.currencies,
      isFetching: false,
    };

  case FETCH_FAILURE:
    return {
      ...state,
      error: action.error,
    };

  case SAVE_EXPENSE:
    return {
      ...state,
      expenses: [...state.expenses, action.expenses],
    };

  case REMOVE_EXPENSE:
    return {
      ...state,
      expenses: state.expenses.filter((item) => item.id !== action.id),
    };

  default: return state;
  }
};

export default wallet;
