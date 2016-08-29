import React, { Component } from 'react';
import { AppRegistry, AsyncStorage, View, StyleSheet, ActivityIndicator, Navigator } from 'react-native';
import { Scene, Router } from 'react-native-router-flux';
import { Provider } from 'react-redux';
import { createStore, compose } from 'redux';
import { persistStore, autoRehydrate } from 'redux-persist';

import Reactotron from 'reactotron';
import Login from './src/containers/Login';
import FindOther from './src/containers/FindOther';
import Review from './src/containers/Review';
import reducers from './src/reducers';

Reactotron.connect({ enabled: __DEV__ });

const enhancer = compose(
  Reactotron.storeEnhancer(),
  autoRehydrate()
);

console.ignoredYellowBox = [
  'Warning: You are manually calling a React.PropTypes validation',
];

const store = createStore(reducers, {}, enhancer);
if (module.hot) {
  module.hot.accept(() => store.replaceReducer(reducers));
}
Reactotron.addReduxStore(store);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#c62828',
  },
});

class LoveBank extends Component {
  constructor() {
    super();
    this.state = { rehydrated: false };
  }

  componentWillMount() {
    persistStore(store, { storage: AsyncStorage }, (err, state) => {
      this.setState({ rehydrated: true, ...state });
    });
  }


  render() {
    if (!this.state.rehydrated) {
      return (
        <View style={styles.container}>
          <ActivityIndicator color="#fff" size="large" animating />
        </View>
      );
    }
    return (<Provider store={store}>
      <Router>
        <Scene key="root">
          <Scene
            key="login"
            title="Login"
            initial={this.state.user ? false : true}
            hideNavBar
            component={Login}
          />
          <Scene
            key="findother"
            title="FindOther"
            initial={this.state.user && !this.state.other ? true : false}
            hideNavBar
            component={FindOther}
          />
          <Scene
            key="review"
            hideNavBar={false}
            navigationBarStyle={{ backgroundColor: '#c62828' }}
            titleStyle={{ color: '#fff' }}
            sceneStyle={{ paddingTop: Navigator.NavigationBar.Styles.General.TotalNavHeight - 2 }}
            title="Love Treasury"
            initial={this.state.user && this.state.other ? true : false}
            component={Review}
          >
          </Scene>
        </Scene>
      </Router>
    </Provider>);
  }
}

AppRegistry.registerComponent('LoveBank', () => LoveBank);
