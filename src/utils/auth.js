const getAuthAdminHeaders = (isFormData = false) => {
const token = localStorage.getItem("adminToken") ||localStorage.getItem("employeeToken");

  if (!token) return {};
  return {
    headers: {
      Authorization: `Bearer ${token.trim()}`,
      ...(isFormData
        ? { "Content-Type": "multipart/form-data" }
        : { "Content-Type": "application/json" }),
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
