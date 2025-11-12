import React from 'react';

const LanguagesSection = () => {
  return (
    <div className="card-section">
      <div className="section-header p-3 mb-0">
        <i className="bi bi-translate"></i> Languages
        <span className="add-link">
          <i className="bi bi-plus-circle me-1"></i> Add details
        </span>
      </div>
      <table className="table table-borderless align-middle">
        <thead>
          <tr>
            <th>Language</th>
            <th>Read</th>
            <th>Write</th>
            <th>Speak</th>
            <th>Proficiency</th>
          </tr>
        </thead>
        <tbody>
          {['English', 'Kannada', 'Hindi', 'Telugu'].map((lang, index) => (
            <tr key={index}>
              <td>{lang}</td>
              <td>
                <i className="bi bi-check-circle-fill lang-check"></i>
              </td>
              <td>
                <i className="bi bi-check-circle-fill lang-check"></i>
              </td>
              <td>
                <i className="bi bi-check-circle-fill lang-check"></i>
              </td>
              <td>Expert</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LanguagesSection;