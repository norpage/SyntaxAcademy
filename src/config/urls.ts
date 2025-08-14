const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL as string;

export const API_URLS = {
  login: `${BASE_URL}/auth/login`,
  register: `${BASE_URL}/auth/register`,
  verify: `${BASE_URL}/auth/verify`,
  resendVerification: `${BASE_URL}/auth/resend-verification`,
  requestReset: `${BASE_URL}/auth/request-reset`,
  resetPassword: `${BASE_URL}/auth/reset-password`,
  me: `${BASE_URL}/auth/me`,
  subscribe: `${BASE_URL}/subscribe`,
  updateMe: `${BASE_URL}/auth/me`,           // PUT
  changePassword: `${BASE_URL}/auth/change-password`, // PUT
};
