import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const envPath = path.resolve(__dirname, '..', '.env');
const envLocalPath = path.resolve(__dirname, '..', '.env.local');

function parseEnv(filePath) {
  if (!fs.existsSync(filePath)) return {};
  const content = fs.readFileSync(filePath, 'utf-8');
  const env = {};
  content.split('\n').forEach(line => {
    const match = line.match(/^\s*([\w\.\-]+)\s*=\s*(.*)?\s*$/);
    if (match) {
      env[match[1]] = match[2] ? match[2].trim() : '';
    }
  });
  return env;
}

const env = { ...parseEnv(envPath), ...parseEnv(envLocalPath) };

const REQUIRED_KEYS = [
  'JWT_SECRET',
  'JWT_REFRESH_SECRET',
  'DATABASE_URL',
  'NEXT_PUBLIC_PUSHER_KEY',
  'NEXT_PUBLIC_PUSHER_CLUSTER'
];

console.log('Checking environment variables...');
const missing = [];
REQUIRED_KEYS.forEach(key => {
  if (!env[key]) {
    console.error(`❌ Missing: ${key}`);
    missing.push(key);
  } else {
    // Mask secret values for log safety
    const val = env[key];
    const masked = val.length > 5 ? val.substring(0, 2) + '***' + val.substring(val.length - 2) : '***';
    console.log(`✅ Found: ${key}`);
  }
});

if (missing.length > 0) {
  console.error('Missing keys:', missing.join(', '));
  process.exit(1);
} else {
  console.log('All required keys found.');
}
