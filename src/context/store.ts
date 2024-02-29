import { configureStore } from "@reduxjs/toolkit";
import requestResponseReducer from "./features/requestResponse/requestResponseSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      requestResponse: requestResponseReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
