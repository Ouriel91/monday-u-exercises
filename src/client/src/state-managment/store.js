import { configureStore } from "@reduxjs/toolkit";
import thunkMiddleware from "redux-thunk";
import allReducers from "./reducers";
import {loggerMiddleware} from "./middleware/logger"

export const store = configureStore({
  reducer: allReducers,
  middleware: [thunkMiddleware,loggerMiddleware],
  preloadedState: {}
});