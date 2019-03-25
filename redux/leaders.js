import * as ActionTypes from './ActionTypes';

const initialState = {
  isLoading: true,
  errMess: null,
  leaders: []
}

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.ADD_LEADERS:
      return { ...state, isLoading: false, errMess: null, leaders: payload };
    case ActionTypes.LEADERS_LOADING:
      return { ...state, isLoading: true, errMess: null, leaders: [] }
    case ActionTypes.LEADERS_FAILED:
      return { ...state, isLoading: false, errMess: payload };
    default:
      return state
  }
}
