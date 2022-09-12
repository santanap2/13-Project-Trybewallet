import {
  FETCH_REQUEST,
  FETCH_SUCCESS,
  FETCH_FAILURE,
  SAVE_EXPENSE,
  REMOVE_EXPENSE,
  EDIT_EXPENSE,
  SAVE_NEW_EXPENSES,
} from '../actions';

const INITIAL_STATE = {
  currencies: [],
  isFetching: false,
  error: '',
  expenses: [],
  editor: false,
  idToEdit: 0,
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

  case EDIT_EXPENSE:
    return {
      ...state,
      editor: action.editor,
      idToEdit: action.idToEdit,
    };

  case SAVE_NEW_EXPENSES:
    return {
      ...state,
      editor: false,
      idToEdit: '',
      expenses: action.expenses,
    };

  default: return state;
  }
};

export default wallet;
