/**
 * Utility functions for EC-Toolkit
 */

/**
 * Get a random integer between min and max (inclusive)
 */
export function getRandomNumberBetween(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

/**
 * Sample random elements from an array
 */
export function sample<T>(array: T[], count: number = 1): T[] {
  const result: T[] = [];
  for (let i = 0; i < count; i++) {
    result.push(array[Math.floor(Math.random() * array.length)]);
  }
  return result;
}

/**
 * Sample a random string from character array
 */
export function sampleString(characters: string[], length: number): string {
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters[Math.floor(Math.random() * characters.length)];
  }
  return result;
}

/**
 * Calculate proximity score to target value
 */
export function proximityTo(target: number, result: number): number {
  if (target === result) return Infinity;
  return Math.round((1 / Math.abs(target - result)) * 100);
}

/**
 * Calculate mean of numbers
 */
export function mean(numbers: number[]): number {
  if (numbers.length === 0) return 0;
  return numbers.reduce((sum, n) => sum + n, 0) / numbers.length;
}

/**
 * Calculate standard deviation
 */
export function standardDeviation(numbers: number[]): number {
  if (numbers.length === 0) return 0;
  const avg = mean(numbers);
  const squareDiffs = numbers.map(n => Math.pow(n - avg, 2));
  return Math.sqrt(mean(squareDiffs));
}

/**
 * Calculate diversity (average pairwise distance)
 */
export function calculateDiversity<T>(
  population: T[],
  distanceFn: (a: T, b: T) => number
): number {
  if (population.length < 2) return 0;
  
  let totalDistance = 0;
  let comparisons = 0;
  
  for (let i = 0; i < population.length; i++) {
    for (let j = i + 1; j < population.length; j++) {
      totalDistance += distanceFn(population[i], population[j]);
      comparisons++;
    }
  }
  
  return comparisons > 0 ? totalDistance / comparisons : 0;
}

/**
 * Shuffle array in place (Fisher-Yates)
 */
export function shuffle<T>(array: T[]): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

/**
 * Clamp value between min and max
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

