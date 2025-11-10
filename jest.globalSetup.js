// Global setup runs once before all test suites
// This is the earliest place to add fetch API polyfills

module.exports = async () => {
  // Load undici and set up global fetch API
  try {
    const { Request, Response, Headers, FormData, fetch } = require('undici');
    
    global.Request = Request;
    global.Response = Response;
    global.Headers = Headers;
    global.FormData = FormData;
    global.fetch = fetch;
    
    console.log('✓ Undici fetch polyfills loaded globally');
  } catch (err) {
    console.error('Failed to load undici polyfills:', err.message);
  }
};
