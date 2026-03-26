// types.ts

export interface Game {
    id: number;
    title: string;
    genre: string;
    rating: number;
    image: string;
    description: string;
    release_date: string;
    developer: string;
    createdAt: string;
}

export interface Achievement {
    title: string;
    year: number;
}

export interface UserStats {
    matchesPlayed: number;
    tournamentsWon: number;
    winRate: number; // 0.0 to 1.0
}

export interface User {
    id: string;
    email: string;
    username: string;
    fullName: string;
    password: string; // optional, for simulation purposes
    avatar: string;
    level: number;
    country: string;
    joinedAt: string;
    bio: string;
    favoriteGames: string[]; // array of game IDs
    achievements: Achievement[];
    stats: UserStats;
    role: "player" | "admin";
}

export interface Tournament {
    id: number;
    title: string;
    game_id: number;
    game: string;
    image: string;
    prize_pool: string;
    participants: number;
    start_date: string;
    end_date: string;
    status: "upcoming" | "ongoing" | "finished";
    genre: string;
}
