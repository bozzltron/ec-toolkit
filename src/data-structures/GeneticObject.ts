/**
 * Genetic Object - object-based individual representation
 */

import { Individual } from '../types';
import { getRandomNumberBetween } from '../utils/util';

export class GeneticObject implements Individual {
  fitness: number = 0;
  rawFitness?: number;
  rank?: number;
  id?: string;
  [key: string]: any;

  constructor(obj: Record<string, any> = {}) {
    Object.assign(this, obj);
  }

  /**
   * Crossover with another GeneticObject
   */
  crossoverWith(other: GeneticObject): GeneticObject {
    const child: Record<string, any> = {};
    // Copy all properties from this
    Object.keys(this).forEach(key => {
      if (key !== 'fitness' && key !== 'rawFitness' && key !== 'rank' && key !== 'id') {
        child[key] = (this as any)[key];
      }
    });
    
    const length = Object.getOwnPropertyNames(other).length;
    const index = getRandomNumberBetween(1, Math.max(1, length - 1));
    const otherKeys = Object.keys(other);

    for (let i = index; i < length; i++) {
      const key = otherKeys[i];
      if (key !== 'fitness' && key !== 'rawFitness' && key !== 'rank' && key !== 'id') {
        child[key] = (other as any)[key];
      }
    }

    return new GeneticObject(child);
  }

  /**
   * Clone the individual
   */
  clone(): GeneticObject {
    const cloned = new GeneticObject();
    Object.assign(cloned, this);
    return cloned;
  }
}

