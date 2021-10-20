import React, { createContext, useReducer, useEffect } from "react";

import { mainReducer, mainInitialState } from "../reducers/mainReducer";

const Context = createContext();

const Provider = ({ children }) => {
  const [mainData, mainDispatch] = useReducer(mainReducer, mainInitialState);
  const value = {
    mainData,
    mainDispatch,
  };
  // useEffect(() => {
  //   const check_auth = async () => await mainDispatch({ type: "CHECK_AUTH" });
  //   check_auth();
  // }, []);
  return <Context.Provider value={value}>{children}</Context.Provider>;
};

const exp = {
  Provider,
  Consumer: Context,
};

export default exp;
