import { forgotPasswordEmployee, forgotPasswordEmployer, resetPasswordEmployee, resetPasswordEmployer, verifyOtpEmployee, verifyOtpEmployer } from "../../redux/slices/forgotPasswordSlice.tsx";

export const forgotPasswordHandler = async (
  dispatch: any,
  role: "employee" | "employer",
  email: string
) => {
  if (role === "employee") {
    return await dispatch(forgotPasswordEmployee({ email }));
  }
  return await dispatch(forgotPasswordEmployer({ email }));
};


export const verifyOtpHandler = async (
  dispatch: any,
  role: "employee" | "employer",
  email: string,
  otp: number
) => {
  if (role === "employee") {
    return await dispatch(verifyOtpEmployee({ email, otp }));
  }
  return await dispatch(verifyOtpEmployer({ email, otp }));
};


export const resetPasswordHandler = async (
  dispatch: any,
  role: "employee" | "employer",
  email: string,
  newPassword: string,
  confirmPassword: string
) => {
  if (role === "employee") {
    return await dispatch(resetPasswordEmployee({ email, newPassword, confirmPassword }));
  }
  return await dispatch(resetPasswordEmployer({ email, newPassword, confirmPassword }));
};
