import {Link, useNavigate, useLocation} from "react-router-dom";
import {useState, useEffect} from "react";
import {LogOut, Menu, X} from "lucide-react";
import {Button} from "./ui/button";
import {adminLogout} from "@/api/api";
import {toast} from "sonner";

const navItems = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "Submit Report",
    path: "/submit-report",
  },
  {
    name: "Track Report",
    path: "/track-report",
  },
  {
    name: "Nearby Support",
    path: "/near-by-support",
  },
  {
    name: "How it works",
    path: "/how-it-works",
  },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [admin, setAdmin] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Load admin from localStorage on component mount
  useEffect(() => {
    const savedAdmin = localStorage.getItem("admin");
    if (savedAdmin) {
      setAdmin(JSON.parse(savedAdmin));
    }
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // logout
  const handleLogout = async () => {
    try {
      await adminLogout();
      localStorage.removeItem("authToken");
      localStorage.removeItem("admin");
      setAdmin(null);
      toast.success("Logged out successfully");
      navigate("/admin/login");
    } catch (error) {
      console.error("Logout error:", error);
      // Still logout even if API fails
      localStorage.removeItem("authToken");
      localStorage.removeItem("admin");
      setAdmin(null);
      navigate("/admin/login");
    }
  };

  const isDashboard = window.location.pathname === "/admin/dashboard";
  const isHomePage = window.location.pathname === "/";

  if (admin) {
    return (
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-md"
            : "bg-white border-b border-gray-100"
        }`}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link
                to="/"
                className="text-2xl font-bold text-gray-900 hover:text-gray-700 transition-colors duration-200"
              >
                Rapid<span className="text-red-500 ">Report</span>
              </Link>
            </div>
            {/* left section  */}
            {admin ? (
              <div className="flex items-center gap-3">
                {isDashboard ? null : (
                  <Button
                    variant="outline"
                    className="border border-gray-300 hover:bg-gray-100"
                  >
                    <Link to="/admin/dashboard">
                      <span className="flex justify-center items-center gap-2">
                        Dashboard
                      </span>
                    </Link>
                  </Button>
                )}
                {isHomePage ? null : (
                  <Button
                    variant="outline"
                    onClick={handleLogout}
                    className="border border-gray-300 hover:bg-gray-100"
                  >
                    <LogOut />
                  </Button>
                )}
              </div>
            ) : (
              "please log in"
            )}
          </div>
        </nav>
      </header>
    );
  }

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-md"
          : "bg-white border-b border-gray-100"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link
              to="/"
              className="text-2xl font-bold text-gray-900 hover:text-gray-700 transition-colors duration-200"
            >
              RapidReport
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`font-medium transition-colors duration-200 relative ${
                    isActive
                      ? "text-red-500 border-b-2 border-red-500 pb-1"
                      : "text-gray-700 hover:text-red-500"
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </div>

          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-red-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-red-500 transition-colors duration-200"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>

          {/* Mobile menu button */}
        </div>

        {/* Mobile Navigation Menu */}
        <div
          className={`md:hidden transition-all duration-300 ease-in-out ${
            isMenuOpen
              ? "max-h-64 opacity-100"
              : "max-h-0 opacity-0 overflow-hidden"
          }`}
        >
          <div
            className={`px-2 pt-2 pb-3 space-y-1 border-t transition-all duration-300 ${
              isScrolled
                ? "bg-white/80 backdrop-blur-md border-gray-200/50"
                : "bg-white border-gray-200"
            }`}
          >
            {!admin &&
              navItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`block px-3 py-2 font-medium rounded-md transition-colors duration-200 ${
                      isActive
                        ? "text-red-500 bg-red-50 border-l-4 border-red-500"
                        : "text-gray-700 hover:text-red-500 hover:bg-gray-50"
                    }`}
                  >
                    {item.name}
                  </Link>
                );
              })}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
