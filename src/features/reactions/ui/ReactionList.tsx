import { useState, useEffect } from 'react';
import { Box, CircularProgress } from '@mui/material';
import { type ReactionType, type ReactionStats } from '../config';
import { ReactionButton } from './ReactionButton';
import { getDeviceId } from '../../../shared/lib/deviceId.ts';
import type { SeasonConfig } from '../../../shared/constants/seasons';
// Using mock API - replace with real API when backend is ready
import {
  getReactionStats,
  addReaction,
  updateReaction,
  removeReaction,
} from '../../../shared/api/mockReactionApi.ts';

interface ReactionListProps {
  employeeId: string;
  seasonConfig?: SeasonConfig;
}

export const ReactionList = ({ employeeId, seasonConfig }: ReactionListProps) => {
  const [stats, setStats] = useState<ReactionStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const deviceId = getDeviceId();

  const reactions: ReactionType[] = ['like', 'love', 'celebrate', 'clap', 'fire'];
  
  // Use season colors or fallback to default
  const bgColor = seasonConfig?.colors.accent || '#bbdefb';
  const borderColor = seasonConfig?.colors.primary || '#2196f3';

  useEffect(() => {
    loadReactionStats();
  }, [employeeId]);

  const loadReactionStats = async () => {
    try {
      setLoading(true);
      const data = await getReactionStats(employeeId, deviceId);
      setStats(data);
    } catch (error) {
      console.error('Failed to load reaction stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleReactionClick = async (reactionType: ReactionType) => {
    if (submitting || !stats) return;

    try {
      setSubmitting(true);

      if (stats.userReaction === reactionType) {
        // Remove reaction if clicking the same one
        await removeReaction({ employeeId, deviceId });
      } else if (stats.userReaction) {
        // Update reaction if user already reacted
        await updateReaction({ employeeId, deviceId, reactionType });
      } else {
        // Add new reaction
        await addReaction({ employeeId, deviceId, reactionType });
      }

      // Reload stats after action
      await loadReactionStats();
    } catch (error) {
      console.error('Failed to handle reaction:', error);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" py={1}>
        <CircularProgress size={20} />
      </Box>
    );
  }

  if (!stats) {
    return null;
  }

  // Determine which icon to show by default
  const defaultReaction = stats.userReaction || (stats.totalReactions > 0 
    ? reactions.find(r => stats.reactions[r] > 0) 
    : 'like');

  return (
    <Box
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      sx={{
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '44px',
        height: '44px',
      }}
    >
      {/* Default visible icon */}
      {!isHovered && defaultReaction && (
        <Box
          sx={{
            transition: 'all 0.3s ease',
          }}
        >
          <ReactionButton
            reactionType={defaultReaction}
            count={stats.totalReactions}
            isSelected={stats.userReaction === defaultReaction}
            onClick={() => handleReactionClick(defaultReaction)}
            disabled={submitting}
            seasonConfig={seasonConfig}
          />
        </Box>
      )}

      {/* Expanded reactions on hover */}
      {isHovered && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 0.5,
            py: 0.5,
            px: 0.75,
            background: `linear-gradient(135deg, ${bgColor}35, ${bgColor}15)`,
            borderRadius: 3,
            border: `1px solid ${borderColor}25`,
            // backdropFilter: 'blur(10px)',
            boxShadow: `0 4px 12px ${borderColor}25`,
          }}
        >
          {reactions.map((reactionType, index) => (
            <Box
              key={reactionType}
              sx={{
                opacity: 0,
                transform: 'scale(0.5) translateY(10px)',
                animation: `fadeInUp 0.3s ease forwards ${index * 0.05}s`,
                '@keyframes fadeInUp': {
                  '0%': {
                    opacity: 0,
                    transform: 'scale(0.5) translateY(10px)',
                  },
                  '100%': {
                    opacity: 1,
                    transform: 'scale(1) translateY(0)',
                  },
                },
              }}
            >
              <ReactionButton
                reactionType={reactionType}
                count={stats.reactions[reactionType]}
                isSelected={stats.userReaction === reactionType}
                onClick={() => handleReactionClick(reactionType)}
                disabled={submitting}
                seasonConfig={seasonConfig}
              />
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};
