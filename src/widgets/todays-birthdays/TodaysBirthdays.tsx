import { Box, Typography, Paper, IconButton, Fab, Badge } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import type { Employee } from '../../shared/types';
import { BirthdayCard } from '../../entities/employee';
import { sortEmployees } from '../../shared/lib';
import CloseIcon from '@mui/icons-material/Close';
import CakeIcon from '@mui/icons-material/Cake';
import EventIcon from '@mui/icons-material/Event';
import type { SeasonConfig } from '../../shared/constants/seasons';

interface TodaysBirthdaysProps {
  employees: Employee[];
  seasonConfig: SeasonConfig;
}

export const TodaysBirthdays = ({ employees, seasonConfig }: TodaysBirthdaysProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const sortedEmployees = sortEmployees(employees);
  
  // Dynamic width based on employee count with min/max constraints
  const sidebarWidth = employees.length <= 3 ? '24%' : '40%';
  const minWidth = '320px';
  const maxWidth = '700px';
  const gridColumns = employees.length <= 3 ? 1 : 2;

  // Auto-open for 10 seconds on mount
  useEffect(() => {
    setIsOpen(true);
    const timer = setTimeout(() => {
      setIsOpen(false);
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* Toggle Button */}
      <AnimatePresence mode="wait">
        {!isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            style={{
              position: 'fixed',
              top: 80,
              right: 20,
              zIndex: 2000,
            }}
          >
            <Fab
              color="secondary"
              onClick={() => setIsOpen(true)}
              sx={{
                background: `linear-gradient(135deg, ${seasonConfig.colors.primary} 0%, ${seasonConfig.colors.secondary} 100%)`,
                boxShadow: `0 4px 20px ${seasonConfig.background.overlay}`,
                '&:hover': {
                  background: `linear-gradient(135deg, ${seasonConfig.colors.primary} 0%, ${seasonConfig.colors.accent} 100%)`,
                },
              }}
            >
              <Badge badgeContent={employees.length} color="error">
                <CakeIcon />
              </Badge>
            </Fab>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sidebar Panel */}
      <AnimatePresence mode="wait">
        {isOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            style={{
              position: 'fixed',
              top: '64px',
              right: 0,
              height: '100vh',
              width: sidebarWidth,
              minWidth: minWidth,
              maxWidth: maxWidth,
              zIndex: 1100,
            }}
          >
            <Paper
              elevation={8}
              sx={{
                height: '100%',
                background: seasonConfig.colors.gradient,
                backdropFilter: 'blur(20px)',
                overflowY: 'auto',
                borderRadius: 0,
                borderLeft: `2px solid ${seasonConfig.colors.primary}`,
                position: 'relative',
                transition: 'all 0.5s ease',
                // Hide scrollbar
                '&::-webkit-scrollbar': {
                  display: 'none',
                },
                msOverflowStyle: 'none',
                scrollbarWidth: 'none',
              }}
            >
              {/* Floating Close Button */}
              <IconButton 
                onClick={() => setIsOpen(false)} 
                sx={{ 
                  position: 'absolute',
                  top: 18,
                  right: 8,
                  zIndex: 10,
                  background: seasonConfig.colors.primary,
                  color: 'white',
                  '&:hover': {
                    background: seasonConfig.colors.secondary,
                  },
                }}
              >
                <CloseIcon />
              </IconButton>

              {/* Content */}
              <Box px={3} pt={1} pb={10}>
                {employees.length === 0 ? (
                  <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                    minHeight={300}
                  >
                    <EventIcon sx={{ fontSize: 80, color: 'text.secondary', mb: 2 }} />
                    <Typography variant="body1" color="text.secondary" textAlign="center">
                      No birthdays today
                    </Typography>
                    <Typography variant="body2" color="text.secondary" textAlign="center" mt={1}>
                      Check back tomorrow!
                    </Typography>
                  </Box>
                ) : (
                  <Box 
                    sx={{
                      display: 'grid',
                      gridTemplateColumns: `repeat(${gridColumns}, 1fr)`,
                      gap: 2,
                    }}
                  >
                    {sortedEmployees.map((employee, index) => (
                      <motion.div
                        key={employee.id}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                      >
                        <BirthdayCard employee={employee} seasonConfig={seasonConfig} />
                      </motion.div>
                    ))}
                  </Box>
                )}
              </Box>
            </Paper>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Backdrop */}
      <AnimatePresence mode="wait">
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.3)',
              zIndex: 1099,
            }}
          />
        )}
      </AnimatePresence>
    </>
  );
};
