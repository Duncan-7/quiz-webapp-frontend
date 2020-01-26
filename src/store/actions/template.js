import * as actionTypes from './actionTypes';
import axios from '../../axios-instance';

export const createTemplateStart = () => {
  return {
    type: actionTypes.CREATE_TEMPLATE_START
  };
};

export const createTemplateSuccess = (templateData) => {
  return {
    type: actionTypes.CREATE_TEMPLATE_SUCCESS,
    template: templateData

  };
};

export const createTemplateFail = (error) => {
  return {
    type: actionTypes.CREATE_TEMPLATE_FAIL,
    error: error
  };
};

export const createTemplateInit = () => {
  return {
    type: actionTypes.CREATE_TEMPLATE_INIT
  };
};

export const createTemplate = (templateData) => {
  return dispatch => {
    dispatch(createTemplateStart());
    axios.post('/quiztemplates', templateData)
      .then(response => {
        console.log(response.data);
        dispatch(createTemplateSuccess(response.data))
      })
      .catch(error => {
        console.log(error.response)
        dispatch(createTemplateFail(error.response.data.error))
      })
  };
};