import React from "react";
import { combineReducers } from "redux";
import { reducer } from "./Reducer";

export const rootReducer = () => {
  return combineReducers({ reducer });
};
