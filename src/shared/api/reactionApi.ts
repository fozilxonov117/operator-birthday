import type {
  Reaction,
  ReactionStats,
  AddReactionRequest,
  RemoveReactionRequest,
  UpdateReactionRequest,
} from '../types/reaction';

// Replace with your actual API base URL
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

/**
 * Get all reactions for a specific employee
 */
export const getEmployeeReactions = async (employeeId: string): Promise<Reaction[]> => {
  const response = await fetch(`${API_BASE_URL}/reactions/${employeeId}`);
  if (!response.ok) {
    throw new Error('Failed to fetch reactions');
  }
  return response.json();
};

/**
 * Get reaction statistics for a specific employee
 */
export const getReactionStats = async (
  employeeId: string,
  deviceId: string
): Promise<ReactionStats> => {
  const response = await fetch(
    `${API_BASE_URL}/reactions/${employeeId}/stats?deviceId=${deviceId}`
  );
  if (!response.ok) {
    throw new Error('Failed to fetch reaction stats');
  }
  return response.json();
};

/**
 * Get reaction statistics for multiple employees
 */
export const getBulkReactionStats = async (
  employeeIds: string[],
  deviceId: string
): Promise<Record<string, ReactionStats>> => {
  const response = await fetch(`${API_BASE_URL}/reactions/stats/bulk`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ employeeIds, deviceId }),
  });
  if (!response.ok) {
    throw new Error('Failed to fetch bulk reaction stats');
  }
  return response.json();
};

/**
 * Add a new reaction
 */
export const addReaction = async (data: AddReactionRequest): Promise<Reaction> => {
  const response = await fetch(`${API_BASE_URL}/reactions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error('Failed to add reaction');
  }
  return response.json();
};

/**
 * Update an existing reaction (change reaction type)
 */
export const updateReaction = async (data: UpdateReactionRequest): Promise<Reaction> => {
  const response = await fetch(`${API_BASE_URL}/reactions/${data.employeeId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error('Failed to update reaction');
  }
  return response.json();
};

/**
 * Remove a reaction
 */
export const removeReaction = async (data: RemoveReactionRequest): Promise<void> => {
  const response = await fetch(
    `${API_BASE_URL}/reactions/${data.employeeId}?deviceId=${data.deviceId}`,
    {
      method: 'DELETE',
    }
  );
  if (!response.ok) {
    throw new Error('Failed to remove reaction');
  }
};
