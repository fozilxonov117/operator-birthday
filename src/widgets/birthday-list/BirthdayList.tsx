import { Box, Typography, Paper } from '@mui/material'; 
import { motion } from 'framer-motion';
import { useState } from 'react';
import type { Employee } from '../../shared/types';
import { EmployeeCard } from '../../entities/employee';
import { sortEmployees } from '../../shared/lib';
import { MONTHS } from '../../shared/constants';
import CelebrationIcon from '@mui/icons-material/Celebration';
import CakeIcon from '@mui/icons-material/Cake';

import type { SeasonConfig } from '../../shared/constants/seasons';

interface BirthdayListProps {
  employees: Employee[];
  selectedMonth: number;
  seasonConfig?: SeasonConfig;
}

export const BirthdayList = ({ employees, selectedMonth, seasonConfig }: BirthdayListProps) => {
  const sortedEmployees = sortEmployees(employees);
  const monthName = MONTHS.find((m) => m.id === selectedMonth)?.name || '';
  const [expandedCardId, setExpandedCardId] = useState<string | null>(null);

  const handleCardClick = (employeeId: string) => {
    setExpandedCardId(expandedCardId === employeeId ? null : employeeId);
  };

  // Distribute employees into columns for proper left-to-right, top-to-bottom ordering
  const distributeIntoColumns = (employees: Employee[], columnCount: number) => {
    const columns: Employee[][] = Array.from({ length: columnCount }, () => []);
    employees.forEach((employee, index) => {
      const columnIndex = index % columnCount;
      columns[columnIndex].push(employee);
    });
    return columns;
  };

  return (
    <Paper
      elevation={0}
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        background: 'rgba(255, 255, 255, 0.43)',
        backdropFilter: 'blur(1px)',
        borderRadius: 3,
        border: '1px solid rgba(255, 255, 255, 0.3)',
      }}
    >
      {/* Header */}
      <Box sx={{ p: 3, pb: 2 }}>
        <Box display="flex" alignItems="center" gap={1} mb={1}>
          <CelebrationIcon sx={{ fontSize: 24, color: '#2196f3' }} />
          <Typography 
            variant="h6" 
            fontWeight="bold"
            sx={{
              background: 'linear-gradient(45deg, #1976d2 30%, #2196f3 90%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            {monthName} Birthdays
          </Typography>
        </Box>
        <Typography variant="body2" color="text.secondary">
          {sortedEmployees.length} {sortedEmployees.length === 1 ? 'person' : 'people'} celebrating
          this month
        </Typography>
      </Box>

      {/* Content */}
      <Box sx={{ flex: 1, overflow: 'auto', px: 3, pb: 3 }}>
        {sortedEmployees.length === 0 ? (
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            height="100%"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200 }}
            >
              <CakeIcon sx={{ fontSize: 80, color: 'text.secondary', mb: 2 }} />
            </motion.div>
            <Typography variant="h6" color="text.secondary" textAlign="center">
              No birthdays in {monthName}
            </Typography>
            <Typography variant="body2" color="text.secondary" textAlign="center" mt={1}>
              Try selecting another month
            </Typography>
          </Box>
        ) : (
          <>
            {/* Desktop/Tablet: 4 columns */}
            <Box
              sx={{
                display: { xs: 'none', lg: 'flex' },
                gap: 2,
                paddingTop: 0.75,
              }}
            >
              {distributeIntoColumns(sortedEmployees, 4).map((columnEmployees, colIndex) => (
                <Box key={colIndex} sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {columnEmployees.map((employee, index) => (
                    <motion.div
                      key={employee.id}
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: (colIndex * columnEmployees.length + index) * 0.05 }}
                    >
                      <EmployeeCard
                        employee={employee}
                        seasonConfig={seasonConfig}
                        isExpanded={expandedCardId === employee.id}
                        onClick={() => handleCardClick(employee.id)}
                      />
                    </motion.div>
                  ))}
                </Box>
              ))}
            </Box>

            {/* Medium: 3 columns */}
            <Box
              sx={{
                display: { xs: 'none', md: 'flex', lg: 'none' },
                gap: 2,
                paddingTop: 0.75,
              }}
            >
              {distributeIntoColumns(sortedEmployees, 3).map((columnEmployees, colIndex) => (
                <Box key={colIndex} sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {columnEmployees.map((employee, index) => (
                    <motion.div
                      key={employee.id}
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: (colIndex * columnEmployees.length + index) * 0.05 }}
                    >
                      <EmployeeCard
                        employee={employee}
                        seasonConfig={seasonConfig}
                        isExpanded={expandedCardId === employee.id}
                        onClick={() => handleCardClick(employee.id)}
                      />
                    </motion.div>
                  ))}
                </Box>
              ))}
            </Box>

            {/* Small: 2 columns */}
            <Box
              sx={{
                display: { xs: 'none', sm: 'flex', md: 'none' },
                gap: 2,
                paddingTop: 0.75,
              }}
            >
              {distributeIntoColumns(sortedEmployees, 2).map((columnEmployees, colIndex) => (
                <Box key={colIndex} sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {columnEmployees.map((employee, index) => (
                    <motion.div
                      key={employee.id}
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: (colIndex * columnEmployees.length + index) * 0.05 }}
                    >
                      <EmployeeCard
                        employee={employee}
                        seasonConfig={seasonConfig}
                        isExpanded={expandedCardId === employee.id}
                        onClick={() => handleCardClick(employee.id)}
                      />
                    </motion.div>
                  ))}
                </Box>
              ))}
            </Box>

            {/* Extra Small: 1 column */}
            <Box
              sx={{
                display: { xs: 'flex', sm: 'none' },
                flexDirection: 'column',
                gap: 2,
                paddingTop: 0.75,
              }}
            >
              {sortedEmployees.map((employee, index) => (
                <motion.div
                  key={employee.id}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <EmployeeCard
                    employee={employee}
                    seasonConfig={seasonConfig}
                    isExpanded={expandedCardId === employee.id}
                    onClick={() => handleCardClick(employee.id)}
                  />
                </motion.div>
              ))}
            </Box>
          </>
        )}
      </Box>
    </Paper>
  );
};
