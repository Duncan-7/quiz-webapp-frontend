import * as actionTypes from './actionTypes';
import axios from '../../axios-instance';

export const createResponseStart = () => {
  return {
    type: actionTypes.CREATE_RESPONSE_START
  };
};

export const createResponseSuccess = (responseData) => {
  return {
    type: actionTypes.CREATE_RESPONSE_SUCCESS,
    response: responseData

  };
};

export const createResponseFail = (error) => {
  return {
    type: actionTypes.CREATE_RESPONSE_FAIL,
    error: error
  };
};

export const createResponseInit = () => {
  return {
    type: actionTypes.CREATE_RESPONSE_INIT
  };
};

export const createResponse = (responseData) => {
  return dispatch => {
    dispatch(createResponseStart());
    axios.post('/quizresponses', responseData)
      .then(response => {
        dispatch(createResponseSuccess(response.data.quizResponse))
      })
      .catch(error => {
        dispatch(createResponseFail(error.response.data.error))
      })
  };
};

export const fetchResponsesStart = () => {
  return {
    type: actionTypes.FETCH_RESPONSES_START
  };
};

export const fetchResponsesSuccess = responses => {
  return {
    type: actionTypes.FETCH_RESPONSES_SUCCESS,
    responses: responses
  };
};

export const fetchResponsesFail = error => {
  return {
    type: actionTypes.FETCH_RESPONSES_FAIL,
    error: error
  };
};

export const fetchResponses = (userId) => {
  return dispatch => {
    dispatch(fetchResponsesStart());
    const url = '/quizresponses';
    axios.get(url + "?id=" + userId)
      .then(response => {
        console.log(response.data.quizResponses)
        dispatch(fetchResponsesSuccess(response.data.quizResponses));
      })
      .catch(error => {
        dispatch(fetchResponsesFail(error.response.data.error));
      })
  }
}