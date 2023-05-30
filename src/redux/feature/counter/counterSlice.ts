"use client";

import { CounterState } from "@/types/types";
import { createSlice } from "@reduxjs/toolkit";

const initialState: CounterState = {
  value: 0,
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },

    decrement: (state) => {
      state.value -= 1;
    },

    increaseByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
});

export const { increment, decrement, increaseByAmount } = counterSlice.actions;

export default counterSlice.reducer;
