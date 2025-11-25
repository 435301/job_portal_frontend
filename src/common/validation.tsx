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
  specializationName?: string;
  maritalStatus?: string;
  gender?: string;
  countryName?: string;
  stateName?: string;
  countryId?: string;
  cityName?: string;
  stateId?: string;
  employmentType?: string;
  availability?: string;
  gradingType?: string;
  title?: string;
  percentage?: number;
  workPermit?: string;
  currencyType?: string;
  skillId?: number;
  lastUsedYear?: number;
  expYears?: number;
  expMonths?: number;
  certificateName?: string;
  issuedBy?: string;
  mobile?: any;
}

export interface EmploymentForm {
  isCurrentEmployment: boolean;
  employmentTypeId: number;
  totalExpYears: number;
  totalExpMonths: number;
  currentCompanyName: string;
  currentJobTitle: string;
  joiningYear: number;
  joiningMonth: number;
  endingYear: number;
  endingMonth: number;
  currencyId: number;
  currentSalary: number;
  skillsUsed: string;
  noticePeriodId: number;
}

export interface EducationForm {
  educationId: number,
  courseId: number,
  specificationId: number,
  university: string,
  courseTypeId: number,
  courseStartYear: number,
  courseEndYear: number,
  gradingSystemId: number,
  marks: string,
}

export interface FormErrorsEmployment {
  [key: string]: string;
}

export interface MobileForm {
  mobile: any,
}

//  LOGIN FORM VALIDATION
export const validateLoginForm = (formData: { email?: string; password?: string }): FormErrors => {
  const errors: FormErrors = {};
  if (!formData.email) {
    errors.email = "Email is required";
  } else if (!emailRegex.test(formData.email) && !mobileRegex.test(formData.email)) {
    errors.email = "Enter a valid email or mobile number";
  }

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
export const validateSpecializationForm = (formData: { specializationName?: string; educationId?: number; status?: string | number, ipAddress?: string, courseId?: number; }): FormErrors => {
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

export const validateRegisterForm = (formData: { firstName?: string; lastName?: string, email?: string; password?: string; confirmPassword?: string; captcha?: string; captchaText?: string; }): FormErrors => {
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


//  MARITAL STATUS FORM VALIDATION
export const validateMaritalStatusForm = (formData: { maritalStatus?: string; status?: string | number, ipAddress?: string }): FormErrors => {
  const errors: FormErrors = {};

  if (!formData.maritalStatus || !formData.maritalStatus.trim()) {
    errors.maritalStatus = "Marital Status is required";
  }

  if (formData.status === undefined || formData.status === null || formData.status === "") {
    errors.status = "Status is required";
  }

  return errors;
};

//  GENDER FORM VALIDATION
export const validateGenderForm = (formData: { gender?: string; status?: string | number, ipAddress?: string }): FormErrors => {
  const errors: FormErrors = {};

  if (!formData.gender || !formData.gender.trim()) {
    errors.gender = "Gender is required";
  }

  if (formData.status === undefined || formData.status === null || formData.status === "") {
    errors.status = "Status is required";
  }

  return errors;
};

//  COUNTRY FORM VALIDATION
export const validateCountryForm = (formData: { countryName?: string; status?: string | number, ipAddress?: string }): FormErrors => {
  const errors: FormErrors = {};

  if (!formData.countryName || !formData.countryName.trim()) {
    errors.countryName = "Country Name is required";
  }

  if (formData.status === undefined || formData.status === null || formData.status === "") {
    errors.status = "Status is required";
  }

  return errors;
};

//  STATE FORM VALIDATION
export const validateStateForm = (formData: { countryId?: number; status?: string | number, ipAddress?: string, stateName?: string; }): FormErrors => {
  const errors: FormErrors = {};

  if (!formData.countryId || !formData.countryId) {
    errors.countryId = "Country Name is required";
  }

  if (!formData.stateName || !formData.stateName.trim()) {
    errors.stateName = "State Name is required";
  }

  if (formData.status === undefined || formData.status === null || formData.status === "") {
    errors.status = "Status is required";
  }

  return errors;
};

//  STATE FORM VALIDATION
export const validateCityForm = (formData: { countryId?: number; stateId?: number; status?: string | number, ipAddress?: string, cityName?: string; }): FormErrors => {
  const errors: FormErrors = {};

  if (!formData.countryId) {
    errors.countryId = "Country Name is required";
  }

  if (!formData.stateId) {
    errors.stateId = "State Name is required";
  }

  if (!formData.cityName) {
    errors.cityName = "City Name is required";
  }

  if (formData.status === undefined || formData.status === null || formData.status === "") {
    errors.status = "Status is required";
  }

  return errors;
};

//  EMPLOYMENT TYPE FORM VALIDATION
export const validateEmploymentTypeForm = (formData: { employmentType?: string; status?: string | number, ipAddress?: string }): FormErrors => {
  const errors: FormErrors = {};

  if (!formData.employmentType || !formData.employmentType.trim()) {
    errors.employmentType = "Employment Type is required";
  }

  if (formData.status === undefined || formData.status === null || formData.status === "") {
    errors.status = "Status is required";
  }

  return errors;
};

//  AVAILABILITY FORM VALIDATION
export const validateAvailabilityForm = (formData: { availability?: string; status?: string | number, ipAddress?: string }): FormErrors => {
  const errors: FormErrors = {};

  if (!formData.availability || !formData.availability.trim()) {
    errors.availability = "Availability is required";
  }

  if (formData.status === undefined || formData.status === null || formData.status === "") {
    errors.status = "Status is required";
  }

  return errors;
};

//  GRADING SYSTEM FORM VALIDATION
export const validateGradingSystemForm = (formData: { gradingType?: string; status?: string | number, ipAddress?: string }): FormErrors => {
  const errors: FormErrors = {};

  if (!formData.gradingType || !formData.gradingType.trim()) {
    errors.gradingType = "Grading System is required";
  }
  if (formData.status === undefined || formData.status === null || formData.status === "") {
    errors.status = "Status is required";
  }
  return errors;
};

//  PROFILE PERCENTAGE FORM VALIDATION
export const validateProfilePercentageForm = (formData: { title?: string; percentage?: number; status?: string | number, ipAddress?: string }): FormErrors => {
  const errors: FormErrors = {};

  if (!formData.title || !formData.title.trim()) {
    errors.title = "Title is required";
  }

  if (formData.percentage === undefined || formData.percentage === null) {
    errors.percentage = "Percentage is required";
  }

  if (formData.status === undefined || formData.status === null || formData.status === "") {
    errors.status = "Status is required";
  }
  return errors;
};

//   WORK PERMIT FORM VALIDATION
export const validateWorkPermitForm = (formData: { workPermit?: string; status?: string | number, ipAddress?: string }): FormErrors => {
  const errors: FormErrors = {};

  if (!formData.workPermit || !formData.workPermit.trim()) {
    errors.workPermit = "Work Permit is required";
  }
  if (formData.status === undefined || formData.status === null || formData.status === "") {
    errors.status = "Status is required";
  }
  return errors;
}


//  CURRENCY TYPE FORM VALIDATION
export const validateCurrencyTypeForm = (formData: { currencyType?: string; status?: string | number, ipAddress?: string }): FormErrors => {
  const errors: FormErrors = {};

  if (!formData.currencyType || !formData.currencyType.trim()) {
    errors.currencyType = "Currency Type is required";
  }

  if (formData.status === undefined || formData.status === null || formData.status === "") {
    errors.status = "Status is required";
  }

  return errors;
};

//  ADD IT SKILLS FORM VALIDATION
export const validateITSkillsForm = (formData: {
  skillId?: number | string;
  lastUsedYear?: number | string;
  expYears?: number | string;
  expMonths?: number | string;
  ipAddress?: string;
}): FormErrors => {
  const errors: FormErrors = {};

  if (!formData.skillId) {
    errors.skillId = "Skill is required";
  }

  if (!formData.lastUsedYear) {
    errors.lastUsedYear = "Last used year is required";
  }

  if (!formData.expYears) {
    errors.expYears = "Experience (Years) is required";
  }

  if (!formData.expMonths) {
    errors.expMonths = "Experience (Months) is required";
  }

  return errors;
};


export const validateCertificateForm = (formData: { certificateName?: string; issuedBy?: string }): FormErrors => {
  const errors: FormErrors = {};
  if (!formData.certificateName || !formData.certificateName.trim()) {
    errors.certificateName = "Certificate Name is required";
  }
  if (!formData.issuedBy) {
    errors.issuedBy = "Issued By is required";
  }
  return errors;
};

export const validateEmploymentForm = (formData: EmploymentForm): FormErrorsEmployment => {
  const errors: FormErrorsEmployment = {};
  if (formData.isCurrentEmployment === undefined || formData.isCurrentEmployment === null) {
    errors.isCurrentEmployment = "Please select current employment status";
  }
  if (!formData.employmentTypeId) {
    errors.employmentTypeId = "Employment type is required";
  }
  if (formData.totalExpYears <= 0 && formData.totalExpYears === null) {
    errors.totalExpYears = "Total experience years must be a valid number";
  }
  if (formData.totalExpMonths < 0 || formData.totalExpMonths > 11) {
    errors.totalExpMonths = "Total experience months must be between 0 and 11";
  }
  if (!formData.currentCompanyName || !formData.currentCompanyName.trim()) {
    errors.currentCompanyName = "Company name is required";
  }
  if (!formData.currentJobTitle || !formData.currentJobTitle.trim()) {
    errors.currentJobTitle = "Job title is required";
  }
  if (!formData.joiningYear) {
    errors.joiningYear = "Enter a valid joining year";
  }
  if (!formData.joiningMonth || formData.joiningMonth < 1 || formData.joiningMonth > 12) {
    errors.joiningMonth = "Joining month must be between 1 and 12";
  }
  if (!formData.endingYear) {
    errors.joiningYear = "Enter a valid ending year";
  }
  if (!formData.endingMonth || formData.endingMonth < 1 || formData.endingMonth > 12) {
    errors.endingMonth = "Ending month must be between 1 and 12";
  }
  if (!formData.currencyId) {
    errors.currencyId = "Currency type is required";
  }
  if (formData.currentSalary === undefined || formData.currentSalary < 0) {
    errors.currentSalary = "Salary must be a valid positive number";
  }
  if (!formData.skillsUsed || !formData.skillsUsed.trim()) {
    errors.skillsUsed = "Skills used is required";
  }
  if (!formData.noticePeriodId) {
    errors.noticePeriodId = "Notice period is required";
  }
  return errors;
};


export const validateProfileEducationForm = (formData: EducationForm): FormErrorsEmployment => {
  const errors: FormErrorsEmployment = {};

  if (!formData.educationId) errors.educationId = "Education is required";
  if (!formData.university.trim()) errors.university = "University is required";
  if (!formData.courseId) errors.courseId = "Course is required";
  if (!formData.specificationId) errors.specificationId = "Specialization is required";
  if (!formData.courseTypeId) errors.courseTypeId = "Course type is required";
  if (!formData.courseStartYear) errors.courseStartYear = "Start year is required";
  if (!formData.courseEndYear) errors.courseEndYear = "End year is required";
  if (!formData.gradingSystemId) errors.gradingSystemId = "Grading system is required";
  if (!formData.marks.trim()) errors.marks = "Marks/Percentage is required";

  return errors;

};

export const validateMobileNumber = (formData: MobileForm): FormErrorsEmployment => {
  const errors: FormErrorsEmployment = {};

  if (!formData.mobile || !formData.mobile.trim()) {
    errors.mobile = "Mobile Number is required";
    return errors;
  }
  if (!/^[0-9]{10}$/.test(formData.mobile)) {
    errors.mobile = "Enter a valid 10-digit mobile number";
  }

  return errors;
};

