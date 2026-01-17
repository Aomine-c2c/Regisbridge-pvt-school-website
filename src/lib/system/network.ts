/**
 * Lightweight Network subsystem stub
 * Purpose: centralize and abstract network operations (realtime/RTC)
 */
export interface NetworkEngine {
  init(): Promise<void>;
  connect(endpoint: string): Promise<void>;
  disconnect(): Promise<void>;
}

export const createNetworkEngine = (): NetworkEngine => {
  return {
    async init() {
      // no-op stub
      return;
    },
    async connect(_endpoint: string) {
      // stubbed - no real connection
      return;
    },
    async disconnect() {
      // stubbed
      return;
    },
  };
};

export default createNetworkEngine;
