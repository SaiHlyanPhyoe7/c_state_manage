"use client";

import { configureStore } from "@reduxjs/toolkit";

import counterReducer from "./feature/counter/counterSlice";
import authReducer from "./feature/auth/loginSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
