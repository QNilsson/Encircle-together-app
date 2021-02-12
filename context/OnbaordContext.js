import React, { useState, createContext } from "react";
import { useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";

// imports store actions to dispatch
import * as eventActions from "../store/actions/Event";

export const Onboard = createContext({
  firstOpen: false,
  house: "",
  setChoice: () => {},
  loadData: () => {},
});

const OnboardProvider = (props) => {
  const [firstOpen, setFirstOpen] = useState(true);
  const [house, setHouse] = useState(null);

  const dispatch = useDispatch();

  const storeData = async (_house, _firstOpen) => {
    let data = {
      house: _house,
      firstOpen: _firstOpen,
    };
    data = JSON.stringify(data);
    try {
      await AsyncStorage.setItem("@storagekey", data);
    } catch (e) {
      console.log(e);
    }
  };
  const retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem("@storagekey");
      if (value != null) {
        setFirstOpen(value.firstOpen);
        setHouse(value.house);
        console.log(value);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const loadData = () => {
    retrieveData();
  };
  const setChoice = (choice) => {
    debugger;
    if (choice === "Provo") {
      dispatch(eventActions.fetchProvoEvents(choice));
      dispatch(eventActions.fetchTodaysEvents(choice));
    } else if (choice === "Salt Lake City") {
      dispatch(eventActions.fetchSlcEvents(choice));
      dispatch(eventActions.fetchTodaysEvents(choice));
    } else if (choice === "St George") {
      dispatch(eventActions.fetchProvoEvents(choice));
      dispatch(eventActions.fetchTodaysEvents(choice));
    }
    storeData(choice, false);
    setHouse(choice);
    setFirstOpen(false);
  };
  return (
    <Onboard.Provider
      value={{
        firstOpen: firstOpen,
        house: house,
        setChoice: setChoice,
        loadData: loadData,
      }}
    >
      {props.children}
    </Onboard.Provider>
  );
};
export default OnboardProvider;
