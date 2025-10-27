// src/utils/cn.js
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combines class names, handles conditionals and merges Tailwind CSS classes.
 *
 * @param  {...any} inputs - Class names or conditional objects.
 * @return {string} - The merged class string.
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
