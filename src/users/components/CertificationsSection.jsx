import React from 'react';

const PersonalDetailsSection = () => {
  return (
    <div className="card-section personal-details">
      <div className="section-header p-3 mb-0 d-flex p-3 justify-content-between align-items-center">
        <div>
          <i className="bi bi-person-lines-fill"></i> Personal Details
        </div>
        <img src="/img/edit.svg" alt="" />
      </div>
      <div className="row p-3 names">
        <div className="col-md-3">
          <strong>Full Name:</strong>
          <div>Akeeb Shaik</div>
        </div>
        <div className="col-md-3">
          <strong>DOB:</strong>
          <div>July 10, 1997</div>
        </div>
        <div className="col-md-3">
          <strong>Marital Status:</strong>
          <div>Single/Married</div>
        </div>
        <div className="col-md-3">
          <strong>Locality:</strong>
          <div>Hyderabad</div>
        </div>
        <div className="col-md-3">
          <strong>Languages:</strong>
          <div>Telugu, Hindi, English</div>
        </div>
        <div className="col-md-3">
          <strong>Nationality:</strong>
          <div>Indian</div>
        </div>
        <div className="col-md-3">
          <strong>Mobile Number:</strong>
          <div>7780515180</div>
        </div>
        <div className="col-md-3">
          <strong>Email ID:</strong>
          <div>akeebshaik@gmail.com</div>
        </div>
      </div>
      <a href="#" className="text-primary small px-3 mb-4 mt-2 d-inline-block">
        <i className="bi bi-plus-circle me-1"></i> Add Category
      </a>
    </div>
  );
};

export default PersonalDetailsSection;