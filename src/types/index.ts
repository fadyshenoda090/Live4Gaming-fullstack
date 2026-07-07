export interface Game {
  id: number;
  title: string;
  genre: string;
  rating: number;
  image?: string;
  developer: string;
  description?: string;
  releaseDate?: string;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  role: string;
  bio?: string;
  country?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Tournament {
  id: number;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  prizePool: number;
  status: string;
  maxParticipants: number;
  gameId: number;
  organizerId: number;
  game?: Game;
  organizer?: User;
}
