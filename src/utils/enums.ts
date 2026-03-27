export enum UserRole {
  normalUser = 'normalUser',
  admin = 'admin',
  organizer = 'organizer',
}

export enum TournamentStatus {
  upcoming = 'Upcoming',
  ongoing = 'Ongoing',
  completed = 'Completed',
}

export enum GameGenre {
  // Acronyms (Uppercase Keys & Values)
  FPS = 'FPS',
  MOBA = 'MOBA',
  RPG = 'RPG',
  MMORPG = 'MMORPG',

  // Standard Genres (Lowercase Keys, Capitalized Values)
  sports = 'Sports',
  Shooter = 'Shooter',
  battle_royale = 'Battle Royale',
  fighting = 'Fighting',
  racing = 'Racing',
  strategy = 'Strategy',
  card = 'Card Game',
  board = 'Board Game',
  action_adventure = 'Action Adventure',
  platformer = 'Platformer',
  simulation = 'Simulation',
  puzzle = 'Puzzle',
  survival = 'Survival',
  horror = 'Horror',
  roguelike = 'Roguelike',
  metroidvania = 'Metroidvania',
  soulslike = 'Soulslike',
  tower_defense = 'Tower Defense',
  visual_novel = 'Visual Novel',
  stealth = 'Stealth',
  rhythm = 'Rhythm',
  sandbox = 'Sandbox',
}
