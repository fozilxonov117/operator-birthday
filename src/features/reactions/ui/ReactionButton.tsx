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
}: ReactionButtonProps) => {
  const config = REACTION_CONFIG[reactionType];

  return (
    <Tooltip title={config.label} arrow>
      <motion.div
        whileHover={{ scale: disabled ? 1 : 1.2 }}
        whileTap={{ scale: disabled ? 1 : 0.85 }}
        transition={{ type: 'spring', stiffness: 400, damping: 15 }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: 0.5,
          }}
        >
          <IconButton
            onClick={onClick}
            disabled={disabled}
            sx={{
              background: 'transparent',
              border: 'none',
              transition: 'all 0.2s ease',
              padding: '4px',
              '&:hover': {
                background: 'transparent',
                transform: 'scale(1.1)',
              },
              '&:active': {
                transform: 'scale(0.9)',
              },
              '&:disabled': {
                opacity: 0.6,
              },
            }}
            size="small"
          >
            <Box
              component="img"
              src={config.emojiUrl}
              alt={config.label}
              sx={{
                width: '20px',
                height: '20px',
                transition: 'all 0.2s ease',
                filter: isSelected ? 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))' : 'none',
                transform: isSelected ? 'scale(1.15)' : 'scale(1)',
                display: 'block',
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
                  fontSize: '0.75rem',
                  fontWeight: 'bold',
                  color: '#fff',
                  textShadow: '0 1px 3px rgba(0,0,0,0.5)',
                  minWidth: '16px',
                  textAlign: 'center',
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
