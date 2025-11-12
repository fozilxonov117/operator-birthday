import type { ReactionType, ReactionStats } from '../../features/reactions/config';

interface StoredReaction {
  id: string;
  employeeId: string;
  deviceId: string;
  reactionType: ReactionType;
  timestamp: number;
}

const STORAGE_KEY = 'birthday-reactions';

// Get all reactions from localStorage
const getStoredReactions = (): StoredReaction[] => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

// Save reactions to localStorage
const saveReactions = (reactions: StoredReaction[]): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(reactions));
};

// Generate simple ID
const generateId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Mock API: Get reaction statistics for an employee
 */
export const getReactionStats = async (
  employeeId: string,
  deviceId: string
): Promise<ReactionStats> => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 300));

  const allReactions = getStoredReactions();
  const employeeReactions = allReactions.filter((r) => r.employeeId === employeeId);

  // Count reactions by type
  const reactions: ReactionStats['reactions'] = {
    like: 0,
    love: 0,
    celebrate: 0,
    clap: 0,
    fire: 0,
  };

  let userReaction: ReactionType | undefined;

  employeeReactions.forEach((reaction) => {
    reactions[reaction.reactionType]++;
    if (reaction.deviceId === deviceId) {
      userReaction = reaction.reactionType;
    }
  });

  return {
    employeeId,
    reactions,
    totalReactions: employeeReactions.length,
    userReaction,
  };
};

/**
 * Mock API: Add a new reaction
 */
export const addReaction = async (data: {
  employeeId: string;
  deviceId: string;
  reactionType: ReactionType;
}): Promise<StoredReaction> => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 300));

  const allReactions = getStoredReactions();

  // Check if user already reacted
  const existingIndex = allReactions.findIndex(
    (r) => r.employeeId === data.employeeId && r.deviceId === data.deviceId
  );

  if (existingIndex !== -1) {
    throw new Error('User already reacted. Use update instead.');
  }

  const newReaction: StoredReaction = {
    id: generateId(),
    employeeId: data.employeeId,
    deviceId: data.deviceId,
    reactionType: data.reactionType,
    timestamp: Date.now(),
  };

  allReactions.push(newReaction);
  saveReactions(allReactions);

  return newReaction;
};

/**
 * Mock API: Update an existing reaction
 */
export const updateReaction = async (data: {
  employeeId: string;
  deviceId: string;
  reactionType: ReactionType;
}): Promise<StoredReaction> => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 300));

  const allReactions = getStoredReactions();

  const existingIndex = allReactions.findIndex(
    (r) => r.employeeId === data.employeeId && r.deviceId === data.deviceId
  );

  if (existingIndex === -1) {
    throw new Error('Reaction not found');
  }

  allReactions[existingIndex] = {
    ...allReactions[existingIndex],
    reactionType: data.reactionType,
    timestamp: Date.now(),
  };

  saveReactions(allReactions);

  return allReactions[existingIndex];
};

/**
 * Mock API: Remove a reaction
 */
export const removeReaction = async (data: {
  employeeId: string;
  deviceId: string;
}): Promise<void> => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 300));

  const allReactions = getStoredReactions();

  const filteredReactions = allReactions.filter(
    (r) => !(r.employeeId === data.employeeId && r.deviceId === data.deviceId)
  );

  saveReactions(filteredReactions);
};
