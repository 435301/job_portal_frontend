import React, { useEffect } from 'react';
import Header from './components/Navbar.jsx';
import Footer from './components/Footer.js';
import ProfileCard from './components/ProfileCard.tsx';
import ResumeSection from './components/ResumeSection.tsx';
import ProfileTitleSection from './components/ProfileTitleSection.tsx';
import KeySkillsSection from './components/KeySkillsSection.tsx';
import EmploymentSection from './components/EmploymentSection.tsx';
import EducationSection from './components/EducationSection.tsx';
import ITSkillsSection from './components/ITSkillsSection.tsx';
import CertificationsSection from './components/CertificationsSection.tsx';
import PersonalDetailsSection from './components/PersonalDetailsSection.tsx';
import QuickLinks from './components/QuickLinks.tsx';
import { AppDispatch, RootState } from "../redux/store.tsx";
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../redux/hooks.tsx';
import { addKeySkills, fetchEmployeeProfile, updateProfileTitle } from '../redux/slices/employeeProfileSlice.tsx';
import { getAllSkills } from '../redux/slices/skillSlice.tsx';


function ProfilePageNew() {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, data, error } = useAppSelector((state: RootState) => state.employeeProfile);
    const { skillList } = useAppSelector((state: RootState) => state.skill);
  const employeeId = JSON.parse(localStorage.getItem("employee") ?? "{}")?.id;

  useEffect(() => {
    if (employeeId) {
      dispatch(fetchEmployeeProfile(employeeId));
      dispatch(getAllSkills());
    }
  }, []);

  const handleEditClick = () => {
    console.log("Quick link edit clicked");
  };

  const handleSaveProfileTitle = (newTitle: string) => {
    dispatch(updateProfileTitle(newTitle))
  }

  const handleSaveKeySkills =(skillIds:number[])=>{
    dispatch(addKeySkills(skillIds));
  }
  return (
    <div className="ProfilePage">
      <Header />
      <div className="container-fluid bg-breadcrumb py-5"></div>
      <div className="container py-4">
        <ProfileCard personalDetails={data?.personalDetails} />
      </div>
      <div className="container py-4">
        <div className="row g-4">
          <div className="col-lg-9">
            <ResumeSection resumes={data?.resumes} />
            <ProfileTitleSection profileTitle={data?.profileTitle} onSave={handleSaveProfileTitle} />
            <KeySkillsSection keySkills={data?.keySkills} skillList={skillList} onSave={handleSaveKeySkills} />
            <EmploymentSection employmentDetails={data?.employmentDetails} />
            <EducationSection educationDetails={data?.educationDetails} />
            <ITSkillsSection itSkills={data?.itSkills} />
            <CertificationsSection certificationDetails={data?.certificationDetails} />
            <PersonalDetailsSection personalDetails={data?.personalDetails} />
          </div>
          <div className="col-lg-3">
            <QuickLinks onEditClick={handleEditClick} />
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

export default ProfilePageNew;