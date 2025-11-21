import React from "react";

const QuickLinks = ({ onEditClick }: { onEditClick?: any }) => {
  const items = [
    "Resume",
    "Profile Title",
    "Key Skills",
    "Employment",
    "Education",
    "IT Skills",
    "Certifications",
    "Person details",
    "Languages",
  ];

  return (
    <div className="card quick-links rounded-4">
      <div className="card-header bg-opacity-10 fw-semibold text-dark border-0 py-3">
        Quick Links
      </div>
      <div className="card-body">
        <ul className="list-unstyled mb-0">
          {items.map((link, index) => (
            <li
              key={index}
              className="d-flex justify-content-between align-items-center mb-2"
            >
              <span
                style={{ cursor: "pointer" }}
                onClick={link === "Resume" ? onEditClick : undefined}
              >
                {link}
              </span>

              {(index < 5 || index === 8) && (
                <a href="#" className="small fw-medium">
                  + Add
                </a>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default QuickLinks;
