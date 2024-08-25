import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer from "../slice";
import {
  getReduxStateFromLocalStorage,
  saveReduxStateToLocalStorage,
} from "../persist";

export const store = configureStore({
  reducer: {
    auth: authSliceReducer,
  },
  preloadedState: getReduxStateFromLocalStorage(),
});

store.subscribe(() => saveReduxStateToLocalStorage(store.getState()));
