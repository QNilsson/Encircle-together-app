import React, { useState, createContext } from "react";
import { AsyncStorage } from "react-native";

export const Onboard = createContext({
  firstOpen: false,
  house: "",
  setHouse: () => {},
  loadData: () => {},
});

const OnboardProvider = (props) => {
  const [firstOpen, setFirstOpen] = useState(true);
  const [house, setHouse] = useState(null);
  const [data, setData] = useState();

  const storeData = async (_house, _firstOpen) => {
    const storeKey = {
      firstOpen: _firstOpen,
      house: _house,
    };
    setHouse();
    try {
      await AsyncStorage.setItem(storeKey, "I like to save it.");
    } catch (error) {
      console.log(error);
    }
  };
  const retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem(storeKey);
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
    storeData(choice, false);
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
