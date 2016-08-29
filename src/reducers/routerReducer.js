import { Reducer } from 'react-native-router-flux';

const routerReducer = Reducer({ initialState: { key: true }, scenes: true });

export default (state = null, action) => {
  if (action.type === 'RootContainerInitialAction') {
    return action.initialState;
  }
  return routerReducer(state, action);
};
