import fs from 'fs/promises';
import path from 'path';

const SETTINGS_FILE = path.join(process.cwd(), 'config', 'settings.json');

export interface Settings {
  emailEnabled: boolean;
  smtpServer: string;
  smtpPort: string;
  smtpUsername: string;
  smtpPassword: string;
  emailFromAddress: string;
  emailFromName: string;

  smsEnabled: boolean;
  smsProvider: string;
  smsApiKey: string;
  smsFromNumber: string;

  enableEmailNotifications: boolean;
  enableSMSNotifications: boolean;
  enablePushNotifications: boolean;
  notifyOnNewRegistration: boolean;
  notifyOnPayment: boolean;
  notifyOnAttendance: boolean;

  schoolName: string;
  schoolEmail: string;
  schoolPhone: string;
  schoolAddress: string;
  academicYear: string;
  currency: string;
  timezone: string;
  dateFormat: string;

  enableTwoFactor: boolean;
  sessionTimeout: number;
  passwordMinLength: number;
  passwordRequireSpecialChar: boolean;
  maxLoginAttempts: number;

  autoBackupEnabled: boolean;
  backupFrequency: string;
  backupTime: string;
  backupRetentionDays: number;
}

export const defaultSettings: Settings = {
  emailEnabled: true,
  smtpServer: 'smtp.gmail.com',
  smtpPort: '587',
  smtpUsername: 'admin@regisbridge.ac.zw',
  smtpPassword: '',
  emailFromAddress: 'noreply@regisbridge.ac.zw',
  emailFromName: 'Regisbridge School',

  smsEnabled: false,
  smsProvider: 'twilio',
  smsApiKey: '',
  smsFromNumber: '',

  enableEmailNotifications: true,
  enableSMSNotifications: false,
  enablePushNotifications: true,
  notifyOnNewRegistration: true,
  notifyOnPayment: true,
  notifyOnAttendance: false,

  schoolName: 'Regisbridge Private School',
  schoolEmail: 'info@regisbridge.ac.zw',
  schoolPhone: '+263 4 123456',
  schoolAddress: '123 Education Street, Harare, Zimbabwe',
  academicYear: '2025',
  currency: 'USD',
  timezone: 'Africa/Harare',
  dateFormat: 'DD/MM/YYYY',

  enableTwoFactor: false,
  sessionTimeout: 60,
  passwordMinLength: 8,
  passwordRequireSpecialChar: true,
  maxLoginAttempts: 5,

  autoBackupEnabled: true,
  backupFrequency: 'daily',
  backupTime: '02:00',
  backupRetentionDays: 30,
};

// Ensure config dir exists
async function ensureConfigDir() {
  const dir = path.dirname(SETTINGS_FILE);
  try {
    await fs.access(dir);
  } catch {
    await fs.mkdir(dir, { recursive: true });
  }
}

export async function getSettings(): Promise<Settings> {
  try {
    await ensureConfigDir();
    const data = await fs.readFile(SETTINGS_FILE, 'utf-8');
    const parsed = JSON.parse(data);
    return { ...defaultSettings, ...parsed }; // Merge with defaults to ensure all keys exist
  } catch (error) {
    // If file doesn't exist or error, return defaults
    return defaultSettings;
  }
}

export async function saveSettings(newSettings: Partial<Settings>): Promise<Settings> {
  const current = await getSettings();
  const updated = { ...current, ...newSettings };
  
  await ensureConfigDir();
  await fs.writeFile(SETTINGS_FILE, JSON.stringify(updated, null, 2), 'utf-8');
  return updated;
}
