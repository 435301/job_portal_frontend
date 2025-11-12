import React from 'react';
import avatarImage from '../../assets/img/avatar-27.png'; // Adjust path as needed
import editIcon from '../../assets/img/edit-63.svg'; // Adjust path as needed

const ProfileCard = () => {
  return (
    <div className="profile-card row align-items-center rounded-4 p-4">
      <div className="col-md-5 border-end d-flex align-items-center mb-4 mb-md-0">
        <div>
          <img
            src={avatarImage}
            alt="Profile Image"
            className="rounded-circle me-3 profile-img"
          />
        </div>
        <div>
          <h5 className="mb-1 fw-semibold text-dark availability-1">
            Michel Velayudhan
            <img src={editIcon} alt="Edit Icon" className="ms-4" />
          </h5>
          <p className="mb-2">
            Profile last updated: <strong>10 July, 2024</strong>
          </p>
          <div className="d-flex align-items-center">
            <div className="progress flex-grow-1" style={{ height: '8px', maxWidth: '250px' }}>
              <div className="progress-bar bg-danger" style={{ width: '30%' }}></div>
            </div>
            <small className="text-muted ms-2">30%</small>
          </div>
        </div>
      </div>
      <div className="col-md-7 ps-5">
        <div className="row g-3">
          <div className="col-md-4 d-flex align-items-start">
            <div className="icon-box me-2">
              <i className="bi bi-geo-alt-fill"></i>
            </div>
            <div>
              <div className="fw-semibold text-dark availability">Location</div>
              <div className="text-muted small">Bengaluru, INDIA</div>
            </div>
          </div>
          <div className="col-md-4 d-flex align-items-start">
            <div className="icon-box me-2">
              <i className="bi bi-telephone-fill"></i>
            </div>
            <div>
              <div className="fw-semibold text-dark availability">Mobile Number</div>
              <div className="text-muted small">9880087932</div>
            </div>
          </div>
          <div className="col-md-4 d-flex align-items-start">
            <div className="icon-box me-2">
              <i className="bi bi-briefcase-fill"></i>
            </div>
            <div>
              <div className="fw-semibold text-dark availability">Experience</div>
              <div className="text-muted small">5+ Years</div>
            </div>
          </div>
          <div className="col-md-4 d-flex align-items-start">
            <div className="icon-box me-2">
              <i className="bi bi-envelope-fill"></i>
            </div>
            <div>
              <div className="fw-semibold text-dark availability">Email</div>
              <div className="text-muted small">akeebshaik@gmail.com</div>
            </div>
          </div>
          <div className="col-md-4 d-flex align-items-start">
            <div className="icon-box me-2">
              <i className="bi bi-cash-stack"></i>
            </div>
            <div>
              <div className="fw-semibold text-dark availability">Add Breakup</div>
              <div className="text-muted small">$5,00,000 LPA</div>
            </div>
          </div>
          <div className="col-md-4 d-flex align-items-start">
            <div className="icon-box me-2">
              <i className="bi bi-calendar-check-fill"></i>
            </div>
            <div>
              <div className="fw-semibold text-dark availability">Availability</div>
              <div className="text-muted small">Join within 15 days</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;