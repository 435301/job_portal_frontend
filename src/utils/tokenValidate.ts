// utils/jwtValidation.ts
import {jwtDecode} from "jwt-decode";

export const isTokenExpired = (token: string): Boolean => {
  if (!token) return true;

  try {
    const decoded: any = jwtDecode(token);
    const currentTime = Date.now() / 1000; 
    return decoded.exp < currentTime;
  } catch (e) {
    return true; // invalid token
  }
};
