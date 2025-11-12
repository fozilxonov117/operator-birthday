import { Box, Typography, Card, CardContent, IconButton } from '@mui/material';
import { motion } from 'framer-motion';
import { useRef, useEffect } from 'react';
import { MONTHS } from '../../shared/constants';
import { getSeasonConfig } from '../../shared/constants/seasons';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import CakeIcon from '@mui/icons-material/Cake';

interface MonthFilterProps {
  selectedMonth: number;
  onMonthSelect: (month: number) => void;
  birthdayCounts: Record<number, number>;
}

export const MonthFilter = ({ selectedMonth, onMonthSelect, birthdayCounts }: MonthFilterProps) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleArrowClick = (direction: 'left' | 'right') => {
    const currentIndex = MONTHS.findIndex(m => m.id === selectedMonth);
    let newIndex;
    
    if (direction === 'left') {
      newIndex = currentIndex === 0 ? MONTHS.length - 1 : currentIndex - 1;
    } else {
      newIndex = currentIndex === MONTHS.length - 1 ? 0 : currentIndex + 1;
    }
    
    onMonthSelect(MONTHS[newIndex].id);
  };

  // Handle mouse wheel scroll with passive: false
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      container.scrollBy({
        left: e.deltaY,
        behavior: 'auto',
      });
    };

    container.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      container.removeEventListener('wheel', handleWheel);
    };
  }, []);

  // Scroll to selected month on mount and when selectedMonth changes
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const selectedCard = container.querySelector(`[data-month="${selectedMonth}"]`);
    if (selectedCard) {
      const cardElement = selectedCard as HTMLElement;
      const containerWidth = container.clientWidth;
      const cardLeft = cardElement.offsetLeft;
      const cardWidth = cardElement.offsetWidth;
      const scrollPosition = cardLeft - containerWidth / 2 + cardWidth / 2;

      container.scrollTo({
        left: scrollPosition,
        behavior: 'smooth',
      });
    }
  }, [selectedMonth]);

  return (
    <Box sx={{ position: 'relative', mb: 3 }}>
      {/* Left Arrow */}
      <IconButton
        onClick={() => handleArrowClick('left')}
        sx={{
          position: 'absolute',
          left: -20,
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 10,
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          boxShadow: 3,
          '&:hover': { backgroundColor: 'white' },
        }}
      >
        <ChevronLeftIcon />
      </IconButton>

      {/* Month Cards Container */}
      <Box
        ref={scrollContainerRef}
        sx={{
          display: 'flex',
          gap: 3,
          overflowX: 'auto',
          overflowY: 'hidden',
          scrollbarWidth: 'none',
          '&::-webkit-scrollbar': { display: 'none' },
          px: 2,
          py: 1,
        }}
      >
        {MONTHS.map((month) => {
          const count = birthdayCounts[month.id] || 0;
          const isSelected = selectedMonth === month.id;
          const currentYear = new Date().getFullYear();
          const seasonConfig = getSeasonConfig(month.id);

          return (
            <motion.div
              key={month.id}
              data-month={month.id}
              whileHover={{ scale: 1.05, y: -1 }}
              whileTap={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <Card
                onClick={() => onMonthSelect(month.id)}
                sx={{
                  minWidth: 200,
                  cursor: 'pointer',
                  background: isSelected
                    ? seasonConfig.monthCardColors.selected
                    : seasonConfig.monthCardColors.unselected,
                  backdropFilter: 'blur(10px)',
                  border: isSelected ? `2px solid ${seasonConfig.colors.primary}` : '2px solid rgba(255, 255, 255, 0.5)',
                  boxShadow: isSelected ? `0 8px 32px ${seasonConfig.colors.primary}40` : '0 4px 16px rgba(0, 0, 0, 0.1)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    boxShadow: `0 12px 40px ${seasonConfig.colors.primary}50`,
                    border: `2px solid ${seasonConfig.colors.primary}`,
                  },
                }}
              >
                <CardContent sx={{ textAlign: 'center', py: 3 }}>
                  <Typography
                    variant="h5"
                    fontWeight="bold"
                    sx={{
                      color: isSelected ? 'white' : seasonConfig.colors.primary,
                      mb: 0.5,
                    }}
                  >
                    {month.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: isSelected ? 'rgba(255, 255, 255, 0.9)' : '#424242',
                      mb: 2,
                    }}
                  >
                    {currentYear}
                  </Typography>
                  <Typography
                    variant="h3"
                    fontWeight="bold"
                    sx={{
                      color: isSelected ? '#FFD700' : seasonConfig.colors.primary,
                      textShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
                    }}
                  >
                    {count}
                  </Typography>
                  <Box display="flex" alignItems="center" justifyContent="center" gap={0.5} mt={0.5}>
                    <CakeIcon sx={{ fontSize: 16, color: isSelected ? 'rgba(255, 255, 255, 0.9)' : seasonConfig.colors.primary }} />
                    <Typography
                      variant="body2"
                      sx={{
                        color: isSelected ? 'rgba(255, 255, 255, 0.9)' : '#424242',
                      }}
                    >
                      Birthdays
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </Box>

      {/* Right Arrow */}
      <IconButton
        onClick={() => handleArrowClick('right')}
        sx={{
          position: 'absolute',
          right: -20,
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 10,
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          boxShadow: 3,
          '&:hover': { backgroundColor: 'white' },
        }}
      >
        <ChevronRightIcon />
      </IconButton>
    </Box>
  );
};
