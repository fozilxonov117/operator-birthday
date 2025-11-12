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

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 0.75,
        py: 0.75,
        px: 1,
        background: `linear-gradient(135deg, ${bgColor}40, ${bgColor}20)`,
        borderRadius: 2.5,
        border: `1.5px solid ${borderColor}30`,
        mt: 'auto',
        backdropFilter: 'blur(10px)',
        boxShadow: `0 2px 8px ${borderColor}20`,
      }}
    >
      {reactions.map((reactionType) => (
        <ReactionButton
          key={reactionType}
          reactionType={reactionType}
          count={stats.reactions[reactionType]}
          isSelected={stats.userReaction === reactionType}
          onClick={() => handleReactionClick(reactionType)}
          disabled={submitting}
          seasonConfig={seasonConfig}
        />
      ))}
    </Box>
  );
};
