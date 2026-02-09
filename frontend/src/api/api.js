import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, 
//   LOGIN_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const signUpUser = (payload) => {
  return api.post("/users/signup", payload);
};

export const loginUser = ({ email, password, otp }) => {
  const formData = new URLSearchParams();
  formData.append("username", email);   //Here , we need to keep username only because OAuth is expecting the same
  formData.append("password", password);

  if (otp) {
    formData.append("otp", otp);
  }

  return api.post("/auth/login", formData, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
};

export const forgotPassword = ({ countryCode, mobile }) => {
  return api.post("/auth/forgot-password", {
    mobile_number: `${countryCode}${mobile}`.trim()
  });
};

export const forgotUsername = ({ mobile }) => {
  return api.post("/auth/forgot-username", {
    phone_number: mobile.trim(),
  });
};

export const getInboxMails = () => api.get("/mail/inbox");

export const getSentMails = () => api.get("/mail/sent");

export const getDraftMails = () => api.get("/mail/drafts");

export const getStarredMails = () => api.get("/mail/starred");

export const getImportantMails = () => api.get("/mail/important");

export const getSpamMails = () => api.get("/mail/spam");

export const getTrashMails = () => api.get("/mail/trash");

export const getArchivedMails = () => api.get("/mail/archived");

export const getUnreadMails = () => api.get("/mail/unread");

