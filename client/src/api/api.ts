import {REPORT_SUBMIT_ROUTE} from "@/utils/constants";
import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

// Add token to request headers
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle 401 responses
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("authToken");
      localStorage.removeItem("admin");
      window.location.href = "/admin/login";
    }
    return Promise.reject(error);
  }
);

interface FormData {
  reportId: string;
  reportType: "emergency" | "non-emergency" | "";
  imageFile: File | null;
  imagePreview: string | null;
  incidentType: string;
  title: string;
  description: string;
  location: string;
}

export const submitForm = async (formData: FormData) => {
  const submitData = new FormData();

  submitData.append("reportId", formData.reportId);
  submitData.append("reportType", formData.reportType);
  submitData.append("incidentType", formData.incidentType);
  submitData.append("title", formData.title);
  submitData.append("description", formData.description);
  submitData.append("location", formData.location);

  if (formData.imageFile) {
    submitData.append("imageFile", formData.imageFile);
  }

  return await api.post(REPORT_SUBMIT_ROUTE, submitData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const trackReportById = async (reportId: string) => {
  return await api.get(`/api/track-report/${reportId}`);
};

// Admin login
export const adminLogin = async (email: string, password: string) => {
  return api.post("/api/admin/login", {email, password});
};

// Admin logout
export const adminLogout = async () => {
  return api.post("/api/admin/logout");
};

// Admin API functions
export const getAllReports = async () => {
  return await api.get("/api/admin/reports");
};

export const updateReportStatus = async (reportId: string, status: string) => {
  return await api.patch(`/api/admin/reports/${reportId}/status`, {status});
};

export const getReportById = async (reportId: string) => {
  return await api.get(`/api/admin/reports/${reportId}`);
};

export const analyzeImage = async (imageFile: File) => {
  const formData = new FormData();
  formData.append("image", imageFile);

  return await api.post("/api/analyze-image", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const deleteReport = (id: string) =>
  api.delete(`/api/admin/reports/${id}`);
