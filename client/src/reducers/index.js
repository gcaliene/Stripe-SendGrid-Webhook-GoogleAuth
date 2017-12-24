import { combineReducers } from 'redux';
import { reducer as reduxForm } from 'redux-form'; //just because it is confusing to have a variable called reducer all over the place
import authReducer from './authReducer';
import surveysReducer from './surveysReducer';

export default combineReducers({
  auth: authReducer,
  form: reduxForm,
  surveys: surveysReducer
});
