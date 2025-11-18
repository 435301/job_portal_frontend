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
  jobTitleName?: string;
  noticePeriodName?: string;
  experienceName?: string;
  courseName?: string;
  educationId?: string;
  courseId?: string;
  courseType?: string;
  firstName?: string;
  lastName?: string;
  confirmPassword?: string;
  captcha?: string;
  captchaText?: string;
  boardName?: string;
  schoolMedium?: string;
  specializationName?:string;
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

//  EXPERIENCE FORM VALIDATION
export const validateExperienceForm = (formData: { experienceName?: string; status?: string | number }): FormErrors => {
  const errors: FormErrors = {};

  if (!formData.experienceName || !formData.experienceName.trim()) {
    errors.experienceName = "Experinece Name is required";
  }

  // If status is expected to be 0 or 1, handle both string/number cases
  if (formData.status === undefined || formData.status === null || formData.status === "") {
    errors.status = "Status is required";
  }

  return errors;
};

//  COURSE FORM VALIDATION
export const validateCourseForm = (formData: { educationId?: number; courseName?: string; status?: string | number, ipAddress?: string }): FormErrors => {
  const errors: FormErrors = {};

  if (!formData.courseName || !formData.courseName.trim()) {
    errors.courseName = "Course Name is required";
  }

  if (!formData.educationId || !formData.educationId) {
    errors.educationId = "Education Name is required";
  }

  // If status is expected to be 0 or 1, handle both string/number cases
  if (formData.status === undefined || formData.status === null || formData.status === "") {
    errors.status = "Status is required";
  }

  return errors;
};

//  SPECIALIZATION FORM VALIDATION
export const validateSpecializationForm = (formData: { specializationName?: string;  educationId?: number; status?: string | number, ipAddress?: string , courseId?:number; }): FormErrors => {
  const errors: FormErrors = {};

  if (!formData.specializationName || !formData.specializationName.trim()) {
    errors.specializationName = "Specialization Name  is required";
  }

  if (!formData.educationId || !formData.educationId) {
    errors.educationId = "Education Name is required";
  }
    if (!formData.courseId || !formData.courseId) {
    errors.courseId = "Course Name is required";
  }

  if (formData.status === undefined || formData.status === null || formData.status === "") {
    errors.status = "Status is required";
  }

  return errors;
};

//  COURSE TYPE FORM VALIDATION
export const validateCourseTypeForm = (formData: { courseType?: string; status?: string | number, ipAddress?: string }): FormErrors => {
  const errors: FormErrors = {};

  if (!formData.courseType || !formData.courseType.trim()) {
    errors.courseType = "Course Type is required";
  }


  // If status is expected to be 0 or 1, handle both string/number cases
  if (formData.status === undefined || formData.status === null || formData.status === "") {
    errors.status = "Status is required";
  }

  return errors;
};

export const validateRegisterForm = (formData: { firstName?: string; lastName?: string, email?: string; password?: string; confirmPassword?: string; captcha?: string; captchaText?:string;}): FormErrors => {
  const errors: FormErrors = {};

  if (!formData.firstName || !formData.firstName.trim()) {
    errors.firstName = "First name is required";
  }
  if (!formData.lastName || !formData.lastName.trim()) {
    errors.lastName = "Last name is required";
  }
  if (!formData.email || (!formData.email.trim())) {
    errors.email = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
    errors.email = "Enter a valid email address";
  }
  if (!formData.password || !formData.password.trim()) {
    errors.password = "Password is required";
  } else if (formData.password.length < 6) {
    errors.password = "Password must be at least 6 characters";
  }

  if (!formData.confirmPassword || !formData.confirmPassword.trim()) {
    errors.confirmPassword = "Please confirm your password";
  } else if (formData.password !== formData.confirmPassword) {
    errors.confirmPassword = "Passwords do not match";
  }
  if (!formData.captcha || !formData.captcha.trim()) {
    errors.captcha = "Captcha is required";
  }

  return errors;
};

//  SCHOOL BOARD FORM VALIDATION
export const validateSchoolBoardForm = (formData: { boardName?: string; status?: string | number, ipAddress?: string }): FormErrors => {
  const errors: FormErrors = {};

  if (!formData.boardName || !formData.boardName.trim()) {
    errors.boardName = "Board Name is required";
  }

  if (formData.status === undefined || formData.status === null || formData.status === "") {
    errors.status = "Status is required";
  }

  return errors;
};

//  SCHOOL MEDIUM FORM VALIDATION
export const validateSchoolMediumForm = (formData: { schoolMedium?: string; status?: string | number, ipAddress?: string }): FormErrors => {
  const errors: FormErrors = {};

  if (!formData.schoolMedium || !formData.schoolMedium.trim()) {
    errors.schoolMedium = "School Medium is required";
  }

  if (formData.status === undefined || formData.status === null || formData.status === "") {
    errors.status = "Status is required";
  }

  return errors;
};
