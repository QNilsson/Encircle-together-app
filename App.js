import React from 'react';

import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';

import calendarReducer from './store/reducers/calendar';

const rootReducer = combineReducers({
  calendar: calendarReducer
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