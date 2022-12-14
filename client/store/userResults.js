import axios from 'axios';
import history from '../history';

// action types
const SET_USER_RESULTS = 'SET_USER_RESULTS';

// action creators
export const setUserResults = (userResults) => {
  return {
    type: SET_USER_RESULTS,
    userResults,
  };
};

// Thunk creators
export const getUserResults = (token) => {
  return async (dispatch) => {
    const { data } = await axios.get('/api/users/user/results', {
      headers: { authorization: token },
    });
    dispatch(setUserResults(data));
  };
};

export default function userResults(state = [], action) {
  switch (action.type) {
    case SET_USER_RESULTS:
      return action.userResults;
    default:
      return state;
  }
}
