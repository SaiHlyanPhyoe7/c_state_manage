import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  loggedIn: boolean;
  username: string;
}

const getUsernameFromStorage = (): string => {
  const username = localStorage.getItem("username");
  return username ? username : "";
};

const authSlice = createSlice({
  name: "auth",
  initialState: {
    loggedIn: false,
    username: getUsernameFromStorage(),
  } as AuthState,
  reducers: {
    login: (state, action: PayloadAction<{ username: string }>) => {
      state.loggedIn = true;
      state.username = action.payload.username;
      localStorage.setItem("username", action.payload.username); // Store username in localStorage
    },
    logout: (state) => {
      state.loggedIn = false;
      state.username = "";
      localStorage.removeItem("username"); // Remove username from localStorage
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
