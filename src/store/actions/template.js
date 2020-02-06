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

export const fetchTemplatesStart = () => {
  return {
    type: actionTypes.FETCH_TEMPLATES_START
  };
};

export const fetchTemplatesSuccess = templates => {
  return {
    type: actionTypes.FETCH_TEMPLATES_SUCCESS,
    templates: templates
  };
};

export const fetchTemplatesFail = error => {
  return {
    type: actionTypes.FETCH_TEMPLATES_FAIL,
    error: error
  };
};

export const fetchTemplates = (isAdmin) => {
  return dispatch => {
    dispatch(fetchTemplatesStart());
    const url = isAdmin ? '/quiztemplates' : '/quiztemplates/live';
    axios.get(url)
      .then(response => {
        dispatch(fetchTemplatesSuccess(response.data.quizTemplates));
      })
      .catch(error => {
        dispatch(fetchTemplatesFail(error.response.data.error));
      })
  }
}