import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
  templates: [],
  loading: false,
  created: false,
  error: null
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CREATE_TEMPLATE_INIT:
      return updateObject(state, { created: false });
    case actionTypes.CREATE_TEMPLATE_START:
      return updateObject(state, { loading: true });
    case actionTypes.CREATE_TEMPLATE_FAIL:
      return updateObject(state, { loading: false, error: action.error });
    case actionTypes.CREATE_TEMPLATE_SUCCESS:
      return updateObject(state, {
        created: true,
        loading: false,
        error: null,
        templates: state.templates.concat(action.template)
      });
    default:
      return state;
  }

};

export default reducer;