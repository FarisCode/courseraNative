import * as ActionTypes from './ActionTypes';

const initialState = {
  isLoading: true,
  errMess: null,
  dishes: []
}

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.ADD_DISHES:
      return { ...state, isLoading: false, errMess: null, dishes: payload };
    case ActionTypes.DISHES_LOADING:
      return { ...state, isLoading: true, errMess: null, dishes: [] }
    case ActionTypes.DISHES_FAILED:
      return { ...state, isLoading: false, errMess: payload };
    default:
      return state;
  }
}
