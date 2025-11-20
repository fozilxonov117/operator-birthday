import { Card, CardContent, Typography, Box } from '@mui/material';
import { motion } from 'framer-motion';
import type { Employee } from '../../../shared/types';
import { getRandomGreeting } from '../../../shared/constants';
import { ReactionList } from '../../../features/reactions';
import type { SeasonConfig } from '../../../shared/constants/seasons';

interface BirthdayCardProps {
  employee: Employee;
  seasonConfig?: SeasonConfig;
}

export const BirthdayCard = ({ employee, seasonConfig }: BirthdayCardProps) => {
  const greeting = getRandomGreeting(employee.isLeader);
  
  // Use season colors or fallback to default
  const seasonalColor = seasonConfig?.colors.primary || '#2196f3';
  const seasonalSecondary = seasonConfig?.colors.secondary || '#64b5f6';
  const seasonalAccent = seasonConfig?.colors.accent || '#bbdefb';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.02 }}
    >
      <Card
        sx={{
          position: 'relative',
          overflow: 'hidden',
          borderRadius: 1,
          border: employee.isLeader ? '2px solid #FFD700' : 'none',
          background: 'rgba(255, 255, 255, 0.7)',
          backdropFilter: 'blur(10px)',
          boxShadow: employee.isLeader
            ? '0 4px 16px rgba(255, 215, 0, 0.3)'
            : `0 4px 16px ${seasonConfig?.background.overlay || 'rgba(33, 150, 243, 0.2)'}`,
            minHeight: '382px',
          display: 'flex',
          flexDirection: 'column',
          '&:hover': {
            boxShadow: employee.isLeader
              ? '0 8px 24px rgba(255, 215, 0, 0.4)'
              : `0 6px 20px ${seasonConfig?.background.overlay || 'rgba(33, 150, 243, 0.3)'}`,
          },
        }}
      >
        {/* Image Cover with Telegram-style extended background */}
        <Box
          sx={{
            width: '100%',
            height: '230px',
            position: 'relative',
            overflow: 'hidden',
            flexShrink: 0,
          }}
        >
          {/* Extended blurred background - repeats bottom part of image */}
          <Box
            component="img"
            src={employee.photo}
            alt=""
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center bottom',
              filter: 'blur(25px) brightness(0.85)',
              transform: 'scale(1.15)',
            }}
          />
          
          {/* Main image */}
          <Box
            component="img"
            src={employee.photo}
            alt={employee.name}
            sx={{
              position: 'absolute',
              top: 0,
              left: '50%',
              transform: 'translateX(-50%)',
              width: '100%',
              maxWidth: '85%',
              height: 'auto',
              minHeight: '100%',
              objectFit: 'cover',
              objectPosition: 'center top',
              zIndex: 1,
            }}
          />
          
          {/* Gradient overlay for smooth blending at bottom edge */}
          <Box
            sx={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: '40%',
              background: 'linear-gradient(to bottom, transparent 0%, rgba(255, 255, 255, 0.4) 70%, rgba(255, 255, 255, 0.8) 100%)',
              zIndex: 2,
              pointerEvents: 'none',
            }}
          />
          
          {/* Reactions positioned inside image */}
          <Box
            sx={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              zIndex: 3,
              display: 'flex',
              justifyContent: 'flex-start',
            }}
          >
            <ReactionList employeeId={employee.id} seasonConfig={seasonConfig} />
          </Box>
        </Box>

        <CardContent sx={{ p: 1.5, pt: 1, pb: 1.5, display: 'flex', flexDirection: 'column', gap: 1 }}>
          {/* Name */}
          <Typography
            variant="h6"
            component="div"
            fontWeight="bold"
            textAlign="center"
            sx={{
              background: employee.isLeader
                ? 'linear-gradient(45deg, #DAA520 30%, #FFD700 90%)'
                : `linear-gradient(45deg, ${seasonalColor} 30%, ${seasonalSecondary} 90%)`,
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            {employee.name}
          </Typography>

          {/* Greeting Message */}
          <Box
            sx={{
              background: employee.isLeader 
                ? 'linear-gradient(135deg, rgba(255, 215, 0, 0.15), rgba(255, 215, 0, 0.05))' 
                : `linear-gradient(135deg, ${seasonalColor}25, ${seasonalAccent}15)`,
              borderRadius: 2,
              padding: 1,
              textAlign: 'center',
              minHeight: '70px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: `1px solid ${employee.isLeader ? 'rgba(255, 215, 0, 0.3)' : seasonalColor + '30'}`,
              backdropFilter: 'blur(10px)',
              overflow: 'hidden',
            }}
          >
            <Typography
              variant="body2"
              sx={{
                fontStyle: 'italic',
                color: employee.isLeader ? '#8B6914' : seasonalColor,
                lineHeight: 1.4,
                fontWeight: 500,
                display: '-webkit-box',
                WebkitLineClamp: 3,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              "{greeting}"
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  );
};
