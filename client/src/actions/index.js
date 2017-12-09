import axios from 'axios';
import { FETCH_USER } from './types';

const fetchUser = () => {
  return function(dispatch) {
    //redux thunk will see a return function and call the dispatch
    axios
      .get('/api/current_user')
      .then(res => dispatch({ type: FETCH_USER, payload: res }));
  };
};
