import React from 'react';

import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';

import locationReducer from './store/reducers/Location';

const rootReducer = combineReducers({
  location: locationReducer
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

import AppNavigator from './navigation/AppNavigator';

export default function App() {
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
};