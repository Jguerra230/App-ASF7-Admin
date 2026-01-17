export type ChampionshipFormat = 'league' | 'knockout' | 'hybrid';

export interface Championship {
  id: string;
  name: string;
  season: string;
  status: 'active' | 'finished' | 'upcoming';
  logo?: string;
  startDate: string; // ISO Date
  format: ChampionshipFormat;
  config?: {
    groups?: number;
    qualifiersPerGroup?: number;
    totalTeams?: number;
  };
}

export interface Team {
  id: string;
  name: string;
  colors: [string, string];
  logo: string;
  coach?: string;
}

export interface Player {
  id: string;
  name: string;
  position: 'GK' | 'DEF' | 'MID' | 'ATA';
  teamId: string;
  price: number;
  status: 'active' | 'injured' | 'suspended';
  photoUrl: string;
  number?: number;
}

export interface MatchStats {
  goals: number;
  assists: number;
  yellowCards: number;
  redCards: number;
  shotsOnTarget: number;
  foulsCommitted: number;
  foulsSuffered: number;
  saves: number;
}

export interface PlayerMatchStats extends MatchStats {
  playerId: string;
  teamId: string;
}

export interface Match {
  id: string;
  homeTeamId: string;
  awayTeamId: string;
  round: number;
  date: string;
  status: 'scheduled' | 'live' | 'finished';
  score: {
    home: number;
    away: number;
  };
  location?: string;
}

export interface News {
  id: string;
  title: string;
  summary: string;
  status: 'published' | 'draft' | 'archived';
  date: string;
  tags: string[];
  imageUrl: string;
}

export interface FantasyRule {
  position: 'GK' | 'DEF' | 'MID' | 'ATA';
  limit: number;
}
