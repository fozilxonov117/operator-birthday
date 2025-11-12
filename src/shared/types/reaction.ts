export type ReactionType = 'like' | 'love' | 'celebrate' | 'clap' | 'fire';

export interface Reaction {
  id: string;
  employeeId: string;
  deviceId: string;
  reactionType: ReactionType;
  timestamp: number;
}

export interface ReactionStats {
  employeeId: string;
  reactions: {
    [key in ReactionType]: number;
  };
  totalReactions: number;
  userReaction?: ReactionType;
}

export interface AddReactionRequest {
  employeeId: string;
  deviceId: string;
  reactionType: ReactionType;
}

export interface RemoveReactionRequest {
  employeeId: string;
  deviceId: string;
}

export interface UpdateReactionRequest {
  employeeId: string;
  deviceId: string;
  reactionType: ReactionType;
}
