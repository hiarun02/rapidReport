import Header from "../Header";
import Footer from "../Footer";
import {Outlet, useNavigate} from "react-router-dom";
import {useAdminStore} from "@/store/useAdminStore";
import {useEffect} from "react";

const Layout = () => {
  const {admin} = useAdminStore();

  const navigate = useNavigate();
  // ✅ Redirect if already logged in
  useEffect(() => {
    if (admin) {
      navigate("/admin/dashboard");
    }
  }, [admin, navigate]);
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
