"use client";

import { configureStore } from "@reduxjs/toolkit";

import counterReducer from "./feature/counter/counterSlice";
import authReducer from "./feature/auth/loginSlice";
import teamReducer from "./feature/team/teamSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    auth: authReducer,
    team: teamReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
