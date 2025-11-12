import { Card, CardContent, Typography, Box } from '@mui/material';
import { motion } from 'framer-motion';
import type { Employee } from '../../../shared/types';
import { formatBirthday } from '../../../shared/lib';
import CakeIcon from '@mui/icons-material/Cake';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

interface EmployeeCardProps {
  employee: Employee;
  onClick?: () => void;
}

export const EmployeeCard = ({ employee, onClick }: EmployeeCardProps) => {
  return (
    <motion.div
      whileHover={{ scale: 1.01, y: -1 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      <Card
        sx={{
          cursor: onClick ? 'pointer' : 'default',
          border: employee.isLeader ? '2px solid #FFD700' : 'none',
          background: 'rgba(255, 255, 255, 0.7)',
          backdropFilter: 'blur(10px)',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
          transition: 'all 0.3s ease',
          overflow: 'hidden',
          '&:hover': {
            boxShadow: employee.isLeader ? '0 8px 24px rgba(255, 215, 0, 0.3)' : '0 4px 16px rgba(33, 150, 243, 0.2)',
          },
        }}
        onClick={onClick}
      >
        <CardContent sx={{ p: 2 }}>
          <Box display="flex" alignItems="center" gap={2}>
            {/* Image */}
            <Box
              sx={{
                width: '100px',
                height: '100px',
                position: 'relative',
                flexShrink: 0,
                borderRadius: 2,
                overflow: 'hidden',
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
              {employee.isLeader && (
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: 4,
                    right: 4,
                    backgroundColor: '#FFD700',
                    borderRadius: '50%',
                    width: 28,
                    height: 28,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: 2,
                  }}
                >
                  <EmojiEventsIcon sx={{ color: '#000', fontSize: 16 }} />
                </Box>
              )}
            </Box>

            {/* Content - 60% */}
            <Box flex={1}>
              <Typography variant="h6" component="div" fontWeight="bold" mb={1}>
                {employee.name}
              </Typography>
              <Box display="flex" alignItems="center" gap={0.5}>
                <CakeIcon sx={{ fontSize: 18, color: '#2196f3' }} />
                <Typography
                  variant="body1"
                  sx={{ 
                    fontWeight: 'medium',
                    color: '#2196f3',
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
