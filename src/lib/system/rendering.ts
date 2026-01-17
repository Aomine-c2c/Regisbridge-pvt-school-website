/**
 * Lightweight Rendering subsystem stub
 * Purpose: provide hooks for rendering pipeline, resource management and post-processing
 */
export interface RenderingEngine {
  init(): Promise<void>;
  renderFrame(): Promise<void>;
  shutdown(): Promise<void>;
}

export const createRenderingEngine = (): RenderingEngine => {
  return {
    async init() {
      // stubbed
      return;
    },
    async renderFrame() {
      // stubbed - nothing to render
      return;
    },
    async shutdown() {
      // stubbed
      return;
    },
  };
};

export default createRenderingEngine;
