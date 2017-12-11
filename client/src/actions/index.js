import axios from 'axios';
import { FETCH_USER } from './types';

//Using promises
// export const fetchUser = () => {
//   return function(dispatch) {
//     //redux thunk will see a return function and call the dispatch
//     axios
//       .get('/api/current_user')
//       .then(res => dispatch({ type: FETCH_USER, payload: res }));
//   };
// };

//Using es2017 with await/async
export const fetchUser = () => async dispatch => {
  const res = await axios.get('/api/current_user');
  dispatch({ type: FETCH_USER, payload: res.data }); //this is the action going to the authReducer
};

//refactored even further
// export const fetchUser = () => async dispatch =>
//   dispatch({type: FETCH_USER, payload: await axios.get('/api/current_user')});

export const handleToken = token => async dispatch => {
  const res = await axios.post('/api/stripe', token);
  dispatch({ type: FETCH_USER, payload: res.data });
};
