import {createContext, ReactNode, useState} from "react";

export interface AdminState {
  admin: AdminUser | null;
  setAdmin: (admin: AdminUser | null) => void;
  clearAdmin: () => void;
}

export interface AdminUser {
  id: string;
  email: string;
  name?: string;
}

interface AdminProviderProps {
  children: ReactNode;
}

const AdminContext = createContext<AdminState | undefined>(undefined);

export const AdminProvider = ({children}: AdminProviderProps) => {
  const [admin, setAdminState] = useState<AdminUser | null>(() => {
    const savedAdmin = localStorage.getItem("adminUser");
    return savedAdmin ? JSON.parse(savedAdmin) : null;
  });

  const setAdmin = (adminData: AdminUser | null) => {
    if (adminData) {
      localStorage.setItem("adminUser", JSON.stringify(adminData));
    } else {
      localStorage.removeItem("adminUser");
    }
    setAdminState(adminData);
  };

  const clearAdmin = () => {
    setAdmin(null);
  };

  return (
    <AdminContext.Provider value={{admin, setAdmin, clearAdmin}}>
      {children}
    </AdminContext.Provider>
  );
};
export default AdminContext;
