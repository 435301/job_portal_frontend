import React from 'react';
import { Routes, Route, Router } from 'react-router-dom';
import Home from './users/Home';
import './App.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { ToastContainer } from "react-toastify";

// User Pages

// User Pages
import Login from './users/Login';
import Jobs from './users/Jobs';
import JobDetails from './users/JobDetails';
import Candidates from './users/Candidates';
import CompanyDetails from './users/CompanyDetails';
import CandidatesDetail from './users/CandidatesDetail';
import EmployerAccount from './users/EmployerAccount';
import VerifyEmail from './users/VerifyEmail';
import EmailVerifiedSuccess from './users/EmailVerifiedSuccess';
import ProfilePage from './users/ProfilePage';
import Company from './users/Company';
import EmployeeDashboard from './users/EmployeeDashboard';
import ManageJobPostings from './users/ManageJobPostings';
import BasicJobDetails from './users/BasicJobDetails';
import CompanyDetailsReg from './users/CompanyDetailsReg';
import CompanyDetailsHiring from './users/CompanyDetailsHiring';
import SuccessPage from './users/SuccessPage';
import CompanyProfileDesign from './users/CompanyProfileDesign';
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

        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/company" element={<Company />} />
        <Route path="/company-details" element={<CompanyDetails />} />
        <Route path="/employer-dashboard" element={<EmployeeDashboard />} />
        <Route path="/job-posting" element={<ManageJobPostings />} />
        <Route path="/basic-job-details" element={<BasicJobDetails />} />
        <Route path="/company-details-reg" element={<CompanyDetailsReg />} />
        <Route path="/company-details-hiring" element={<CompanyDetailsHiring />} />
        <Route path="/success-page" element={<SuccessPage />} />
        <Route path="/company-profile" element={<CompanyProfileDesign />} />
        <Route path="/looking-jobs" element={<LokkingJobs />} />

        {/* ===== Admin Routes ===== */}
        <Route path="/admin/dashboard" element={<ProtectedRoute><AdminDashboard /> </ProtectedRoute>
        } />
        <Route path="/admin/manage-education" element={<EducationManage />} />
        <Route path="/admin/manage-skills" element={<SkillManage />} />
        <Route path="/admin/manage-institutions" element={<InstitutionManage />} />
        <Route path="/admin/manage-job-titles" element={<JobTitleManage />} />
        <Route path="/admin/manage-notice-periods" element={<NoticePeriodManage />} />
        <Route path="/admin/manage-experience" element={<ExperienceManage />} />
        <Route path="/admin/manage-courses" element={<CourseManage />} />
        <Route path="/admin/manage-specializations" element={<SpecializationManage />} />
        <Route path="/admin/manage-course-types" element={<CourseTypeManage />} />
        <Route path="/admin/manage-school-boards" element={<SchoolBoardManage />} />
        <Route path="/admin/manage-school-medium" element={<SchoolMediumManage />} />
        <Route path="/admin/manage-marital-status" element={<MaritalStatusManage />} />
        <Route path="/admin/manage-gender" element={<GenderManage />} />
        <Route path="/admin/manage-country" element={<CountryManage />} />
        <Route path="/admin/manage-states" element={<StateManage />} />
        <Route path="/admin/manage-cities" element={<CityManage />} />
        <Route path="/admin/manage-employment-type" element={<EmploymentTypeManage />} />
        <Route path="/admin/manage-availability" element={<AvailabilityManage />} />
        <Route path="/admin/manage-grading-system" element={<GradingSystemManage />} />
        <Route path="/admin/manage-profile-percentage" element={<ProfilePercentageManage />} />
        <Route path="/admin/create-education" element={<CreateEducation />} />
        <Route path="/admin/create-skill" element={<CreateSkill />} />
        <Route path="/admin/create-institution" element={<CreateInstitution />} />
        <Route path="/admin/create-job-title" element={<CreateJobTitle />} />
        <Route path="/admin/create-notice-period" element={<CreateNoticePeriod />} />
        <Route path="/admin/create-experience" element={<CreateExperience />} />
        <Route path="/admin/create-course" element={<CreateCourse />} />
        <Route path="/admin/create-specialization" element={<CreateSpecialization />} />
        <Route path="/admin/create-course-type" element={<CreateCourseType />} />
        <Route path="/admin/create-school-board" element={<CreateSchoolBoard />} />
        <Route path="/admin/create-school-medium" element={<CreateSchoolMedium />} />
        <Route path="/admin/create-marital-status" element={<CreateMaritalStatus />} />
        <Route path="/admin/create-gender" element={<CreateGender />} />
        <Route path="/admin/create-country" element={<CreateCountry />} />
        <Route path="/admin/create-state" element={<CreateState />} />
        <Route path="/admin/create-city" element={<CreateCity />} />
        <Route path="/admin/create-employment-type" element={<CreateEmploymentType />} />
        <Route path="/admin/create-availability" element={<CreateAvailability />} />
        <Route path="/admin/create-grading-system" element={<CreateGradingSystem />} />
        <Route path="/admin/create-profile-percentage" element={<CreateProfilePercentage />} />
        <Route path="/admin/login" element={<AdminLogin />} />

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
