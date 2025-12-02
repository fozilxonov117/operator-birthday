import { Box, Typography, LinearProgress } from '@mui/material';
import { motion } from 'framer-motion';
import CakeIcon from '@mui/icons-material/Cake';

interface ProgressBarProps {
  daysUntil: number;
  progress: number;
  color?: string;
}

export const ProgressBar = ({ daysUntil, progress, color = '#2196f3' }: ProgressBarProps) => {
  const getTimeLabel = (days: number): string => {
    if (days === 0) return 'Today';
    if (days === 1) return '1 day left';
    return `${days} days left`;
  };

  return (
    <Box sx={{ width: '90%' }}>
      <Box display="flex" justifyContent="flex-start" alignItems="center" mb={0.5}>
        <Box display="flex" alignItems="center" gap={0.5}>
          {daysUntil === 0 && (
            <CakeIcon sx={{ fontSize: 14, color: color }} />
          )}
          <Typography
            variant="caption"
            sx={{
              fontWeight: 600,
              color: daysUntil === 0 ? color : 'text.secondary',
              fontSize: '0.7rem',
            }}
          >
            {getTimeLabel(daysUntil)}
          </Typography>
        </Box>
      </Box>
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        style={{ transformOrigin: 'left' }}
      >
        <LinearProgress
          variant="determinate"
          value={progress}
          sx={{
            height: 6,
            borderRadius: 3,
            backgroundColor: `${color}20`,
            '& .MuiLinearProgress-bar': {
              borderRadius: 3,
              backgroundColor: color,
              backgroundImage: `linear-gradient(90deg, ${color}, ${color}dd)`,
            },
          }}
        />
      </motion.div>
    </Box>
  );
};
