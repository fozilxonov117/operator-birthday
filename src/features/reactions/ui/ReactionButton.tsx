import { Box, IconButton, Tooltip, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { REACTION_CONFIG, type ReactionType } from '../config';
import type { SeasonConfig } from '../../../shared/constants/seasons';

interface ReactionButtonProps {
  reactionType: ReactionType;
  count: number;
  isSelected: boolean;
  onClick: () => void;
  disabled?: boolean;
  seasonConfig?: SeasonConfig;
}

export const ReactionButton = ({
  reactionType,
  count,
  isSelected,
  onClick,
  disabled = false,
  seasonConfig,
}: ReactionButtonProps) => {
  const config = REACTION_CONFIG[reactionType];
  const Icon = config.icon;
  
  // Modern vibrant colors for reactions
  const modernColors: Record<ReactionType, string> = {
    like: '#3b82f6', // Bright blue
    love: '#ef4444', // Vibrant red
    celebrate: '#f59e0b', // Golden amber
    clap: '#10b981', // Fresh green
    fire: '#f97316', // Orange fire
  };
  
  const reactionColor = modernColors[reactionType];
  const seasonalAccent = seasonConfig?.colors.accent || '#e3f2fd';

  return (
    <Tooltip title={config.label} arrow>
      <motion.div
        whileHover={{ scale: disabled ? 1 : 1.15, rotate: disabled ? 0 : [0, -5, 5, 0] }}
        whileTap={{ scale: disabled ? 1 : 0.9 }}
        transition={{ duration: 0.2 }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 0.25,
          }}
        >
          <IconButton
            onClick={onClick}
            disabled={disabled}
            sx={{
              background: isSelected 
                ? `linear-gradient(135deg, ${reactionColor}30, ${reactionColor}50)` 
                : `linear-gradient(135deg, ${seasonalAccent}60, rgba(255, 255, 255, 0.95))`,
              border: isSelected 
                ? `2.5px solid ${reactionColor}` 
                : `2px solid ${seasonalAccent}80`,
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              padding: '10px',
              boxShadow: isSelected 
                ? `0 4px 12px ${reactionColor}40, 0 0 0 4px ${reactionColor}10` 
                : `0 2px 6px ${seasonalAccent}30`,
              '&:hover': {
                background: `linear-gradient(135deg, ${reactionColor}40, ${reactionColor}60)`,
                borderColor: reactionColor,
                boxShadow: `0 6px 16px ${reactionColor}50, 0 0 0 4px ${reactionColor}15`,
                transform: 'translateY(-2px)',
              },
              '&:active': {
                transform: 'translateY(0px)',
                boxShadow: `0 2px 8px ${reactionColor}40`,
              },
              '&:disabled': {
                opacity: 0.6,
                background: 'rgba(200, 200, 200, 0.3)',
              },
            }}
            size="small"
          >
            <Icon
              sx={{
                fontSize: 20,
                color: reactionColor,
                transition: 'all 0.3s ease',
                filter: isSelected ? 'none' : 'saturate(0.7)',
                transform: isSelected ? 'scale(1.1)' : 'scale(1)',
              }}
            />
          </IconButton>
          {count > 0 && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 500, damping: 15 }}
            >
              <Typography
                variant="caption"
                sx={{
                  fontSize: '0.7rem',
                  fontWeight: 'bold',
                  color: reactionColor,
                  minWidth: '18px',
                  textAlign: 'center',
                  background: `linear-gradient(135deg, ${reactionColor}20, ${reactionColor}10)`,
                  borderRadius: '10px',
                  px: 0.5,
                  py: 0.1,
                  border: `1px solid ${reactionColor}30`,
                }}
              >
                {count}
              </Typography>
            </motion.div>
          )}
        </Box>
      </motion.div>
    </Tooltip>
  );
};
