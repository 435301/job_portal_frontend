import React from 'react';
import Header from './components/Navbar'; // Your existing Header component
import Footer from './components/Footer'; // Your existing Footer component
import ProfileCard from './components/ProfileCard';
import ResumeSection from './components/ResumeSection';
import ProfileTitleSection from './components/ProfileTitleSection';
import KeySkillsSection from './components/KeySkillsSection';
import EmploymentSection from './components/EmploymentSection';
import EducationSection from './components/EducationSection';
import ITSkillsSection from './components/ITSkillsSection';
import CertificationsSection from './components/CertificationsSection';
import PersonalDetailsSection from './components/PersonalDetailsSection';
import QuickLinks from './components/QuickLinks';

function ProfilePage() {
  return (
    <div className="ProfilePage">
      <Header />
      <div className="container-fluid bg-breadcrumb py-5"></div>
      <div className="container py-4">
        <ProfileCard />
      </div>
      <div className="container py-4">
        <div className="row g-4">
          <div className="col-lg-9">
            <ResumeSection />
            <ProfileTitleSection />
            <KeySkillsSection />
            <EmploymentSection />
            <EducationSection />
            <ITSkillsSection />
            <CertificationsSection />
            <PersonalDetailsSection />
          </div>
          <div className="col-lg-3">
            <QuickLinks />
          </div>
        </div>
      </div>
      <a href="#" className="btn btn-primary btn-lg-square back-to-top">
        <i className="fa fa-arrow-up"></i>
      </a>
      <Footer />
    </div>
  );
}

export default ProfilePage;