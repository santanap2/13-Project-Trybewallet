import { FETCH_REQUEST, FETCH_SUCCESS, FETCH_FAILURE } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  isFetching: false,
  error: '',
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

  default: return state;
  }
};

export default wallet;
