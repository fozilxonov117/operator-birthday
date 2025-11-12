import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CelebrationIcon from '@mui/icons-material/Celebration';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';

export type ReactionType = 'like' | 'love' | 'celebrate' | 'clap' | 'fire';

export interface ReactionStats {
  employeeId: string;
  reactions: {
    [key in ReactionType]: number;
  };
  totalReactions: number;
  userReaction?: ReactionType;
}

export const REACTION_CONFIG: Record<
  ReactionType,
  { icon: typeof ThumbUpIcon; label: string; color: string }
> = {
  like: {
    icon: ThumbUpIcon,
    label: 'Like',
    color: '#2196f3',
  },
  love: {
    icon: FavoriteIcon,
    label: 'Love',
    color: '#f44336',
  },
  celebrate: {
    icon: CelebrationIcon,
    label: 'Celebrate',
    color: '#ff9800',
  },
  clap: {
    icon: EmojiEmotionsIcon,
    label: 'Clap',
    color: '#4caf50',
  },
  fire: {
    icon: LocalFireDepartmentIcon,
    label: 'Fire',
    color: '#ff5722',
  },
};
