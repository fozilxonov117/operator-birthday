export type ReactionType = 'like' | 'love' | 'celebrate' | 'clap' | 'fire';

export interface ReactionStats {
  employeeId: string;
  reactions: {
    [key in ReactionType]: number;
  };
  totalReactions: number;
  userReaction?: ReactionType;
}

// Apple emoji CDN URLs for high-quality rendering
export const REACTION_CONFIG: Record<
  ReactionType,
  { emojiUrl: string; label: string; color: string }
> = {
  like: {
    emojiUrl: 'https://em-content.zobj.net/source/apple/391/high-voltage_26a1.png',
    label: 'Like',
    color: '#2196f3',
  },
  love: {
    emojiUrl: 'https://em-content.zobj.net/source/apple/391/red-heart_2764-fe0f.png',
    label: 'Love',
    color: '#f44336',
  },
  celebrate: {
    emojiUrl: 'https://em-content.zobj.net/source/apple/391/party-popper_1f389.png',
    label: 'Celebrate',
    color: '#ff9800',
  },
  clap: {
    emojiUrl: 'https://em-content.zobj.net/source/apple/391/clapping-hands_1f44f.png',
    label: 'Clap',
    color: '#4caf50',
  },
  fire: {
    emojiUrl: 'https://em-content.zobj.net/source/apple/391/fire_1f525.png',
    label: 'Fire',
    color: '#ff5722',
  },
};
