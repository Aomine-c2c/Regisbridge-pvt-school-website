/**
 * Lightweight Physics subsystem stub
 * Provides a stable API surface for future physics engine integration.
 */
export interface PhysicsEngine {
  init(): Promise<void>;
  simulateStep(deltaMs: number): Promise<void>;
  shutdown(): Promise<void>;
}

export const createPhysicsEngine = (): PhysicsEngine => {
  return {
    async init() {
      // stubbed
      return;
    },
    async simulateStep(_deltaMs: number) {
      // stubbed - no simulation
      return;
    },
    async shutdown() {
      // stubbed
      return;
    },
  };
};

export default createPhysicsEngine;
