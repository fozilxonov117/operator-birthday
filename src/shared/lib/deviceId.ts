import { nanoid } from 'nanoid';

const DEVICE_ID_KEY = 'birthday-app-device-id';

/**
 * Get or generate a unique device ID
 * Stored in localStorage to persist across sessions
 */
export const getDeviceId = (): string => {
  // Try to get existing device ID from localStorage
  const existingId = localStorage.getItem(DEVICE_ID_KEY);
  
  if (existingId) {
    return existingId;
  }
  
  // Generate new device ID
  const newId = nanoid();
  localStorage.setItem(DEVICE_ID_KEY, newId);
  
  return newId;
};

/**
 * Reset device ID (for testing purposes)
 */
export const resetDeviceId = (): void => {
  localStorage.removeItem(DEVICE_ID_KEY);
};
