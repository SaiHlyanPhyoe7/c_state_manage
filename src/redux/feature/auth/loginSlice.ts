import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  username: string;
}

const getUsernameFromStorage = (): string => {
  if (typeof localStorage !== "undefined") {
    const username = localStorage.getItem("username");
    return username ? username : "";
  }
  return "";
};

const authSlice = createSlice({
  name: "auth",
  initialState: {
    username: getUsernameFromStorage(),
  } as AuthState,
  reducers: {
    login: (state, action: PayloadAction<{ username: string }>) => {
      state.username = action.payload.username;
      localStorage.setItem("username", action.payload.username);
    },
    logout: (state) => {
      state.username = "";
      localStorage.removeItem("username");
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
