import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {LogInIcon, EyeIcon, EyeOffIcon, ShieldCheckIcon} from "lucide-react";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {toast} from "sonner";

const Login = () => {
  interface FormData {
    email: string;
    password: string;
  }

  const [form, setForm] = useState<FormData>({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // temp logic
      if (form.email === "admin@gmail.com" && form.password === "admin123") {
        navigate("/admin/dashboard");
        toast("Logged in Successfully...");
      } else {
        toast("Invalid email or password. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen  flex justify-center items-center p-4 py-10">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-red-600 rounded-full mb-4">
            <ShieldCheckIcon className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-lg font-bold text-gray-900 mb-2">
            Rapid Report Admin
          </h1>
          <p className="text-gray-600">Sign in to access the dashboard</p>
        </div>
        {/* Login Form */}
        <div className="bg-white rounded-xl shadow p-8 border border-gray-100">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <Label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email Address
              </Label>
              <Input
                name="email"
                type="email"
                value={form.email}
                onChange={(e) =>
                  setForm((prev) => ({...prev, email: e.target.value}))
                }
                placeholder="admin@gmail.com"
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors`}
                disabled={isLoading}
              />
            </div>

            {/* Password Field */}
            <div>
              <Label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Password
              </Label>
              <div className="relative">
                <Input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={form.password}
                  onChange={(e) =>
                    setForm((prev) => ({...prev, password: e.target.value}))
                  }
                  placeholder="admin123"
                  className={`w-full px-4 py-3 pr-12 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors `}
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                  disabled={isLoading}
                >
                  {showPassword ? (
                    <EyeOffIcon className="w-5 h-5" />
                  ) : (
                    <EyeIcon className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-red-500 hover:bg-red-600 text-white py-3 px-4 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Signing in...
                </>
              ) : (
                <>
                  <LogInIcon className="w-5 h-5" />
                  Sign In
                </>
              )}
            </Button>
          </form>
        </div>

        <div className="text-center mt-8">
          <p className="text-sm text-gray-600">
            Secure admin access • Rapid
            <span className="text-red-500">Report</span> Management System
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
