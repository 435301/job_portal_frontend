import React from 'react';

const ITSkillsSection = () => {
  return (
    <div className="card-section">
      <div className="section-header p-3 mb-0">
        <i className="bi bi-laptop"></i> IT Skills
        <span className="add-link">
          <i className="bi bi-plus-circle me-1"></i> Add details
        </span>
      </div>
      <table className="table table-borderless align-middle">
        <thead>
          <tr>
            <th>Skills</th>
            <th>Version</th>
            <th>Last Used</th>
            <th>Experience</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Android Studio</td>
            <td>-</td>
            <td>2025</td>
            <td>0 year 2 months</td>
            <td>
              <i className="bi bi-pencil edit-icon ms-2"></i>
            </td>
          </tr>
          <tr>
            <td>Visual Studio</td>
            <td>-</td>
            <td>2025</td>
            <td>0 year 2 months</td>
            <td>
              <i className="bi bi-pencil edit-icon ms-2"></i>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ITSkillsSection;