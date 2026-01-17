// SystemSettings Component - Configure system-wide settings
import { useState } from 'react';
import { AdminHeader } from './shared/AdminHeader';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  Mail, 
  MessageSquare, 
  Bell, 
  Database, 
  Shield, 
  Globe, 
  Save,
  Download,
  Upload,
  RefreshCw,
  AlertCircle
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Settings {
  // Email Settings
  emailEnabled: boolean;
  smtpServer: string;
  smtpPort: string;
  smtpUsername: string;
  smtpPassword: string;
  emailFromAddress: string;
  emailFromName: string;

  // SMS Settings
  smsEnabled: boolean;
  smsProvider: string;
  smsApiKey: string;
  smsFromNumber: string;

  // Notification Settings
  enableEmailNotifications: boolean;
  enableSMSNotifications: boolean;
  enablePushNotifications: boolean;
  notifyOnNewRegistration: boolean;
  notifyOnPayment: boolean;
  notifyOnAttendance: boolean;

  // System Settings
  schoolName: string;
  schoolEmail: string;
  schoolPhone: string;
  schoolAddress: string;
  academicYear: string;
  currency: string;
  timezone: string;
  dateFormat: string;

  // Security Settings
  enableTwoFactor: boolean;
  sessionTimeout: number;
  passwordMinLength: number;
  passwordRequireSpecialChar: boolean;
  maxLoginAttempts: number;

  // Backup Settings
  autoBackupEnabled: boolean;
  backupFrequency: string;
  backupTime: string;
  backupRetentionDays: number;
}

const defaultSettings: Settings = {
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

export function SystemSettings() {
  const { toast } = useToast();
  const [settings, setSettings] = useState<Settings>(defaultSettings);
  const [loading, setLoading] = useState(false);
  const [backupInProgress, setBackupInProgress] = useState(false);

  const updateSetting = (key: keyof Settings, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast({
        title: 'Settings Saved',
        description: 'Your settings have been updated successfully',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to save settings',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleBackupNow = async () => {
    setBackupInProgress(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      toast({
        title: 'Backup Complete',
        description: 'Database backup created successfully',
      });
    } catch (error) {
      toast({
        title: 'Backup Failed',
        description: 'Failed to create database backup',
        variant: 'destructive',
      });
    } finally {
      setBackupInProgress(false);
    }
  };

  const handleRestoreBackup = () => {
    toast({
      title: 'Restore Initiated',
      description: 'Please select a backup file to restore',
    });
  };

  return (
    <div className="space-y-6">
      <AdminHeader
        title="System Settings"
        description="Configure system-wide settings and preferences"
      />

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="grid grid-cols-2 md:grid-cols-5 gap-2">
          <TabsTrigger value="general">
            <Globe className="h-4 w-4 mr-2" />
            General
          </TabsTrigger>
          <TabsTrigger value="email">
            <Mail className="h-4 w-4 mr-2" />
            Email
          </TabsTrigger>
          <TabsTrigger value="notifications">
            <Bell className="h-4 w-4 mr-2" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="security">
            <Shield className="h-4 w-4 mr-2" />
            Security
          </TabsTrigger>
          <TabsTrigger value="backup">
            <Database className="h-4 w-4 mr-2" />
            Backup
          </TabsTrigger>
        </TabsList>

        {/* General Settings */}
        <TabsContent value="general" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>School Information</CardTitle>
              <CardDescription>Basic information about your school</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="schoolName">School Name</Label>
                  <Input
                    id="schoolName"
                    value={settings.schoolName}
                    onChange={(e) => updateSetting('schoolName', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="academicYear">Academic Year</Label>
                  <Input
                    id="academicYear"
                    value={settings.academicYear}
                    onChange={(e) => updateSetting('academicYear', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="schoolEmail">School Email</Label>
                  <Input
                    id="schoolEmail"
                    type="email"
                    value={settings.schoolEmail}
                    onChange={(e) => updateSetting('schoolEmail', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="schoolPhone">School Phone</Label>
                  <Input
                    id="schoolPhone"
                    value={settings.schoolPhone}
                    onChange={(e) => updateSetting('schoolPhone', e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="schoolAddress">School Address</Label>
                <Textarea
                  id="schoolAddress"
                  value={settings.schoolAddress}
                  onChange={(e) => updateSetting('schoolAddress', e.target.value)}
                  rows={3}
                />
              </div>
              <Separator />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="currency">Currency</Label>
                  <Select value={settings.currency} onValueChange={(value) => updateSetting('currency', value)}>
                    <SelectTrigger id="currency">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USD">USD ($)</SelectItem>
                      <SelectItem value="ZWL">ZWL (Z$)</SelectItem>
                      <SelectItem value="ZAR">ZAR (R)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timezone">Timezone</Label>
                  <Select value={settings.timezone} onValueChange={(value) => updateSetting('timezone', value)}>
                    <SelectTrigger id="timezone">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Africa/Harare">Africa/Harare (CAT)</SelectItem>
                      <SelectItem value="Africa/Johannesburg">Africa/Johannesburg (SAST)</SelectItem>
                      <SelectItem value="UTC">UTC</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dateFormat">Date Format</Label>
                  <Select value={settings.dateFormat} onValueChange={(value) => updateSetting('dateFormat', value)}>
                    <SelectTrigger id="dateFormat">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                      <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                      <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Email Settings */}
        <TabsContent value="email" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Email Configuration</CardTitle>
              <CardDescription>Configure SMTP settings for sending emails</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="emailEnabled">Enable Email Service</Label>
                  <p className="text-sm text-gray-500">Allow system to send emails</p>
                </div>
                <Switch
                  id="emailEnabled"
                  checked={settings.emailEnabled}
                  onCheckedChange={(checked) => updateSetting('emailEnabled', checked)}
                />
              </div>
              <Separator />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="smtpServer">SMTP Server</Label>
                  <Input
                    id="smtpServer"
                    value={settings.smtpServer}
                    onChange={(e) => updateSetting('smtpServer', e.target.value)}
                    disabled={!settings.emailEnabled}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="smtpPort">SMTP Port</Label>
                  <Input
                    id="smtpPort"
                    value={settings.smtpPort}
                    onChange={(e) => updateSetting('smtpPort', e.target.value)}
                    disabled={!settings.emailEnabled}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="smtpUsername">SMTP Username</Label>
                  <Input
                    id="smtpUsername"
                    value={settings.smtpUsername}
                    onChange={(e) => updateSetting('smtpUsername', e.target.value)}
                    disabled={!settings.emailEnabled}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="smtpPassword">SMTP Password</Label>
                  <Input
                    id="smtpPassword"
                    type="password"
                    value={settings.smtpPassword}
                    onChange={(e) => updateSetting('smtpPassword', e.target.value)}
                    disabled={!settings.emailEnabled}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="emailFromAddress">From Email Address</Label>
                  <Input
                    id="emailFromAddress"
                    type="email"
                    value={settings.emailFromAddress}
                    onChange={(e) => updateSetting('emailFromAddress', e.target.value)}
                    disabled={!settings.emailEnabled}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="emailFromName">From Name</Label>
                  <Input
                    id="emailFromName"
                    value={settings.emailFromName}
                    onChange={(e) => updateSetting('emailFromName', e.target.value)}
                    disabled={!settings.emailEnabled}
                  />
                </div>
              </div>
              <Button variant="outline" disabled={!settings.emailEnabled}>
                <Mail className="h-4 w-4 mr-2" />
                Test Email Configuration
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>SMS Configuration</CardTitle>
              <CardDescription>Configure SMS gateway for sending text messages</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="smsEnabled">Enable SMS Service</Label>
                  <p className="text-sm text-gray-500">Allow system to send SMS messages</p>
                </div>
                <Switch
                  id="smsEnabled"
                  checked={settings.smsEnabled}
                  onCheckedChange={(checked) => updateSetting('smsEnabled', checked)}
                />
              </div>
              <Separator />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="smsProvider">SMS Provider</Label>
                  <Select 
                    value={settings.smsProvider} 
                    onValueChange={(value) => updateSetting('smsProvider', value)}
                    disabled={!settings.smsEnabled}
                  >
                    <SelectTrigger id="smsProvider">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="twilio">Twilio</SelectItem>
                      <SelectItem value="africastalking">Africa's Talking</SelectItem>
                      <SelectItem value="clickatell">Clickatell</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="smsFromNumber">From Number</Label>
                  <Input
                    id="smsFromNumber"
                    value={settings.smsFromNumber}
                    onChange={(e) => updateSetting('smsFromNumber', e.target.value)}
                    disabled={!settings.smsEnabled}
                    placeholder="+1234567890"
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="smsApiKey">API Key</Label>
                  <Input
                    id="smsApiKey"
                    type="password"
                    value={settings.smsApiKey}
                    onChange={(e) => updateSetting('smsApiKey', e.target.value)}
                    disabled={!settings.smsEnabled}
                  />
                </div>
              </div>
              <Button variant="outline" disabled={!settings.smsEnabled}>
                <MessageSquare className="h-4 w-4 mr-2" />
                Test SMS Configuration
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notification Settings */}
        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Notification Channels</CardTitle>
              <CardDescription>Choose how you want to receive notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="enableEmailNotifications">Email Notifications</Label>
                  <p className="text-sm text-gray-500">Receive notifications via email</p>
                </div>
                <Switch
                  id="enableEmailNotifications"
                  checked={settings.enableEmailNotifications}
                  onCheckedChange={(checked) => updateSetting('enableEmailNotifications', checked)}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="enableSMSNotifications">SMS Notifications</Label>
                  <p className="text-sm text-gray-500">Receive notifications via SMS</p>
                </div>
                <Switch
                  id="enableSMSNotifications"
                  checked={settings.enableSMSNotifications}
                  onCheckedChange={(checked) => updateSetting('enableSMSNotifications', checked)}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="enablePushNotifications">Push Notifications</Label>
                  <p className="text-sm text-gray-500">Receive push notifications in browser</p>
                </div>
                <Switch
                  id="enablePushNotifications"
                  checked={settings.enablePushNotifications}
                  onCheckedChange={(checked) => updateSetting('enablePushNotifications', checked)}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Notification Events</CardTitle>
              <CardDescription>Choose which events trigger notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="notifyOnNewRegistration">New Student Registration</Label>
                  <p className="text-sm text-gray-500">Notify when a new student registers</p>
                </div>
                <Switch
                  id="notifyOnNewRegistration"
                  checked={settings.notifyOnNewRegistration}
                  onCheckedChange={(checked) => updateSetting('notifyOnNewRegistration', checked)}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="notifyOnPayment">Fee Payments</Label>
                  <p className="text-sm text-gray-500">Notify when fees are paid</p>
                </div>
                <Switch
                  id="notifyOnPayment"
                  checked={settings.notifyOnPayment}
                  onCheckedChange={(checked) => updateSetting('notifyOnPayment', checked)}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="notifyOnAttendance">Attendance Alerts</Label>
                  <p className="text-sm text-gray-500">Notify on attendance issues</p>
                </div>
                <Switch
                  id="notifyOnAttendance"
                  checked={settings.notifyOnAttendance}
                  onCheckedChange={(checked) => updateSetting('notifyOnAttendance', checked)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Settings */}
        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Authentication Security</CardTitle>
              <CardDescription>Configure authentication and access control</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="enableTwoFactor">Two-Factor Authentication</Label>
                  <p className="text-sm text-gray-500">Require 2FA for admin accounts</p>
                </div>
                <Switch
                  id="enableTwoFactor"
                  checked={settings.enableTwoFactor}
                  onCheckedChange={(checked) => updateSetting('enableTwoFactor', checked)}
                />
              </div>
              <Separator />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
                  <Input
                    id="sessionTimeout"
                    type="number"
                    value={settings.sessionTimeout}
                    onChange={(e) => updateSetting('sessionTimeout', parseInt(e.target.value))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="maxLoginAttempts">Max Login Attempts</Label>
                  <Input
                    id="maxLoginAttempts"
                    type="number"
                    value={settings.maxLoginAttempts}
                    onChange={(e) => updateSetting('maxLoginAttempts', parseInt(e.target.value))}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Password Policy</CardTitle>
              <CardDescription>Set password requirements for all users</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="passwordMinLength">Minimum Password Length</Label>
                <Input
                  id="passwordMinLength"
                  type="number"
                  value={settings.passwordMinLength}
                  onChange={(e) => updateSetting('passwordMinLength', parseInt(e.target.value))}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="passwordRequireSpecialChar">Require Special Characters</Label>
                  <p className="text-sm text-gray-500">Password must contain special characters</p>
                </div>
                <Switch
                  id="passwordRequireSpecialChar"
                  checked={settings.passwordRequireSpecialChar}
                  onCheckedChange={(checked) => updateSetting('passwordRequireSpecialChar', checked)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Backup Settings */}
        <TabsContent value="backup" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Automated Backups</CardTitle>
              <CardDescription>Configure automatic database backups</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="autoBackupEnabled">Enable Automatic Backups</Label>
                  <p className="text-sm text-gray-500">Automatically backup database</p>
                </div>
                <Switch
                  id="autoBackupEnabled"
                  checked={settings.autoBackupEnabled}
                  onCheckedChange={(checked) => updateSetting('autoBackupEnabled', checked)}
                />
              </div>
              <Separator />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="backupFrequency">Backup Frequency</Label>
                  <Select 
                    value={settings.backupFrequency} 
                    onValueChange={(value) => updateSetting('backupFrequency', value)}
                    disabled={!settings.autoBackupEnabled}
                  >
                    <SelectTrigger id="backupFrequency">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hourly">Hourly</SelectItem>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="backupTime">Backup Time</Label>
                  <Input
                    id="backupTime"
                    type="time"
                    value={settings.backupTime}
                    onChange={(e) => updateSetting('backupTime', e.target.value)}
                    disabled={!settings.autoBackupEnabled}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="backupRetentionDays">Retention (days)</Label>
                  <Input
                    id="backupRetentionDays"
                    type="number"
                    value={settings.backupRetentionDays}
                    onChange={(e) => updateSetting('backupRetentionDays', parseInt(e.target.value))}
                    disabled={!settings.autoBackupEnabled}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Manual Backup & Restore</CardTitle>
              <CardDescription>Create or restore backups manually</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-4 p-4 border rounded-lg bg-amber-50 border-amber-200">
                <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-amber-900">Important</p>
                  <p className="text-sm text-amber-700">
                    Creating a backup will temporarily lock the database. 
                    It's recommended to do this during off-peak hours.
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <Button onClick={handleBackupNow} disabled={backupInProgress}>
                  {backupInProgress ? (
                    <>
                      <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                      Creating Backup...
                    </>
                  ) : (
                    <>
                      <Download className="h-4 w-4 mr-2" />
                      Create Backup Now
                    </>
                  )}
                </Button>
                <Button variant="outline" onClick={handleRestoreBackup}>
                  <Upload className="h-4 w-4 mr-2" />
                  Restore from Backup
                </Button>
              </div>
              <Separator />
              <div>
                <Label className="mb-2 block">Recent Backups</Label>
                <div className="space-y-2">
                  {['backup_2025-11-10_02-00.sql', 'backup_2025-11-09_02-00.sql', 'backup_2025-11-08_02-00.sql'].map((backup, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <Database className="h-4 w-4 text-gray-500" />
                        <span className="text-sm font-medium">{backup}</span>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="ghost">
                          <Download className="h-3 w-3" />
                        </Button>
                        <Button size="sm" variant="ghost">
                          <Upload className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Save Button */}
      <div className="flex justify-end sticky bottom-6 z-10">
        <Button onClick={handleSave} size="lg" disabled={loading} className="shadow-lg">
          {loading ? (
            <>
              <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="h-4 w-4 mr-2" />
              Save All Settings
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
