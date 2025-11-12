const getAuthAdminHeaders = (isFormData = false) => {
  const token = localStorage.getItem("adminToken");
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