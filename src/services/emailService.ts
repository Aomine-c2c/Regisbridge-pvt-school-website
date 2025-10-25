/**
 * Email Service - Frontend API Client
 * 
 * SECURITY: This file now only makes API calls to a backend service.
 * All API keys and email logic have been moved to the backend.
 * 
 * Backend implementation required at: /api/email
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3002/api";

export interface EmailOptions {
  to: string | string[];
  subject: string;
  text?: string;
  html?: string;
  from?: string;
  replyTo?: string;
}

export interface EmailResponse {
  success: boolean;
  message: string;
  messageId?: string;
}

export const sendEmail = async (options: EmailOptions): Promise<EmailResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/email/send`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(options),
    });
    if (!response.ok) throw new Error(`Email API returned ${response.status}`);
    return await response.json();
  } catch (error) {
    return { 
      success: false, 
      message: error instanceof Error ? error.message : "Failed to send email" 
    };
  }
};

/**
 * Send contact form submission
 */
export const sendContactForm = async (data: {
  name: string;
  email: string;
  phone?: string;
  message: string;
}): Promise<EmailResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error(`Contact API returned ${response.status}`);
    return await response.json();
  } catch (error) {
    return { 
      success: false, 
      message: error instanceof Error ? error.message : "Failed to send message" 
    };
  }
};

/**
 * Subscribe to newsletter
 */
export const subscribeNewsletter = async (data: {
  email: string;
  name?: string;
}): Promise<EmailResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/newsletter/subscribe`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error(`Newsletter API returned ${response.status}`);
    return await response.json();
  } catch (error) {
    return { 
      success: false, 
      message: error instanceof Error ? error.message : "Failed to subscribe" 
    };
  }
};

/**
 * Submit student application
 */
export const submitApplication = async (data: {
  studentName: string;
  parentName: string;
  email: string;
  phone: string;
  grade: string;
  message?: string;
}): Promise<EmailResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/application/submit`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error(`Application API returned ${response.status}`);
    return await response.json();
  } catch (error) {
    return { 
      success: false, 
      message: error instanceof Error ? error.message : "Failed to submit application" 
    };
  }
};

export const emailService = { 
  sendEmail, 
  sendContactForm,
  subscribeNewsletter,
  submitApplication,
};
export default emailService;
