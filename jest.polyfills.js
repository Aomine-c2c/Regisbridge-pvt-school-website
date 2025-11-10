// This runs in each test worker BEFORE setupFilesAfterEnv
// Load undici fetch polyfills for Node test environment

try {
  const { Request, Response, Headers, FormData, fetch } = require('undici');
  
  globalThis.Request = Request;
  globalThis.Response = Response;
  globalThis.Headers = Headers;
  globalThis.FormData = FormData;
  globalThis.fetch = fetch;
} catch (err) {
  // Fail silently - tests will fail with more specific errors if fetch is truly needed
}
