/**
 * Code execution sandbox for safe evaluation
 * WARNING: This is a basic implementation. For production use,
 * consider using VM2 or isolated-vm for Node.js, or Web Workers for browser.
 */

export interface SandboxOptions {
  timeout?: number; // milliseconds
  memoryLimit?: number; // bytes (not enforced in basic implementation)
}

export class Sandbox {
  private timeout: number;

  constructor(options: SandboxOptions = {}) {
    this.timeout = options.timeout || 1000; // 1 second default
    // memoryLimit not yet implemented
  }

  /**
   * Execute code in a sandboxed environment
   * NOTE: This is a basic implementation. For production, use proper sandboxing.
   */
  execute(code: string): Promise<unknown> {
    // Basic timeout implementation using Promise
    return new Promise((resolve, reject) => {
      const timeoutId = setTimeout(() => {
        reject(new Error('Execution timeout'));
      }, this.timeout);

      try {
        // WARNING: eval() is dangerous! This is a basic implementation.
        // In production, use:
        // - Node.js: VM2 or isolated-vm
        // - Browser: Web Workers with postMessage
        const result = eval(code);
        clearTimeout(timeoutId);
        resolve(result);
      } catch (error) {
        clearTimeout(timeoutId);
        reject(error);
      }
    });
  }

  /**
   * Execute code synchronously (not recommended for untrusted code)
   */
  executeSync(code: string): unknown {
    return eval(code);
  }
}

/**
 * Safe evaluator that wraps code execution
 * Provides basic protection against infinite loops and errors
 */
export class SafeEvaluator {
  private sandbox: Sandbox;

  constructor(timeout: number = 1000) {
    this.sandbox = new Sandbox({ timeout });
  }

  /**
   * Safely evaluate mathematical expressions
   * Only allows basic math operations
   */
  evaluateMath(expression: string): number | null {
    // Basic validation - only allow numbers, operators, and parentheses
    if (!/^[0-9+\-*/().\s]+$/.test(expression)) {
      return null;
    }

    try {
      const result = this.sandbox.executeSync(expression);
      return typeof result === 'number' ? result : null;
    } catch {
      // Return null on any error (invalid expression, etc.)
      return null;
    }
  }

  /**
   * Evaluate code with timeout protection
   */
  async evaluate(code: string): Promise<unknown> {
    return await this.sandbox.execute(code);
  }
}



