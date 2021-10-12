import React, { createContext, useReducer, useEffect } from "react";

import { mainReducer, mainInitialState } from "../reducers/mainReducer";

const Context = createContext();

const Provider = ({ children }) => {
  const [mainData, mainDispatch] = useReducer(mainReducer, mainInitialState);
  const value = {
    mainData,
    mainDispatch,
  };
  useEffect(() => {
    mainDispatch({ type: "CHECK_AUTH" });
  }, []);
  return <Context.Provider value={value}>{children}</Context.Provider>;
};

const exp = {
  Provider,
  Consumer: Context,
};

export default exp;
