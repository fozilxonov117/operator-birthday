import type { Employee } from '../types';

/**
 * Get the current date in MM-DD format
 */
export const getCurrentDate = (): string => {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${month}-${day}`;
};

/**
 * Get the current month number (1-12)
 */
export const getCurrentMonth = (): number => {
  return new Date().getMonth() + 1;
};

/**
 * Check if today is employee's birthday
 */
export const isBirthdayToday = (employee: Employee): boolean => {
  return employee.birthday === getCurrentDate();
};

/**
 * Filter employees by month
 */
export const filterByMonth = (employees: Employee[], month: number): Employee[] => {
  const monthStr = String(month).padStart(2, '0');
  return employees.filter((emp) => emp.birthday.startsWith(monthStr));
};

/**
 * Get employees with birthdays today
 */
export const getTodaysBirthdays = (employees: Employee[]): Employee[] => {
  const today = getCurrentDate();
  return employees.filter((emp) => emp.birthday === today);
};

/**
 * Sort employees: leaders first, then by date
 */
export const sortEmployees = (employees: Employee[]): Employee[] => {
  return [...employees].sort((a, b) => {
    // Sort only by birthday date
    return a.birthday.localeCompare(b.birthday);
  });
};

/**
 * Calculate age based on birthday
 * Note: Returns 0 as placeholder since we don't have birth year in our data
 */
export const calculateAge = (_birthday: string): number => {
  // This is a simplified age calculation
  // In real app, you'd need birth year
  return 0; // Placeholder
};

/**
 * Format birthday for display
 */
export const formatBirthday = (birthday: string): string => {
  const [month, day] = birthday.split('-');
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  return `${monthNames[parseInt(month) - 1]} ${parseInt(day)}`;
};

/**
 * Calculate days until next birthday
 */
export const getDaysUntilBirthday = (birthday: string): number => {
  const now = new Date();
  // Set time to start of day for accurate comparison
  now.setHours(0, 0, 0, 0);
  
  const [month, day] = birthday.split('-').map(Number);
  
  // Create date for this year's birthday at start of day
  let birthdayThisYear = new Date(now.getFullYear(), month - 1, day);
  birthdayThisYear.setHours(0, 0, 0, 0);
  
  // If birthday has passed this year (but not today), calculate for next year
  if (birthdayThisYear < now) {
    birthdayThisYear = new Date(now.getFullYear() + 1, month - 1, day);
  }
  
  // Calculate difference in days
  const diffTime = birthdayThisYear.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  return diffDays;
};

/**
 * Calculate progress percentage for birthday countdown (0-100)
 * 0% = 365 days away, 100% = birthday today
 */
export const getBirthdayProgress = (birthday: string): number => {
  const daysUntil = getDaysUntilBirthday(birthday);
  const totalDays = 365;
  
  // Calculate progress (inverse of days remaining)
  const progress = ((totalDays - daysUntil) / totalDays) * 100;
  
  return Math.max(0, Math.min(100, progress));
};
