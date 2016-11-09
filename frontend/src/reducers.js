import combineReducers from 'redux/lib/combineReducers';
import { reducer as formReducer } from 'redux-form';
import profile from './authentication/lAuthReducer';
import landing from './landingBoard/lLandingReducer';
import create from './create/lCreateReducer';

const reducers = combineReducers({
  form: formReducer,
  profile,
  landing,
  create,
});

export default reducers;
