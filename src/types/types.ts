export interface childrenProps {
  children: React.ReactNode;
}

export interface Team {
  id: string;
  name: string;
  playerCount: number;
  region: string;
  country: string;
}

export interface formVal {
  name: string;
  playerCount: number;
  region: string;
  country: string;
}
export interface Player {
  id: number;
  first_name: string;
  last_name: string;
  height_feet: string;
  height_inches: number;
  position: string;
}

export interface APIResponse {
  data: Player[];
}

export interface ScrollDataT {
  players: Player[];
  loading: boolean;
}

export interface TeamOP {
  id: string;
  name: string;
  playerCount?: number | "" | undefined;
  region: string;
  country: string;
}

export interface HandleManipulationProps {
  teamId: string;
}

export interface AuthState {
  username: string;
}

export interface CounterState {
  value: number;
}

export interface TeamState {
  teams: TeamOP[];
}
