import twilio from 'twilio';

// SMS service configuration
class SMSService {
  private client: any = null;
  private configured = false;

  constructor() {
    // Configure Twilio if credentials are available
    const accountSid = process.env.REACT_APP_TWILIO_ACCOUNT_SID;
    const authToken = process.env.REACT_APP_TWILIO_AUTH_TOKEN;
    const fromNumber = process.env.REACT_APP_TWILIO_PHONE_NUMBER;

    if (accountSid && authToken && fromNumber) {
      this.client = twilio(accountSid, authToken);
      this.configured = true;
    }
  }

  async sendSMS(to: string, message: string) {
    // Validate phone number format (basic validation)
    const phoneRegex = /^\+[1-9]\d{1,14}$/;
    if (!phoneRegex.test(to)) {
      return { success: false, error: 'Invalid phone number format. Use international format: +1234567890' };
    }

    try {
      if (this.configured && this.client) {
        const result = await this.client.messages.create({
          body: message,
          from: process.env.REACT_APP_TWILIO_PHONE_NUMBER,
          to: to
        });

        console.log('SMS sent via Twilio:', result.sid);
        return { success: true, messageId: result.sid };
      } else {
        // Mock SMS sending for development
        console.log('Mock SMS sent:', { to, message: message.substring(0, 50) + '...' });
        return { success: true, mock: true, messageId: 'mock-' + Date.now() };
      }
    } catch (error) {
      console.error('SMS sending failed:', error);
      return { success: false, error };
    }
  }

  // Pre-built SMS templates
  async sendMeetingReminder(to: string, meetingDetails: any) {
    const message = `Regisbridge School: Your meeting "${meetingDetails.topic}" with ${meetingDetails.teacherName} is scheduled for ${meetingDetails.date} at ${meetingDetails.time}. ${meetingDetails.meetingType === 'virtual' ? 'Meeting link will be sent 15 minutes before.' : 'Please arrive 10 minutes early.'}`;

    return this.sendSMS(to, message);
  }

  async sendEventReminder(to: string, eventDetails: any) {
    const message = `Regisbridge School: Reminder - ${eventDetails.title} on ${eventDetails.date} at ${eventDetails.time}. Location: ${eventDetails.location}. We look forward to seeing you!`;

    return this.sendSMS(to, message);
  }

  async sendEmergencyAlert(to: string, alertMessage: string) {
    const message = `URGENT: Regisbridge School Alert - ${alertMessage}. Please check your email or contact the school office for more details.`;

    return this.sendSMS(to, message);
  }

  async sendGradeNotification(to: string, gradeDetails: any) {
    const message = `Regisbridge School: ${gradeDetails.studentName}'s ${gradeDetails.term} report is ready. Overall grade: ${gradeDetails.overallGrade}. Please log in to the parent portal to view the complete report.`;

    return this.sendSMS(to, message);
  }

  async sendPaymentReminder(to: string, paymentDetails: any) {
    const message = `Regisbridge School: Payment reminder for ${paymentDetails.studentName}. Amount: ${paymentDetails.amount}. Due date: ${paymentDetails.dueDate}. Please ensure payment is made on time.`;

    return this.sendSMS(to, message);
  }

  async sendWelcomeMessage(to: string, studentName: string) {
    const message = `Welcome to Regisbridge School, ${studentName}! We're excited to have you join our community. Your parent portal access details have been sent to your email.`;

    return this.sendSMS(to, message);
  }

  // Bulk SMS sending for campaigns
  async sendBulkSMS(recipients: string[], message: string) {
    const results = [];

    for (const recipient of recipients) {
      try {
        const result = await this.sendSMS(recipient, message);
        results.push({ recipient, ...result });
        // Add small delay between messages to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 100));
      } catch (error) {
        results.push({ recipient, success: false, error });
      }
    }

    return results;
  }

  // Format phone number to international format
  formatPhoneNumber(phoneNumber: string, countryCode: string = '+263'): string {
    // Remove all non-digit characters
    const digitsOnly = phoneNumber.replace(/\D/g, '');

    // If it starts with country code, add +
    if (digitsOnly.startsWith(countryCode.replace('+', ''))) {
      return '+' + digitsOnly;
    }

    // If it starts with 0, replace with country code
    if (digitsOnly.startsWith('0')) {
      return countryCode + digitsOnly.substring(1);
    }

    // If it doesn't start with +, assume it's local and add country code
    if (!digitsOnly.startsWith('+')) {
      return countryCode + digitsOnly;
    }

    return phoneNumber;
  }

  // Validate phone number
  isValidPhoneNumber(phoneNumber: string): boolean {
    const phoneRegex = /^\+[1-9]\d{1,14}$/;
    return phoneRegex.test(phoneNumber);
  }
}

// Export singleton instance
export const smsService = new SMSService();
export default smsService;