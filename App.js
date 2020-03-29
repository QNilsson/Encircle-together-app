import React from 'react';

import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';

import * as Font from 'expo-font';
import locationReducer from './store/reducers/Location';
import eventReducer from './store/reducers/Event';

const rootReducer = combineReducers({
  location: locationReducer,
  event: eventReducer
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

const componentDidMount = () => {
  Font.loadAsync({
    'ModernoFB': require('./assets/fonts/ModernoFB-Semibold.otf'),
    'Futura-Light': require('./assets/fonts/Futura-Light.ttf'),
    'Futura-Book': require('./assets/fonts/Futura-Book.ttf'),
    'Futura-Medium': require('./assets/fonts/Futura-Medium.ttf'),
    'Futura-Bold': require('./assets/fonts/Futura-Bold.ttf'),
  });
};

import AppNavigator from './navigation/AppNavigator';

export default function App() {
  componentDidMount();
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
};
