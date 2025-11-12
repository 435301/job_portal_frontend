import React from 'react';
import Navbar from './components/Navbar';
import HeroHeader from './components/HeroHeader';
import HowToGetStarted from './components/HowToGetStarted';
import RecentJobs from './components/RecentJobs';
import Banner from './components/Banner';
import EmployeeCompanySection from './components/EmployeeCompanySection';
import LeadingCompanies from './components/LeadingCompanies';
import PopularRoles from './components/PopularRoles';
import FindJobs from './components/FindJobs';
import CtaBanner from './components/CtaBanner';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';
import '../App';

const Home = () => {
  return (
    <div className="container-fluid header position-relative overflow-hidden p-0">
      <Navbar />
      <HeroHeader />
      <HowToGetStarted />
      <RecentJobs />
      <Banner />
      <EmployeeCompanySection />
      <LeadingCompanies />
      <PopularRoles />
      <FindJobs />
      <CtaBanner />
      <Footer />
      <BackToTop />
    </div>
  );
};

export default Home;