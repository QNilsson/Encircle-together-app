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

// loads app with custom font
const componentDidMount = () => {
  Font.loadAsync({
    ModernoFB: require("./assets/fonts/ModernoFB-Semibold.otf"),
    "Futura-Light": require("./assets/fonts/Futura-Light.ttf"),
    "Futura-Book": require("./assets/fonts/Futura-Book.ttf"),
    "Futura-Medium": require("./assets/fonts/Futura-Medium.ttf"),
    "Futura-Bold": require("./assets/fonts/Futura-Bold.ttf"),
    // "Claredon-Pro-Bold-Italic": require("./assets/fonts/Clarendon Text Pro Bold Italic.otf"),
    // "Claredon-Pro-Italic": require("./assets/fonts/Clarendon Text Pro Italic.otf"),
    // "Claredon-Pro-Reg": require("./assets/fonts/Clarendon Text Pro Reg.otf"),
    // "Claredon-Pro-Bold": require("./assets/fonts/Clarendon Text Pro Bold.otf"),
    // "DIN-Condensed-Reg": require("./assets/fonts/DIN Condensed Reg.otf"),
    // "Garamond-Pro-Bold-Italic": require("./assets/fonts/Garamond Premier Pro Bold Italic.otf"),
    // "Garamond-Pro-Bold": require("./assets/fonts/Garamond Premier Pro Bold.otf"),
    // "Garamond-Pro-Italic": require("./assets/fonts/Garamond Premier Pro Italic.otf"),
    // "Garamond-Pro-Medium-Italic": require("./assets/fonts/Garamond Premier Pro Medium Italic.otf"),
    // "Garamond-Pro-Medium": require("./assets/fonts/Garamond Premier Pro Medium.otf"),
    // "Garamond-Pro-Reg": require("./assets/fonts/Garamond Premier Pro Reg.otf"),
    // "Garamond-Pro-Semibold-Italic": require("./assets/fonts/Garamond Premier Pro Semibold Italic.otf"),
    // "Garamond-Pro-Semibold": require("./assets/fonts/Garamond Premier Pro Semibold.otf"),
  });
};

// imports app navigation (https://reactnavigation.org/)
import AppNavigator from "./navigation/AppNavigator";

export default function App() {
  componentDidMount();
  return (
    <Provider store={store}>
      <GeneralStatusBarColor backgroundColor="black" barStyle="light-content" />
      <AppNavigator />
    </Provider>
  );
}
