import { Card, CardContent, Typography, Box } from '@mui/material';
import { motion } from 'framer-motion';
import type { Employee } from '../../../shared/types';
import { formatBirthday } from '../../../shared/lib';
import CakeIcon from '@mui/icons-material/Cake';
import type { SeasonConfig } from '../../../shared/constants/seasons';

interface EmployeeCardProps {
  employee: Employee;
  onClick?: () => void;
  seasonConfig?: SeasonConfig;
}

export const EmployeeCard = ({ employee, onClick, seasonConfig }: EmployeeCardProps) => {
  const seasonalColor = seasonConfig?.colors.primary || '#2196f3';
  const seasonalSecondary = seasonConfig?.colors.secondary || '#64b5f6';
  const seasonalAccent = seasonConfig?.colors.accent || '#bbdefb';
  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -4 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
    >
      <Card
        sx={{
          cursor: onClick ? 'pointer' : 'default',
          border: employee.isLeader 
            ? `2px solid ${seasonalColor}` 
            : `1px solid ${seasonalAccent}50`,
          background: employee.isLeader
            ? `linear-gradient(135deg, ${seasonalAccent}30, rgba(255, 255, 255, 0.9))`
            : 'rgba(255, 255, 255, 0.85)',
          backdropFilter: 'blur(15px)',
          boxShadow: employee.isLeader
            ? `0 4px 16px ${seasonalColor}30, 0 0 0 1px ${seasonalColor}10`
            : `0 2px 8px ${seasonalAccent}40`,
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          overflow: 'hidden',
          position: 'relative',
          '&:hover': {
            boxShadow: employee.isLeader
              ? `0 8px 28px ${seasonalColor}40, 0 0 0 2px ${seasonalColor}20`
              : `0 6px 20px ${seasonalColor}30`,
            transform: 'translateY(-2px)',
          },
        }}
        onClick={onClick}
      >
        <CardContent sx={{ p: 2.5, pt: employee.isLeader ? 3 : 2.5 }}>
          <Box display="flex" alignItems="center" gap={2.5}>
            {/* Image */}
            <Box
              sx={{
                width: '90px',
                height: '90px',
                position: 'relative',
                flexShrink: 0,
                borderRadius: 3,
                overflow: 'hidden',
                border: employee.isLeader 
                  ? `3px solid ${seasonalColor}40`
                  : `2px solid ${seasonalAccent}30`,
                boxShadow: employee.isLeader
                  ? `0 4px 12px ${seasonalColor}30`
                  : `0 2px 8px ${seasonalAccent}25`,
              }}
            >
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
                  height: 'auto',
                  minHeight: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center top',
                }}
              />
            </Box>

            {/* Content */}
            <Box flex={1}>
              <Typography 
                variant="h6" 
                component="div" 
                fontWeight="bold" 
                mb={0.5}
                sx={{
                  background: employee.isLeader
                    ? `linear-gradient(45deg, ${seasonalColor} 30%, ${seasonalSecondary} 90%)`
                    : 'inherit',
                  backgroundClip: employee.isLeader ? 'text' : 'inherit',
                  WebkitBackgroundClip: employee.isLeader ? 'text' : 'inherit',
                  WebkitTextFillColor: employee.isLeader ? 'transparent' : 'inherit',
                  color: employee.isLeader ? 'inherit' : 'text.primary',
                  fontSize: employee.isLeader ? '1.15rem' : '1.1rem',
                }}
              >
                {employee.name}
              </Typography>
              <Box 
                display="flex" 
                alignItems="center" 
                gap={0.75}
                sx={{
                  backgroundColor: `${seasonalAccent}30`,
                  borderRadius: 2,
                  px: 1.5,
                  py: 0.75,
                  width: 'fit-content',
                }}
              >
                <CakeIcon sx={{ fontSize: 18, color: seasonalColor }} />
                <Typography
                  variant="body2"
                  sx={{ 
                    fontWeight: 600,
                    color: seasonalColor,
                  }}
                >
                  {formatBirthday(employee.birthday)}
                </Typography>
              </Box>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  );
};
