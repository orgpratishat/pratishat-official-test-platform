export const isValidEmail = email =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export const isValidPassword = pwd =>
  pwd && pwd.length >= 6;

export const isValidUsername = u =>
  /^[a-zA-Z0-9_]{3,20}$/.test(u);

export const isRequired = v =>
  v != null && v !== '';

export const validateForm = (data, rules) => {
  const errors = {};
  for (const field in rules) {
    const val = data[field];
    const r = rules[field];
    if (r.required && !isRequired(val)) {
      errors[field] = `${field} is required`;
    } else if (r.email && !isValidEmail(val)) {
      errors[field] = 'Invalid email';
    } else if (r.password && !isValidPassword(val)) {
      errors[field] = 'Password too short';
    } else if (r.username && !isValidUsername(val)) {
      errors[field] = 'Username invalid';
    } else if (r.min && val.length < r.min) {
      errors[field] = `Minimum ${r.min} chars`;
    } else if (r.max && val.length > r.max) {
      errors[field] = `Maximum ${r.max} chars`;
    }
  }
  return { isValid: !Object.keys(errors).length, errors };
};
