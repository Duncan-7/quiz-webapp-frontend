import * as actionTypes from './actionTypes';
import * as actions from './index';
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
        dispatch(createResponseSuccess(response.data.quizResponse));
      })
      .catch(error => {
        dispatch(createResponseFail(error.response.data.error));
      })
  };
};

export const updateResponseSuccess = (response) => {
  return {
    type: actionTypes.UPDATE_RESPONSE_SUCCESS,
    updatedResponse: response
  }
}

export const updateResponseFail = (error) => {
  return {
    type: actionTypes.UPDATE_RESPONSE_FAIL,
    error: error
  };
};

export const updateResponse = (responseId, updateData, userId) => {
  return dispatch => {
    axios.put('/quizresponses/' + responseId, updateData)
      .then(response => {
        dispatch(updateResponseSuccess(response.data.quizResponse));
        //if we updated resultsViewed, get user data and update balance to reflect any winnings
        if (updateData.resultsViewed) {
          dispatch(actions.getUserData(userId));
        }
      })
      .catch(error => {
        dispatch(updateResponseFail(error.response.data.error));
      })
  }
}

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
        dispatch(fetchResponsesSuccess(response.data.quizResponses));
      })
      .catch(error => {
        dispatch(fetchResponsesFail(error.response.data.error));
      })
  }
}