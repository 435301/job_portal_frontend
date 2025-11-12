import React from 'react';

const EducationSection = () => {
  return (
    <div className="p-0 border rounded-4 mb-4 education">
      <div className="mb-4">
        <div className="d-flex p-3 justify-content-between align-items-center border-bottom pb-2 mb-3">
          <h6 className="fw-semibold mb-0">
            <i className="bi bi-person-lines-fill me-2"></i> Education
          </h6>
          <img src="/img/edit.svg" alt="" />
        </div>
        <div className="px-3">
          <ul className="timeline-list list-unstyled">
            <li className="timeline-item">
              <h6>B.Tech/B.E. – Civil Engineering</h6>
              <a href="#" className="company">Dr. Ambedkar Institute of Technology, Bangalore</a><br />
              <span className="meta">
                <i className="bi bi-dot mx-1"></i>2020-06-03 – 2023-12-31
              </span>
            </li>
            <li className="timeline-item">
              <h6>B.Tech/B.E. – Civil Engineering</h6>
              <a href="#" className="company">Dr. Ambedkar Institute of Technology, Bangalore</a><br />
              <span className="meta">
                <i className="bi bi-dot mx-1"></i>2020-06-03 – 2023-12-31
              </span>
            </li>
            <li className="timeline-item">
              <a href="#" className="company">Add Education</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default EducationSection;