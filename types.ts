import { TRANSLATIONS } from './constants';

export interface CategoryScore {
  label: string;
  raw: string;
  value: number; // 0 to 1
  weight: number;
}

export interface DepartmentData {
  id: string;
  name: string;
  totalScore: number; // 0 to 1
  categories: CategoryScore[];
}

export interface SheetRow {
  [key: string]: string;
}

export interface ThemeColors {
  main: string;        // Button bg, heavy accents (e.g., 'bg-indigo-600')
  hover: string;       // Button hover (e.g., 'hover:bg-indigo-700')
  text: string;        // Primary colored text (e.g., 'text-indigo-600')
  lightBg: string;     // Light backgrounds (e.g., 'bg-indigo-50')
  border: string;      // Borders (e.g., 'border-indigo-100')
  ring: string;        // Focus rings (e.g., 'focus:ring-indigo-500')
}

export interface ThemeConfig {
  id: string;
  type: 'gradient' | 'image';
  value: string; // Tailwind gradient classes or Image URL
  label: string;
  colors: ThemeColors;
  textColor?: string;
}

export interface CardStyleConfig {
  id: string;
  label: string;
  description?: string;
}

export type Language = 'en' | 'ar';
export type Translation = typeof TRANSLATIONS.en;