import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './users/Home';
import './App.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';

// User Pages
import Login from './users/Login';
import Register from './users/Register';
import Jobs from './users/Jobs';
import JobDetails from './users/JobDetails';
import Candidates from './users/Candidates';
import CandidatesDetail from './users/CandidatesDetail';
import EmployerAccount from './users/EmployerAccount';
import VerifyEmail from './users/VerifyEmail';
import EmailVerifiedSuccess from './users/EmailVerifiedSuccess';
import ProfilePage from './users/ProfilePage';



// Admin Pages
import AdminDashboard from './admin/pages/Dashboard'; // example file path
import EducationManage from './admin/pages/EducationManage'; // example file path
import CreateEducation from "./admin/pages/CreateEducation";
import AdminLogin from "./admin/pages/AdminLogin";


const App = () => {
  return (
    <>
      <Routes>
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
        <Route path="/profile" element={<ProfilePage />} />

        {/* ===== Admin Routes ===== */}
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/education" element={<EducationManage />} />
        <Route path="/admin/create-education" element={<CreateEducation />} />
        <Route path="/admin/login" element={<AdminLogin />} />

      </Routes>
    </>
  );
};

export default App;
