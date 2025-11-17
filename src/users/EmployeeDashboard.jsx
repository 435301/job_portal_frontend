import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "animate.css";
import "../assets/css/style.css";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Example image imports (update paths accordingly)
import bgRightHiring from "../assets/img/bg-right-hiring.svg";


const JobDetails = () => {
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top on load
  }, []);

  return (
    <>
      {/* ====== Navbar ====== */}
      <div className="container-fluid header position-relative overflow-hidden p-0">
        <Navbar />

        {/* Breadcrumb / Search Section */}
        <div className="container-fluid bg-breadcrumb py-5">

        </div>
      </div>

      {/* ====== Job Details Section ====== */}
      <div
        className="container py-2 px-4 my-4"
        style={{
          background:
            "transparent linear-gradient(180deg, #E5F5FA 0%, #FFFFFF 100%) 0% 0% no-repeat padding-box",
        }}
      >
        <div className="d-flex justify-content-between align-items-center flex-wrap">
          <div>
            <h3 className="fw-bold mb-1">
              Welcome back, <span className="">Akeeb Shaik</span>
            </h3>
            <p className="text-secondary mb-0">Good Morning</p>
          </div>
          <img
            src={bgRightHiring}
            alt="Welcome Illustration"

          />
        </div>
      </div>

      {/* ===== Main Content ===== */}
      <div className="container pb-5">
        <div className="row g-4">
          {/* ===== Left Section ===== */}
          <div className="col-lg-8">
            {/* Create Sub-Users */}
            <div
              className=" rounded mb-4 border"

            >

              <h5 className="fw-bold mb-2 py-3 px-3" style={{ backgroundColor: "#FAF7ED" }}>Create Sub-Users</h5>
              <div className="p-3">  <p className="mb-2 text-muted">
                You have not created sub-users yet.
              </p>
                <a href="#" className=" fw-semibold text-decoration-none">
                  Click here
                </a>{" "}
                to create sub-users and assign them product access rights.</div>
            </div>

            {/* Job Postings */}
            <div
              className=" rounded border"

            >
              <h5 className="fw-bold mb-3 p-3" style={{ backgroundColor: "#E9F8F6" }}>Job Postings</h5>

              <div className="table-responsive">
                <table className="table align-middle table-borderless mb-0">
                  <thead >
                    <tr className="text-secondary small">
                      <th style={{ backgroundColor: "transparent" }}>Recently posted jobs</th>
                      <th style={{ backgroundColor: "transparent" }}>Created by</th>
                      <th style={{ backgroundColor: "transparent" }}>Modified on</th>
                      <th style={{ backgroundColor: "transparent" }}>Applies</th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr>
                      <td className="fw-semibold text-dark">
                        Field Marketing Executive
                      </td>
                      <td>akeebshaik</td>
                      <td>10 July, 2025</td>
                      <td>25</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="p-3"> <a href="/job-posting" className="btn btn-dark rounded-pill mt-3 px-4">
                View all jobs <i className="bi bi-arrow-right ms-1"></i>
              </a></div>
            </div>
          </div>

          {/* ===== Right Section (Contact) ===== */}
          <div className="col-lg-4">
            <div
              className=" rounded border "

            >
              <h5 className="fw-bold rounded mb-3 p-3" style={{ backgroundColor: "#FDEEE8" }}>Contact us</h5>

              <div className="p-3">       {/* Phone */}
                <div className="border p-3 rounded mb-3 bg-white d-flex align-items-center">
                  <i className="bi bi-telephone-fill fs-4  me-3"></i>
                  <div>
                    <p className="mb-0 fw-semibold">(00) 658 54332</p>
                    <small className="text-muted">
                      (10:00 AM – 6:00 PM, Mon – Sat)
                    </small>
                  </div>
                </div>

                {/* Email */}
                <div className="border p-3 rounded bg-white d-flex align-items-center">
                  <i className="bi bi-envelope-fill fs-4  me-3"></i>
                  <div>
                    <p className="mb-0 ">support@aftergraduate.com</p>
                  </div>
                </div></div>
            </div>
          </div>
        </div>
      </div>

      {/* ====== Footer ====== */}
      < Footer />
    </>
  );
};

export default JobDetails;
