import * as ActionTypes from './ActionTypes';

const initialState = {
  errMess: null, comments: []
}
export default (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.ADD_COMMENTS:
      return { ...state, errMess: null, comments: payload };
    case ActionTypes.COMMENTS_FAILED:
      return { ...state, errMess: payload };
    default:
      return state;
  }
}
