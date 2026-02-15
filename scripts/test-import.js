import { hashPassword } from '../src/lib/password.js'; // Check password lib first
import { generateAccessToken } from '../src/lib/auth-service.js';

console.log('Imports successful');

// Check bcrypt import indirectly (via password lib)
try {
  await hashPassword('test');
  console.log('hashPassword works');
} catch (e) {
  console.error('hashPassword failed:', e);
}

try {
  await generateAccessToken({ userId: '1', email: 'test@test.com', role: 'user', permissions: [] });
  console.log('generateAccessToken works');
} catch (e) {
  console.error('generateAccessToken failed:', e);
}
