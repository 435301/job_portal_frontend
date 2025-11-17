import React from 'react';
import HomeNavbar from './components/HomeNavbar';
import HeroHeader from './components/HeroHeader';
import HowToGetStarted from './components/HowToGetStarted';
import RecentJobs from './components/RecentJobs';
import Banner from './components/Banner';
import EmployeeCompanySection from './components/EmployeeCompanySection';
import FindJobs from './components/FindJobs';
import CtaBanner from './components/CtaBanner';
import StatsCounter from './components/StatsCounter';

import Footer from './components/Footer';
import BackToTop from './components/BackToTop';
import '../App';

const Home = () => {
  return (
    <div className="container-fluid header position-relative overflow-hidden p-0">
      <HomeNavbar />
      <HeroHeader />
      <HowToGetStarted />
      <RecentJobs />
      <Banner />
      <EmployeeCompanySection />
      <StatsCounter />   {/* <-- New Stats Section */}

      <FindJobs />
      <CtaBanner />
      <Footer />
      <BackToTop />
    </div>
  );
};

export default Home;