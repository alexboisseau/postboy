import { configureStore } from "@reduxjs/toolkit";
import currentRequestReducer from "./features/currentRequest/currentRequestSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      currentRequest: currentRequestReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
export type AppGetState = AppStore["getState"];
