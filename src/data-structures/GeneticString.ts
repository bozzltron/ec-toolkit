/**
 * Genetic String - string-based individual representation
 */

import { Individual } from '../types';
import { getRandomNumberBetween, sampleString } from '../utils/util';

export class GeneticString implements Individual {
  code: string = '';
  fitness: number = 0;
  rawFitness?: number;
  rank?: number;
  id?: string;

  constructor(code?: string) {
    this.code = code || '';
  }

  /**
   * Generate random string from character set
   */
  generate(characters: string[], length: number): void {
    this.code = sampleString(characters, length);
  }

  /**
   * Mutate the string
   * @param charsToMutate - Number of characters to mutate
   * @param characters - Available characters for mutation
   * @param type - Mutation type: 0=add, 1=swap, 2=remove (default: random)
   */
  mutate(charsToMutate: number, characters: string[], type?: number): void {
    if (this.code.length === 0 && charsToMutate > 0) {
      // If empty, just generate
      this.generate(characters, charsToMutate);
      return;
    }

    const mutationType = type !== undefined ? type : this.getRandomInt(3);

    for (let i = 0; i < charsToMutate; i++) {
      const index = this.getRandomInt(Math.max(0, this.code.length - 1));
      const sampleChar = characters[Math.floor(Math.random() * characters.length)];

      switch (mutationType) {
        case 0:
          // Add character
          this.code = this.code.concat(sampleChar);
          break;
        case 1:
          // Swap character
          this.code = this.replaceAt(index, sampleChar);
          break;
        case 2:
          // Remove character
          if (this.code.length > 1) {
            this.code = this.code.slice(0, index) + this.code.slice(index + 1);
          }
          break;
      }
    }
  }

  /**
   * Crossover with another GeneticString
   */
  crossoverWith(other: GeneticString): GeneticString {
    if (this.code.length === 0) {
      return new GeneticString(other.code);
    }
    if (other.code.length === 0) {
      return new GeneticString(this.code);
    }

    const breakpoint = getRandomNumberBetween(1, Math.max(1, this.code.length - 1));
    const dadPart = this.code.split('').slice(0, breakpoint);
    const momPart = other.code.split('').slice(breakpoint);

    return new GeneticString(dadPart.concat(momPart).join(''));
  }

  /**
   * Replace character at index
   */
  private replaceAt(index: number, replacement: string): string {
    if (index < 0 || index >= this.code.length) {
      return this.code;
    }
    return this.code.substr(0, index) + replacement + this.code.substr(index + replacement.length);
  }

  /**
   * Get random integer between 0 and max (inclusive)
   */
  private getRandomInt(max: number): number {
    return Math.floor(Math.random() * Math.floor(max + 1));
  }

  /**
   * Clone the individual
   */
  clone(): GeneticString {
    const cloned = new GeneticString(this.code);
    cloned.fitness = this.fitness;
    cloned.rawFitness = this.rawFitness;
    cloned.rank = this.rank;
    cloned.id = this.id;
    return cloned;
  }
}

