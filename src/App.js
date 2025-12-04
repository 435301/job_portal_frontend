import React from 'react';
import { Routes, Route, Router } from 'react-router-dom';
import Home from './users/Home';
import './App.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { ToastContainer } from "react-toastify";

// User Pages

// User Pages
import Login from './users/Login.tsx';
import Jobs from './users/Jobs';
import JobDetails from './users/JobDetails';
import Candidates from './users/Candidates';
import CompanyDetails from './users/CompanyDetails';
import CandidatesDetail from './users/CandidatesDetail';
import EmployerAccount from './users/EmployerAccount';
import VerifyEmail from './users/VerifyEmail';
import EmailVerifiedSuccess from './users/EmailVerifiedSuccess';
import Company from './users/Company';
import EmployeeDashboard from './users/EmployeeDashboard';
import ManageJobPostings from './users/ManageJobPostings';
import BasicJobDetails from './users/BasicJobDetails';
import CompanyDetailsReg from './users/CompanyDetailsReg';
import CompanyDetailsHiring from './users/CompanyDetailsHiring';
import SuccessPage from './users/SuccessPage';
import CompanyProfileDesign from './users/CompanyProfileDesign.tsx';
import LokkingJobs from './users/LokkingJobs';

import CompanyEmailVerifiedSuccess from './users/CompanyEmailVerifiedSuccess';


// Admin Pages
import AdminDashboard from './admin/pages/Dashboard'; // example file path
import CreateEducation from "./admin/pages/CreateEducation.tsx";
import AdminLogin from "./admin/pages/AdminLogin";
import ProtectedRoute from './admin/componets/ProtectedRoute';
import CreateSkill from './admin/pages/CreateSkill.tsx';
import EducationManage from './admin/pages/EducationManage.tsx';
import SkillManage from './admin/pages/SkillsManage.tsx';
import InstitutionManage from './admin/pages/InstitutionManage.tsx';
import CreateInstitution from './admin/pages/CreateInstitution.tsx';
import CreateJobTitle from './admin/pages/CreateJobTitle.tsx';
import JobTitleManage from './admin/pages/JobTitlesManage.tsx';
import CreateNoticePeriod from './admin/pages/CreateNoticePeriod.tsx';
import NoticePeriodManage from './admin/pages/NoticePeriodManage.tsx';
import ExperienceManage from './admin/pages/ExperienceManage.tsx';
import CreateExperience from './admin/pages/CreateExperience.tsx';
import CourseManage from './admin/pages/CourseManage.tsx';
import CreateCourse from './admin/pages/CreateCourse.tsx';
import CourseTypeManage from './admin/pages/CourseTypeManage.tsx';
import CreateCourseType from './admin/pages/CreateCourseType.tsx';
import Register from './users/Register.tsx';
import SchoolBoardManage from './admin/pages/SchoolBoardManage.tsx';
import CreateSchoolBoard from './admin/pages/CreateSchoolBoard.tsx';
import SchoolMediumManage from './admin/pages/SchoolMediumManage.tsx';
import CreateSchoolMedium from './admin/pages/CreateSchoolMedium.tsx';
import CreateSpecialization from './admin/pages/CreateSpecialization.tsx';
import SpecializationManage from './admin/pages/SpecializationManage.tsx';
import MaritalStatusManage from './admin/pages/MaritalStatusManage.tsx';
import CreateMaritalStatus from './admin/pages/CreateMaritalStatus.tsx';
import GenderManage from './admin/pages/GnderManage.tsx';
import CreateGender from './admin/pages/CreateGender.tsx';
import CountryManage from './admin/pages/CountryManage.tsx';
import CreateCountry from './admin/pages/CreateCountry.tsx';
import StateManage from './admin/pages/StateManage.tsx';
import CreateState from './admin/pages/CreateState.tsx';
import CityManage from './admin/pages/CityManage.tsx';
import CreateCity from './admin/pages/CreateCity.tsx';
import EmploymentTypeManage from './admin/pages/EmploymentManage.tsx';
import CreateEmploymentType from './admin/pages/CreateEmploymentType.tsx';
import AvailabilityManage from './admin/pages/AvailabilityManage.tsx';
import CreateAvailability from './admin/pages/CreateAvailability.tsx';
import GradingSystemManage from './admin/pages/GradingSystemManage.tsx';
import CreateGradingSystem from './admin/pages/CreateGradingSystem.tsx';
import ProfilePercentageManage from './admin/pages/ProfilePercentageManage.tsx';
import CreateProfilePercentage from './admin/pages/CreateProfilePercentage.tsx';
import WorkPermitManage from './admin/pages/WorkPermitManage.tsx';
import CreateWorkPermit from './admin/pages/CreateWorkPermit.tsx';
import { AdminRoute, EmployeeRoute, EmployerRoute } from './utils/roleRoute.js';
import CurrencyTypeManage from './admin/pages/CurrencyTypeManage.tsx';
import CreateCurrencyType from './admin/pages/CreateCurrencyType.tsx';
import ProfilePageNew from './users/ProfliePageNew.tsx';
import ChangePassword from './admin/pages/ChangePassword.tsx';
import ChangePasswordEmployee from './users/ChangePassword.tsx';
import DesignationManage from './admin/pages/DesignationManage.tsx';
import CreateDesignation from './admin/pages/CreateDesignation.tsx';
import CreateRole from './admin/pages/CreateRole.tsx';
import RoleManage from './admin/pages/RoleManage.tsx';
import CreateIndustryType from './admin/pages/CreateIndustryType.tsx';
import IndustryTypeManage from './admin/pages/IndustryTypeManage.tsx';
import CreateCompanyType from './admin/pages/CreateCompanyType.tsx';
import CompanyTypeManage from './admin/pages/CompanyTypeManage.tsx';
import ChangePasswordEmployer from './users/ChangePasswordEmployer.tsx';
import OrganizationSizeManage from './admin/pages/OrganizationSizeManage.tsx';
import CreateOrganizationSize from './admin/pages/CreateOrganizationSize.tsx';
import WorkLocationTypeManage from './admin/pages/WorkLocationTypeManage.tsx';
import CreateWorkLocationType from './admin/pages/CreateWorkLocationType.tsx';
import CreateHiringTimeline from './admin/pages/CreateHiringTimeline.tsx';
import HiringTimelineManage from './admin/pages/HiringTimelineManage.tsx';
import NotFound from './components/NotFound.tsx';



const App = () => {
  return (
    <>
      <Routes>
        {/* ===== User Routes ===== */}
        {/* ===== User Routes ===== */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/job-details" element={<JobDetails />} />
        <Route path="/candidates" element={<Candidates />} />
        <Route path="/candidate-details" element={<CandidatesDetail />} />
        <Route path="/employer-account" element={<EmployerAccount />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/verify-email-success" element={<EmailVerifiedSuccess />} />
        <Route path="/company-verify-email-success" element={<CompanyEmailVerifiedSuccess />} />
        <Route path="/profile" element={<EmployeeRoute><ProfilePageNew /></EmployeeRoute>} />
        <Route path="/company" element={<Company />} />
        <Route path="/company-details" element={<CompanyDetails />} />
        <Route path="/employer-dashboard" element={<EmployeeDashboard />} />
        <Route path="/job-posting" element={<ManageJobPostings />} />
        <Route path="/basic-job-details" element={<BasicJobDetails />} />
        <Route path="/company-details-reg" element={<CompanyDetailsReg />} />
        <Route path="/company-details-hiring" element={<CompanyDetailsHiring />} />
        <Route path="/success-page" element={<SuccessPage />} />
        <Route path="/company-profile" element={<EmployerRoute><CompanyProfileDesign /></EmployerRoute>} />
        <Route path="/looking-jobs" element={<LokkingJobs />} />
        <Route path="/change-password" element={<EmployeeRoute><ChangePasswordEmployee /></EmployeeRoute>} />
        <Route path="/employer/change-password" element={<EmployerRoute><ChangePasswordEmployer /></EmployerRoute>} />


        {/* ===== Admin Routes ===== */}

        <Route path="/admin/dashboard" element={<AdminRoute><AdminDashboard /></AdminRoute>
        } />
        <Route path="/admin/manage-education" element={<AdminRoute><EducationManage /></AdminRoute>} />
        <Route path="/admin/manage-skills" element={<AdminRoute><SkillManage /></AdminRoute>} />
        <Route path="/admin/manage-institutions" element={<AdminRoute><InstitutionManage /></AdminRoute>} />
        <Route path="/admin/manage-job-titles" element={<AdminRoute><JobTitleManage /></AdminRoute>} />
        <Route path="/admin/manage-notice-periods" element={<AdminRoute><NoticePeriodManage /></AdminRoute>} />
        <Route path="/admin/manage-experience" element={<AdminRoute><ExperienceManage /></AdminRoute>} />
        <Route path="/admin/manage-courses" element={<AdminRoute><CourseManage /></AdminRoute>} />
        <Route path="/admin/manage-specializations" element={<AdminRoute><SpecializationManage /></AdminRoute>} />
        <Route path="/admin/manage-course-types" element={<AdminRoute><CourseTypeManage /></AdminRoute>} />
        <Route path="/admin/manage-school-boards" element={<AdminRoute><SchoolBoardManage /></AdminRoute>} />
        <Route path="/admin/manage-instruction-medium" element={<AdminRoute><SchoolMediumManage /></AdminRoute>} />
        <Route path="/admin/manage-marital-status" element={<AdminRoute><MaritalStatusManage /></AdminRoute>} />
        <Route path="/admin/manage-gender" element={<AdminRoute><GenderManage /></AdminRoute>} />
        <Route path="/admin/manage-country" element={<AdminRoute><CountryManage /></AdminRoute>} />
        <Route path="/admin/manage-states" element={<AdminRoute><StateManage /></AdminRoute>} />
        <Route path="/admin/manage-cities" element={<AdminRoute><CityManage /></AdminRoute>} />
        <Route path="/admin/manage-employment-type" element={<AdminRoute><EmploymentTypeManage /></AdminRoute>} />
        <Route path="/admin/manage-availability" element={<AdminRoute><AvailabilityManage /></AdminRoute>} />
        <Route path="/admin/manage-grading-system" element={<AdminRoute><GradingSystemManage /></AdminRoute>} />
        <Route path="/admin/manage-profile-percentage" element={<AdminRoute><ProfilePercentageManage /></AdminRoute>} />
        <Route path="/admin/manage-work-permit" element={<AdminRoute><WorkPermitManage /></AdminRoute>} />
        <Route path="/admin/manage-currency-type" element={<AdminRoute><CurrencyTypeManage /></AdminRoute>} />
        <Route path="/admin/manage-designation" element={<AdminRoute><DesignationManage /></AdminRoute>} />
        <Route path="/admin/manage-roles" element={<AdminRoute><RoleManage /></AdminRoute>} />
        <Route path="/admin/manage-industry-type" element={<AdminRoute><IndustryTypeManage /></AdminRoute>} />
        <Route path="/admin/manage-company-type" element={<AdminRoute><CompanyTypeManage /></AdminRoute>} />
        <Route path="/admin/manage-organization-size" element={<AdminRoute><OrganizationSizeManage /></AdminRoute>} />
        <Route path="/admin/manage-work-location-type" element={<AdminRoute><WorkLocationTypeManage /></AdminRoute>} />
        <Route path="/admin/manage-hiring-timeline" element={<AdminRoute><HiringTimelineManage /></AdminRoute>} />
        <Route path="/admin/create-education" element={<AdminRoute><CreateEducation /></AdminRoute>} />
        <Route path="/admin/create-skill" element={<AdminRoute><CreateSkill /></AdminRoute>} />
        <Route path="/admin/create-institution" element={<AdminRoute><CreateInstitution /></AdminRoute>} />
        <Route path="/admin/create-job-title" element={<AdminRoute><CreateJobTitle /></AdminRoute>} />
        <Route path="/admin/create-notice-period" element={<AdminRoute><CreateNoticePeriod /></AdminRoute>} />
        <Route path="/admin/create-experience" element={<AdminRoute><CreateExperience /></AdminRoute>} />
        <Route path="/admin/create-course" element={<AdminRoute><CreateCourse /></AdminRoute>} />
        <Route path="/admin/create-specialization" element={<AdminRoute><CreateSpecialization /></AdminRoute>} />
        <Route path="/admin/create-course-type" element={<AdminRoute><CreateCourseType /></AdminRoute>} />
        <Route path="/admin/create-school-board" element={<AdminRoute><CreateSchoolBoard /></AdminRoute>} />
        <Route path="/admin/create-instruction-medium" element={<AdminRoute><CreateSchoolMedium /></AdminRoute>} />
        <Route path="/admin/create-marital-status" element={<AdminRoute><CreateMaritalStatus /></AdminRoute>} />
        <Route path="/admin/create-gender" element={<AdminRoute><CreateGender /></AdminRoute>} />
        <Route path="/admin/create-country" element={<AdminRoute><CreateCountry /></AdminRoute>} />
        <Route path="/admin/create-state" element={<AdminRoute><CreateState /></AdminRoute>} />
        <Route path="/admin/create-city" element={<AdminRoute><CreateCity /></AdminRoute>} />
        <Route path="/admin/create-employment-type" element={<AdminRoute><CreateEmploymentType /></AdminRoute>} />
        <Route path="/admin/create-availability" element={<AdminRoute><CreateAvailability /></AdminRoute>} />
        <Route path="/admin/create-grading-system" element={<AdminRoute><CreateGradingSystem /></AdminRoute>} />
        <Route path="/admin/create-profile-percentage" element={<AdminRoute><CreateProfilePercentage /></AdminRoute>} />
        <Route path="/admin/create-work-permit" element={<AdminRoute><CreateWorkPermit /></AdminRoute>} />
        <Route path="/admin/create-currency-type" element={<AdminRoute><CreateCurrencyType /></AdminRoute>} />
        <Route path="/admin/create-designation" element={<AdminRoute><CreateDesignation /></AdminRoute>} />
        <Route path="/admin/create-role" element={<AdminRoute><CreateRole /></AdminRoute>} />
        <Route path="/admin/create-industry-type" element={<AdminRoute><CreateIndustryType /></AdminRoute>} />
        <Route path="/admin/create-company-type" element={<AdminRoute><CreateCompanyType /></AdminRoute>} />
        <Route path="/admin/create-organization-size" element={<AdminRoute><CreateOrganizationSize /></AdminRoute>} />
        <Route path="/admin/create-work-location-type" element={<AdminRoute><CreateWorkLocationType /></AdminRoute>} />
        <Route path="/admin/create-hiring-timeline" element={<AdminRoute><CreateHiringTimeline /></AdminRoute>} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/change-password" element={<AdminRoute><ChangePassword /></AdminRoute>} />


        <Route path="*" element={<NotFound />} />


      </Routes>
      <ToastContainer position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        toastStyle={{
          color: "#fff",
          borderRadius: "12px",
          fontWeight: "500",
        }}
        progressStyle={{
          background: "#2CB0DD",
        }}
      />
    </>


  );
};

export default App;
