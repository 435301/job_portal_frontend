//  Email regex for validation
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Mobile regex: exactly 10 digits
const mobileRegex = /^[0-9]{10}$/;

// Define a strong interface for errors
export interface FormErrors {
  email?: string;
  password?: string;
  status?: string; // should be string message, not number
  educationName?: string;
  skillName?: string;
  institutionName?: string;
  jobTitleName?:string;
  noticePeriodName?: string;
}

//  LOGIN FORM VALIDATION
export const validateLoginForm = (formData: { email?: string; password?: string }): FormErrors => {
  const errors: FormErrors = {};

  // Validate Email or Mobile
  if (!formData.email) {
    errors.email = "Email is required";
  } else if (!emailRegex.test(formData.email) && !mobileRegex.test(formData.email)) {
    errors.email = "Enter a valid email or mobile number";
  }

  // Validate Password
  if (!formData.password) {
    errors.password = "Password is required";
  } else if (formData.password.length < 6) {
    errors.password = "Password must be at least 6 characters";
  }

  return errors;
};

//  EDUCATION FORM VALIDATION
export const validateEducationForm = (formData: { educationName?: string; status?: string | number }): FormErrors => {
  const errors: FormErrors = {};

  if (!formData.educationName || !formData.educationName.trim()) {
    errors.educationName = "Education Name is required";
  }

  // If status is expected to be 0 or 1, handle both string/number cases
  if (formData.status === undefined || formData.status === null || formData.status === "") {
    errors.status = "Status is required";
  }

  return errors;
};


//  SKILL FORM VALIDATION
export const validateSkillForm = (formData: { skillName?: string; status?: string | number }): FormErrors => {
  const errors: FormErrors = {};

  if (!formData.skillName || !formData.skillName.trim()) {
    errors.skillName = "Skill Name is required";
  }

  // If status is expected to be 0 or 1, handle both string/number cases
  if (formData.status === undefined || formData.status === null || formData.status === "") {
    errors.status = "Status is required";
  }

  return errors;
};

//  INSTITUTION FORM VALIDATION
export const validateInstitutionForm = (formData: { institutionName?: string; status?: string | number }): FormErrors => {
  const errors: FormErrors = {};

  if (!formData.institutionName || !formData.institutionName.trim()) {
    errors.institutionName = "Institution Name is required";
  }

  // If status is expected to be 0 or 1, handle both string/number cases
  if (formData.status === undefined || formData.status === null || formData.status === "") {
    errors.status = "Status is required";
  }

  return errors;
};


//  JobTitle FORM VALIDATION
export const validateJobTitleForm = (formData: { jobTitleName?: string; status?: string | number }): FormErrors => {
  const errors: FormErrors = {};

  if (!formData.jobTitleName || !formData.jobTitleName.trim()) {
    errors.jobTitleName = "Job Title Name is required";
  }

  // If status is expected to be 0 or 1, handle both string/number cases
  if (formData.status === undefined || formData.status === null || formData.status === "") {
    errors.status = "Status is required";
  }

  return errors;
};


//  NOTICE PERIOD FORM VALIDATION
export const validateNoticePeriodForm = (formData: { noticePeriodName?: string; status?: string | number }): FormErrors => {
  const errors: FormErrors = {};

  if (!formData.noticePeriodName || !formData.noticePeriodName.trim()) {
    errors.noticePeriodName = "Notice Period Name is required";
  }

  // If status is expected to be 0 or 1, handle both string/number cases
  if (formData.status === undefined || formData.status === null || formData.status === "") {
    errors.status = "Status is required";
  }

  return errors;
};