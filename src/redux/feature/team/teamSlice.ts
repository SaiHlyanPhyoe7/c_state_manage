import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Team {
  id: string;
  name: string;
  playerCount: number;
  region: string;
  country: string;
}

interface TeamState {
  teams: Team[];
}

const initialState: TeamState = {
  teams: [],
};

const teamSlice = createSlice({
  name: "team",
  initialState,
  reducers: {
    createTeam: (state, action: PayloadAction<Team>) => {
      state.teams.push(action.payload);
    },
    updateTeam: (state, action: PayloadAction<Team>) => {
      const { id } = action.payload;
      const existingTeam = state.teams.find((team) => team.id === id);
      if (existingTeam) {
        Object.assign(existingTeam, action.payload);
      }
    },
    removeTeam: (state, action: PayloadAction<string>) => {
      const teamId = action.payload;
      state.teams = state.teams.filter((team) => team.id !== teamId);
    },
  },
});

export const { createTeam, updateTeam, removeTeam } = teamSlice.actions;
export default teamSlice.reducer;
