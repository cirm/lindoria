import { combineReducers } from 'redux-immutable';
import { reducer as formReducer } from 'redux-form/immutable';
import profile from './authentication/lAuthReducer';
import landing from './landingBoard/lLandingReducer';
import create from './create/lCreateReducer';
import data from './data/lDataReducer';

const reducers = combineReducers({
  form: formReducer,
  profile,
  data,
  landing,
  create,
});

export default reducers;
