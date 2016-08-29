import { combineReducers } from 'redux';
import user from './user';
import other from './other';
import { routerReducer } from './routerReducer';

const reducers = combineReducers({
  user,
  other,
  routerReducer, // this is unneeded unless dealing with custom navigation logic
});

export default reducers;
