import React from 'react';

// import { createStore, combineReducers } from 'redux';
// import { Provider } from 'react-redux';

//import appReducer from './store/reducers/file.js';

// const rootReducer = combineReducers({
//   reducer: appReducer
// });

// const store = createStore(rootReducer);

import AppNavigator from './navigation/AppNavigator';

export default function App() {
  return (
    // <Provider store={store}><View></View></Provider>
    <AppNavigator />
  );
};