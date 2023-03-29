import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/userReducer.js";
import logger from "redux-logger";

const store = configureStore({
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  reducer: {
    user: userReducer,
  },
});

export default store;
