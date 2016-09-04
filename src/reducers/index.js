import { combineReducers } from 'redux';
import user from './user';
import other from './other';

const reducers = combineReducers({
  user,
  other,
});

export default reducers;
