import React from "react";

const QuickLinks = ({ onEditClick, sectionStatus }: { onEditClick?: any; sectionStatus:any; }) => {
   const items = [
    { key: "resume", label: "Resume" },
    { key: "profileTitle", label: "Profile Title" },
    { key: "keySkills", label: "Key Skills" },
    { key: "employment", label: "Employment" },
    { key: "education", label: "Education" },
    { key: "itSkills", label: "IT Skills" },
    { key: "certification", label: "Certifications" },
    { key: "personalDetails", label: "Personal Details" },
  ];

  return (
    <div className="card quick-links rounded-4">
      <div className="card-header bg-opacity-10 fw-semibold text-dark border-0 py-3">
        Quick Links
      </div>
      <div className="card-body">
        <ul className="list-unstyled mb-0">
          {items.map((item, index) => (
            <li
              key={index}
              className="d-flex justify-content-between align-items-center mb-2"
            >
              <span
                style={{ cursor: "pointer" }}
                onClick={sectionStatus[item.key] && onEditClick(item.key)}
              >
                 {item.label}
              </span>

             <a href="#" className="small fw-medium">
                {sectionStatus[item.key] ? "+ Edit" : "+ Add"}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default QuickLinks;
