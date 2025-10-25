// Form validation utilities for Regisbridge School Website

export interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: string) => string | null;
}

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export const validateField = (value: string, rules: ValidationRule): ValidationResult => {
  const errors: string[] = [];

  // Required validation
  if (rules.required && (!value || value.trim() === '')) {
    errors.push('This field is required');
  }

  // Skip other validations if field is empty and not required
  if (!value && !rules.required) {
    return { isValid: true, errors: [] };
  }

  // Min length validation
  if (rules.minLength && value.length < rules.minLength) {
    errors.push(`Must be at least ${rules.minLength} characters long`);
  }

  // Max length validation
  if (rules.maxLength && value.length > rules.maxLength) {
    errors.push(`Must be no more than ${rules.maxLength} characters long`);
  }

  // Pattern validation
  if (rules.pattern && !rules.pattern.test(value)) {
    errors.push('Invalid format');
  }

  // Custom validation
  if (rules.custom) {
    const customError = rules.custom(value);
    if (customError) {
      errors.push(customError);
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

export const validateEmail = (email: string): ValidationResult => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return validateField(email, {
    required: true,
    pattern: emailPattern,
  });
};

export const validatePhone = (phone: string): ValidationResult => {
  const phonePattern = /^\+?[\d\s\-\(\)]+$/;
  return validateField(phone, {
    required: true,
    minLength: 10,
    maxLength: 15,
    pattern: phonePattern,
  });
};

export const validatePassword = (password: string): ValidationResult => {
  return validateField(password, {
    required: true,
    minLength: 6,
    custom: (value) => {
      if (!/(?=.*[a-z])/.test(value)) {
        return 'Password must contain at least one lowercase letter';
      }
      if (!/(?=.*[A-Z])/.test(value)) {
        return 'Password must contain at least one uppercase letter';
      }
      if (!/(?=.*\d)/.test(value)) {
        return 'Password must contain at least one number';
      }
      return null;
    },
  });
};

export const validateName = (name: string): ValidationResult => {
  return validateField(name, {
    required: true,
    minLength: 2,
    maxLength: 50,
    pattern: /^[a-zA-Z\s]+$/,
  });
};

export const validateForm = (formData: Record<string, string>, rules: Record<string, ValidationRule>): {
  isValid: boolean;
  errors: Record<string, string[]>;
} => {
  const errors: Record<string, string[]> = {};
  let isValid = true;

  Object.entries(formData).forEach(([field, value]) => {
    const fieldRules = rules[field];
    if (fieldRules) {
      const result = validateField(value, fieldRules);
      if (!result.isValid) {
        errors[field] = result.errors;
        isValid = false;
      }
    }
  });

  return { isValid, errors };
};

// Specific validation schemas for different forms
export const loginValidationRules: Record<string, ValidationRule> = {
  email: {
    required: true,
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
  password: {
    required: true,
    minLength: 6,
  },
};

export const applicationValidationRules: Record<string, ValidationRule> = {
  firstName: {
    required: true,
    minLength: 2,
    maxLength: 50,
    pattern: /^[a-zA-Z\s]+$/,
  },
  lastName: {
    required: true,
    minLength: 2,
    maxLength: 50,
    pattern: /^[a-zA-Z\s]+$/,
  },
  email: {
    required: true,
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
  phone: {
    required: true,
    minLength: 10,
    maxLength: 15,
    pattern: /^\+?[\d\s\-\(\)]+$/,
  },
  dateOfBirth: {
    required: true,
  },
  address: {
    required: true,
    minLength: 10,
    maxLength: 200,
  },
  parentName: {
    required: true,
    minLength: 2,
    maxLength: 100,
  },
  parentEmail: {
    required: true,
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
  currentSchool: {
    required: true,
    minLength: 2,
    maxLength: 100,
  },
  gradeApplying: {
    required: true,
  },
};