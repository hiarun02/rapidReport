import {create} from "zustand";

interface AdminState {
  admin: any | null; // Store the full user object from API
  setAdmin: (admin: unknown) => void;
  clearAdmin: () => void;
}

export const useAdminStore = create<AdminState>((set) => ({
  // ✅ Load admin from localStorage when the app starts
  admin: JSON.parse(localStorage.getItem("adminUser") || "null"),

  // ✅ Save full admin object when logged in
  setAdmin: (admin) => {
    localStorage.setItem("adminUser", JSON.stringify(admin));
    set({admin});
  },

  // ✅ Clear admin data on logout
  clearAdmin: () => {
    localStorage.removeItem("adminUser");
    set({admin: null});
  },
}));
