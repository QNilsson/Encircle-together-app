import React from 'react';

import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';

import * as Font from 'expo-font';
// imports event store reducer
import eventReducer from './store/reducers/Event';
// imports resource store reducer
import resourceReducer from './store/reducers/Resource';

const rootReducer = combineReducers({
  events: eventReducer,
  resources: resourceReducer
});

// allows for async dispatch
const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

// loads app with custom font
const componentDidMount = () => {
  Font.loadAsync({
    'ModernoFB': require('./assets/fonts/ModernoFB-Semibold.otf'),
    'Futura-Light': require('./assets/fonts/Futura-Light.ttf'),
    'Futura-Book': require('./assets/fonts/Futura-Book.ttf'),
    'Futura-Medium': require('./assets/fonts/Futura-Medium.ttf'),
    'Futura-Bold': require('./assets/fonts/Futura-Bold.ttf'),
  });
};

// imports app navigation (https://reactnavigation.org/)
import AppNavigator from './navigation/AppNavigator';

export default function App() {
  componentDidMount();
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
};
