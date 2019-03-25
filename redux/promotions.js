import * as ActionTypes from './ActionTypes';

const initialState = {
  isLoading: true,
  errMess: null,
  promotions: []
}

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.ADD_PROMOS:
      return { ...state, isLoading: false, errMess: null, promotions: payload };
    case ActionTypes.PROMOS_LOADING:
      return { ...state, isLoading: true, errMess: null, promotions: [] }
    case ActionTypes.PROMOS_FAILED:
      return { ...state, isLoading: false, errMess: payload };
    default:
      return state
  }
}
