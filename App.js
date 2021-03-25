import React from "react";

import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import ReduxThunk from "redux-thunk";
import GeneralStatusBarColor from "./components/GeneralStatusBarColor";

import * as Font from "expo-font";
// imports event store reducer
import eventReducer from "./store/reducers/Event";
// imports resource store reducer
import resourceReducer from "./store/reducers/Resource";

const rootReducer = combineReducers({
  events: eventReducer,
  resources: resourceReducer,
});

// allows for async dispatch
const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

const fonts = {
  "Clarendon-Regular": require("./assets/fonts/clarendon.otf"),
  "Clarendon-Italic": require("./assets/fonts/clarendon-italic.otf"),
  "Clarendon-Bold": require("./assets/fonts/clarendon-bold.otf"),
  "Clarendon-Bold-Italic": require("./assets/fonts/clarendon-bold-italic.otf"),
  "Din-Regular": require("./assets/fonts/din.otf"),
  "Din-Bold": require("./assets/fonts/din-bold.otf"),
  "Garamond-Regular": require("./assets/fonts/garamond.otf"),
  "Garamond-Bold": require("./assets/fonts/garamond-bold.otf"),
  "Garamond-Italic": require("./assets/fonts/garamond-italic.otf"),
  "Garamond-Bold-Italic": require("./assets/fonts/garamond-bold-italic.otf"),
};

// loads app with custom font
const componentDidMount = async () => {
  await Font.loadAsync(fonts);
};

// imports app navigation (https://reactnavigation.org/)
import AppNavigator from "./navigation/AppNavigator";

export default function App() {
  componentDidMount();
  return (
    <Provider store={store}>
        <GeneralStatusBarColor
          backgroundColor="black"
          barStyle="light-content"
        />
        <AppNavigator />
    </Provider>
  );
}
