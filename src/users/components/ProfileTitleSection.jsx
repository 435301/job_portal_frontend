import React from 'react';

const ProfileTitleSection = () => {
  return (
    <div className="p-0 border rounded-4 mb-4">
      <div className="d-flex p-3 justify-content-between align-items-center border-bottom pb-2 mb-3">
        <h6 className="fw-semibold mb-0">
          <i className="bi bi-person-lines-fill me-2"></i> Profile Title
        </h6>
        <img src="/img/edit.svg" alt="" />
      </div>
      <p className="mb-0 text-muted p-3">
        Looking for jobs requiring following skills: <span className="text-dark fw-medium">HTML, CSS, React.js, JavaScript, UI design</span>
      </p>
    </div>
  );
};

export default ProfileTitleSection;