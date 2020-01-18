import React from 'react';

import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';

import calendarReducer from './store/reducers/calendar';

const rootReducer = combineReducers({
  calendar: calendarReducer
});

const store = createStore(rootReducer);

import AppNavigator from './navigation/AppNavigator';

export default function App() {
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
};