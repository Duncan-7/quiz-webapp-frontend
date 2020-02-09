import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
  responses: [],
  loading: false,
  created: false,
  error: null
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CREATE_RESPONSE_INIT:
      return updateObject(state, { created: false });
    case actionTypes.CREATE_RESPONSE_START:
      return updateObject(state, { loading: true });
    case actionTypes.CREATE_RESPONSE_FAIL:
      return updateObject(state, { loading: false, error: action.error });
    case actionTypes.CREATE_RESPONSE_SUCCESS:
      return updateObject(state, {
        created: true,
        loading: false,
        error: null,
        responses: state.responses.concat(action.response)
      });
    case actionTypes.UPDATE_RESPONSE_FAIL:
      return updateObject(state, { error: action.error });
    case actionTypes.UPDATE_RESPONSE_SUCCESS:
      const oldResponseIndex = state.responses.findIndex(response => response._id === action.updatedResponse._id);
      const updatedResponseArray = [...state.responses];
      updatedResponseArray[oldResponseIndex] = action.updatedResponse;
      console.log(updatedResponseArray)
      return updateObject(state, {
        error: null,
        responses: updatedResponseArray
      });
    case actionTypes.FETCH_RESPONSES_START:
      return updateObject(state, { loading: true });
    case actionTypes.FETCH_RESPONSES_FAIL:
      return updateObject(state, { loading: false, error: action.error });
    case actionTypes.FETCH_RESPONSES_SUCCESS:
      return updateObject(state, {
        responses: action.responses,
        loading: false
      });
    default:
      return state;
  };

};

export default reducer;