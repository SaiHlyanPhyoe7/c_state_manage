import { TeamOP, TeamState } from "@/types/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: TeamState = {
  teams: [],
};

const teamSlice = createSlice({
  name: "team",
  initialState,
  reducers: {
    initializeTeams: (state, action: PayloadAction<TeamOP[]>) => {
      state.teams = action.payload;
    },
    createTeam: (state, action: PayloadAction<TeamOP>) => {
      state.teams.push(action.payload);
    },
    updateTeam: (state, action: PayloadAction<TeamOP>) => {
      const updatedTeam = action.payload;
      const teamIndex = state.teams.findIndex(
        (team) => team.id === updatedTeam.id
      );
      if (teamIndex !== -1) {
        state.teams[teamIndex] = updatedTeam;
      }
    },
    removeTeam: (state, action: PayloadAction<string>) => {
      const teamId = action.payload;
      state.teams = state.teams.filter((team) => team.id !== teamId);
    },
  },
});

export const { initializeTeams, createTeam, updateTeam, removeTeam } =
  teamSlice.actions;
export default teamSlice.reducer;
