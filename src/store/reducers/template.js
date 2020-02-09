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
    case actionTypes.UPDATE_TEMPLATE_FAIL:
      return updateObject(state, { error: action.error });
    case actionTypes.UPDATE_TEMPLATE_SUCCESS:
      const oldTemplateIndex = state.templates.findIndex(template => template._id === action.updatedTemplate._id);
      const updatedTemplateArray = [...state.templates];
      updatedTemplateArray[oldTemplateIndex] = action.updatedTemplate;
      return updateObject(state, {
        error: null,
        templates: updatedTemplateArray,
        created: true
      });
    case actionTypes.FETCH_TEMPLATES_START:
      return updateObject(state, { loading: true });
    case actionTypes.FETCH_TEMPLATES_FAIL:
      return updateObject(state, { loading: false, error: action.error });
    case actionTypes.FETCH_TEMPLATES_SUCCESS:
      return updateObject(state, {
        templates: action.templates,
        loading: false
      });
    default:
      return state;
  };

};

export default reducer;