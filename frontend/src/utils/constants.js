export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
export const APP_NAME = import.meta.env.VITE_APP_NAME || 'NEET Platform';

export const TEST_TYPES = {
  DPP_TEST: 'DPP_TEST',
  NEET_MOCK: 'NEET_MOCK',
  PYQ: 'PYQ',
  DPP: 'DPP',
  CHAPTERWISE: 'CHAPTERWISE',
};

export const DIFFICULTY = {
  EASY: 'Easy',
  MEDIUM: 'Medium',
  HARD: 'Hard',
};

export const SUBJECTS = {
  PHYSICS: 'Physics',
  CHEMISTRY: 'Chemistry',
  BIOLOGY: 'Biology',
};

export const ROLES = {
  USER: 'user',
  ADMIN: 'admin',
};

export const ANALYTICS_THRESHOLDS = {
  WEAK: 50,
  STRONG: 70,
};

export const TEST_DURATION = {
  NEET_MOCK: 180 * 60,
  DPP_TEST: 60 * 60,
};

export const PAGE_SIZE = 20;

export const STORAGE_KEYS = {
  TOKEN: 'neet_token',
  USER: 'neet_user',
  THEME: 'neet_theme',
};
