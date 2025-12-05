const getAuthAdminHeaders = (isFormData = false) => {
  const adminToken = localStorage.getItem("adminToken");
  const employeeToken = localStorage.getItem("employeeToken");
  const employerToken = localStorage.getItem("employerToken");

  const token = adminToken?.trim() || employeeToken?.trim() || employerToken?.trim();

  if (!token) return {};

  return {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": isFormData
        ? "multipart/form-data"
        : "application/json",
    },
  };
};

export default getAuthAdminHeaders;


// const getAuthAdminHeaders = (isFormData = false) => {
//   let token = localStorage.getItem("adminToken");

//   // If adminToken is empty or null, check employee token
//   if (!token || token === "null" || token === "undefined") {
//     token = localStorage.getItem("employeeToken");
//   }

//   // If employee token is also invalid → return empty headers (no Authorization)
//   if (!token || token === "null" || token === "undefined") {
//     return {};
//   }

//   return {
//     headers: {
//       Authorization: `Bearer ${token.trim()}`,
//       ...(isFormData
//         ? { "Content-Type": "multipart/form-data" }
//         : { "Content-Type": "application/json" }),
//     },
//   };
// };

// export default getAuthAdminHeaders;
