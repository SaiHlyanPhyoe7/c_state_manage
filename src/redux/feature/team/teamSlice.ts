import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Team {
  id: string;
  name: string;
  playerCount?: number | "" | undefined;
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
    initializeTeams: (state, action: PayloadAction<Team[]>) => {
      state.teams = action.payload;
    },
    createTeam: (state, action: PayloadAction<Team>) => {
      state.teams.push(action.payload);
    },
    updateTeam: (state, action: PayloadAction<Team>) => {
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
