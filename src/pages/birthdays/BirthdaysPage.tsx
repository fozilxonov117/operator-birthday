import { useState, useMemo } from 'react';
import { Box } from '@mui/material';
import { Navigation } from '../../widgets/navigation';
import { MonthFilter } from '../../widgets/month-filter';
import { BirthdayList } from '../../widgets/birthday-list';
import { TodaysBirthdays } from '../../widgets/todays-birthdays';
import { Confetti } from '../../features/confetti';
import { Snow } from '../../features/snow';
import { FallingLeaves } from '../../features/falling-leaves';
import { CherryBlossoms } from '../../features/cherry-blossoms';
import { MOCK_EMPLOYEES } from '../../entities/employee';
import { getCurrentMonth, filterByMonth, getTodaysBirthdays } from '../../shared/lib';
import { getSeasonConfig } from '../../shared/constants/seasons';

export const BirthdaysPage = () => {
  const [selectedMonth, setSelectedMonth] = useState<number>(getCurrentMonth());

  // Get season config based on selected month
  const seasonConfig = useMemo(() => getSeasonConfig(selectedMonth), [selectedMonth]);

  // Get today's birthdays
  const todaysBirthdays = useMemo(() => getTodaysBirthdays(MOCK_EMPLOYEES), []);

  // Get birthdays for selected month
  const monthBirthdays = useMemo(
    () => filterByMonth(MOCK_EMPLOYEES, selectedMonth),
    [selectedMonth]
  );

  // Calculate birthday counts per month
  const birthdayCounts = useMemo(() => {
    const counts: Record<number, number> = {};
    MOCK_EMPLOYEES.forEach((emp) => {
      const month = parseInt(emp.birthday.split('-')[0]);
      counts[month] = (counts[month] || 0) + 1;
    });
    return counts;
  }, []);

  // Render season animation based on current season
  const renderSeasonAnimation = () => {
    switch (seasonConfig.name) {
      case 'winter':
        return <Snow />;
      case 'spring':
        return <CherryBlossoms />;
      case 'summer':
        return null; // No animation for summer
      case 'autumn':
        return <FallingLeaves />; // Falling leaves for autumn
      default:
        return null;
    }
  };

  return (
    <>
      {/* Navigation with dynamic season colors */}
      <Navigation seasonConfig={seasonConfig} />
      
      <Box
        sx={{
          height: 'calc(100vh - 64px)',
          width: '100vw',
          overflow: 'hidden',
          background: seasonConfig.colors.gradient,
          backgroundImage: `url("${seasonConfig.background.imageUrl}")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundBlendMode: 'overlay',
          position: 'relative',
          transition: 'all 0.8s ease-in-out',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: seasonConfig.colors.gradient,
            zIndex: 0,
            transition: 'all 0.8s ease-in-out',
          },
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Show confetti if there are birthdays today */}
        {todaysBirthdays.length > 0 && <Confetti />}

      {/* Season Animation */}
      {renderSeasonAnimation()}

      {/* Today's Birthdays Sidebar */}
      <TodaysBirthdays employees={todaysBirthdays} seasonConfig={seasonConfig} />

      {/* Main Content */}
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          p: 3,
          overflow: 'hidden',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* Month Filter */}
        <MonthFilter
          selectedMonth={selectedMonth}
          onMonthSelect={setSelectedMonth}
          birthdayCounts={birthdayCounts}
        />

        {/* Birthday List */}
        <Box sx={{ flex: 1, overflow: 'hidden' }}>
          <BirthdayList employees={monthBirthdays} selectedMonth={selectedMonth} />
        </Box>
      </Box>
      </Box>
    </>
  );
};
