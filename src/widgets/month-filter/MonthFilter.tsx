import { Box, Typography, Card, CardContent, IconButton } from '@mui/material';
import { motion } from 'framer-motion';
import { useRef, useEffect } from 'react';
import { MONTHS } from '../../shared/constants';
import { getSeasonConfig, isMonthAccessible } from '../../shared/constants/seasons';
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
  const currentMonth = new Date().getMonth() + 1; // 1-12
  
  // Get accessible months (current, prev, next)
  const prevMonth = currentMonth === 1 ? 12 : currentMonth - 1;
  const nextMonth = currentMonth === 12 ? 1 : currentMonth + 1;
  const accessibleMonths = [prevMonth, currentMonth, nextMonth];

  // Reorder months so current month is in the CENTER of the carousel
  // For December (current=12): Order: Sep → Oct → Nov → Dec → Jan → Feb → Mar → Apr → May → Jun → Jul → Aug
  const reorderedMonths = (() => {
    const allMonthIds = MONTHS.map(m => m.id);
    
    // Find the current month index
    const currentMonthIndex = allMonthIds.indexOf(currentMonth);
    
    // Calculate how many months to shift to center the current month
    const totalMonths = allMonthIds.length;
    const centerPosition = Math.floor(totalMonths / 2);
    const shift = currentMonthIndex - centerPosition;
    
    // Rotate the array to center the current month
    const rotated: number[] = [];
    for (let i = 0; i < totalMonths; i++) {
      const newIndex = (i + shift + totalMonths) % totalMonths;
      rotated.push(allMonthIds[newIndex]);
    }
    
    return MONTHS.filter(m => rotated.includes(m.id))
      .sort((a, b) => rotated.indexOf(a.id) - rotated.indexOf(b.id));
  })();

  const handleArrowClick = (direction: 'left' | 'right') => {
    const currentIndex = accessibleMonths.findIndex(m => m === selectedMonth);
    let newIndex;
    
    if (direction === 'left') {
      newIndex = currentIndex === 0 ? accessibleMonths.length - 1 : currentIndex - 1;
    } else {
      newIndex = currentIndex === accessibleMonths.length - 1 ? 0 : currentIndex + 1;
    }
    
    onMonthSelect(accessibleMonths[newIndex]);
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
        {reorderedMonths.map((month) => {
          const count = birthdayCounts[month.id] || 0;
          const isSelected = selectedMonth === month.id;
          const currentYear = new Date().getFullYear();
          const seasonConfig = getSeasonConfig(month.id);
          const isAccessible = isMonthAccessible(month.id);

          return (
            <motion.div
              key={month.id}
              data-month={month.id}
              whileHover={isAccessible ? { scale: 1.05, y: -1 } : {}}
              whileTap={isAccessible ? { scale: 1 } : {}}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <Card
                onClick={() => isAccessible && onMonthSelect(month.id)}
                sx={{
                  minWidth: 200,
                  cursor: isAccessible ? 'pointer' : 'not-allowed',
                  background: isSelected
                    ? seasonConfig.monthCardColors.selected
                    : seasonConfig.monthCardColors.unselected,
                  backdropFilter: 'blur(1px)',
                  border: isSelected ? `2px solid ${seasonConfig.colors.primary}` : '2px solid rgba(255, 255, 255, 0.5)',
                  boxShadow: isSelected ? `0 8px 32px ${seasonConfig.colors.primary}40` : '0 4px 16px rgba(0, 0, 0, 0.1)',
                  transition: 'all 0.3s ease',
                  opacity: isAccessible ? 1 : 0.4,
                  filter: isAccessible ? 'none' : 'grayscale(50%)',
                  pointerEvents: isAccessible ? 'auto' : 'none',
                  '&:hover': isAccessible ? {
                    boxShadow: `0 12px 40px ${seasonConfig.colors.primary}50`,
                    border: `2px solid ${seasonConfig.colors.primary}`,
                  } : {},
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
