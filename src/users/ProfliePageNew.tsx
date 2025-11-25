import React, { useEffect, useState } from 'react';
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
import { addCertificate, addEmployment, addKeySkills, addProfileEducation, deleteCertificate, deleteEmployment, deleteProfileEducation, deleteResume, fetchEmployeeProfile, updateCertificate, updateEmployment, updateMobileNumber, updateProfileEducation, updateProfileTitle, uploadPhoto, uploadResume } from '../redux/slices/employeeProfileSlice.tsx';
import { getAllSkills } from '../redux/slices/skillSlice.tsx';
import { getAllEmploymentType } from '../redux/slices/employementTypeSlice.tsx';
import { getAllNoticePeriods } from '../redux/slices/noticePeriodSlice.tsx';
import { getAllCurrencyType } from '../redux/slices/currencyTypeSlice.tsx';
import { getAllCourses } from '../redux/slices/courseSlice.tsx';
import { getAllSpecializations } from '../redux/slices/specializationSlice.tsx';
import { getAllCourseTypes } from '../redux/slices/courseTypeSlice.tsx';
import { getAllGradingSystem } from '../redux/slices/gradingSystemSlice.tsx';
import { getAllEducations } from '../redux/slices/educationSlice.tsx';


function ProfilePageNew() {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, data, error } = useAppSelector((state: RootState) => state.employeeProfile);
  const { skillList } = useAppSelector((state: RootState) => state.skill);
  const { EmploymentTypeList } = useAppSelector((state: RootState) => state.employmentType);
  const { NoticePeriodList } = useAppSelector((state: RootState) => state.noticePeriod);
  const { CurrencyTypeList } = useAppSelector((state: RootState) => state.currencyType);
  const { educationList } = useAppSelector((state: RootState) => state.education);
  const { courseList } = useAppSelector((state: RootState) => state.course);
  const { specializationList } = useAppSelector((state: RootState) => state.specialization);
  const { courseTypeList } = useAppSelector((state: RootState) => state.courseType);
  const { GradingSystemList } = useAppSelector((state: RootState) => state.gradingSystem);
  const employeeId = JSON.parse(localStorage.getItem("employee") ?? "{}")?.id;

  useEffect(() => {
    if (employeeId) {
      dispatch(fetchEmployeeProfile(employeeId));
      dispatch(getAllSkills());
      dispatch(getAllEmploymentType());
      dispatch(getAllNoticePeriods());
      dispatch(getAllCurrencyType());
      dispatch(getAllEducations());
      dispatch(getAllCourses());
      dispatch(getAllSpecializations());
      dispatch(getAllCourseTypes());
      dispatch(getAllGradingSystem());
    }
  }, [dispatch]);

  const sectionStatus = {
    resume: data?.resumes?.length > 0,
    profileTitle: !!data?.profileTitle,
    keySkills: data?.keySkills?.length > 0,
    employment: data?.employmentDetails?.length > 0,
    education: data?.educationDetails?.length > 0,
    itSkills: data?.keySkills?.length > 0, // same as key skills
    certification: data?.certificationDetails?.length > 0,
    personalDetails: !!data?.personalDetails
  };

  const handleEditClick = (section: string) => {
   
  };
  const handleSaveProfileTitle = (newTitle: string) => {
    dispatch(updateProfileTitle(newTitle))
  }

  const handleSaveKeySkills = (skillIds: number[]) => {
    dispatch(addKeySkills(skillIds));
  }

  const handleAddCertificate = (formData: any) => {
    dispatch(addCertificate(formData));
  };

  const handleUpdateCertificate = (id: number, formData: any) => {
    dispatch(updateCertificate({ id, payload: formData }))
  };

  const handleDeleteCertificate = (id: number) => {
    dispatch(deleteCertificate(id))
  };

  const handleUpload = (file: any) => {
    dispatch(uploadResume(file));
  };

  const handleDeleteResume = (id: number) => {
    dispatch(deleteResume(id));
  };

  const handleAddEmployment = async (formData: any) => {
    try {
      const payload = {
        ...formData,
        isCurrentEmployment: formData.isCurrentEmployment ? 1 : 0,
      };
      const res = await dispatch(addEmployment(payload));
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateEmployment = async (id: number, formData: any) => {
    try {
      const payload = {
        ...formData,
        isCurrentEmployment: formData.isCurrentEmployment ? 1 : 0,
      };
      const res = await dispatch(updateEmployment({ id, payload: payload }));
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteEmployment = async (id: number) => {
    try {
      await dispatch(deleteEmployment(id));
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddEducation = (formData: any) => {
    dispatch(addProfileEducation(formData));
  };

  const handleUpdateEducation = (id: number, formData: any) => {
    dispatch(updateProfileEducation({ id, payload: formData }))
  };

  const handleDeleteEducation = (id: number) => {
    dispatch(deleteProfileEducation(id))
  };

  const handleMobile = (mobile: any) => {
    dispatch(updateMobileNumber(mobile));
  }

  const handleProfilePhoto = (photo: any) => {
    dispatch(uploadPhoto(photo))
  }

  return (
    <div className="ProfilePage">
      <Header />
      <div className="container-fluid bg-breadcrumb py-5"></div>
      <div className="container py-4">
        <ProfileCard personalDetails={data?.personalDetails} onMobile={handleMobile} onPhoto={handleProfilePhoto} profileCompletion={data?.profileCompletion} />
      </div>
      <div className="container py-4">
        <div className="row g-4">
          <div className="col-lg-9">
            <ResumeSection resumes={data?.resumes} onUpload={handleUpload} onDelete={handleDeleteResume} />
            <ProfileTitleSection profileTitle={data?.profileTitle} onSave={handleSaveProfileTitle} />
            <KeySkillsSection keySkills={data?.keySkills} skillList={skillList} onSave={handleSaveKeySkills} />
            <EmploymentSection employmentDetails={data?.employmentDetails} EmploymentTypeList={EmploymentTypeList} NoticePeriodList={NoticePeriodList} CurrencyTypeList={CurrencyTypeList} onAdd={handleAddEmployment} onUpdate={handleUpdateEmployment} onDelete={handleDeleteEmployment} />
            <EducationSection educationDetails={data?.educationDetails} educationList={educationList} courseList={courseList} specializationList={specializationList} courseTypeList={courseTypeList} GradingSystemList={GradingSystemList} onAdd={handleAddEducation} onUpdate={handleUpdateEducation} onDelete={handleDeleteEducation} />
            <ITSkillsSection itSkills={data?.keySkills} />
            <CertificationsSection certificationDetails={data?.certificationDetails} onAdd={handleAddCertificate} onUpdate={handleUpdateCertificate} onDelete={handleDeleteCertificate} />
            <PersonalDetailsSection personalDetails={data?.personalDetails} />
          </div>
          <div className="col-lg-3">
            <QuickLinks onEditClick={handleEditClick} sectionStatus={sectionStatus} />
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