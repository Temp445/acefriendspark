"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { Mail, Lock, LogIn, UserPlus, Eye, EyeOff, User } from "lucide-react";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const { login } = useAuth();

  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = await login(formData);

      if (result.success && result.user) {
        setError("");
        if (result.user.role === "ADMIN") {
          router.push("/admin/gallerydashboard");
        } else {
          router.push("/");
        }
      } else {
        setError(result.error ?? "Login failed");
      }
    } catch (err) {
      setError("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4 py-12 relative overflow-hidden">
      <div className="w-full max-w-md relative">
        <div className="bg-white/80 backdrop-blur-lg border shadow-2xl rounded-2xl p-8 transform transition-all duration-300 hover:scale-[1.01]">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 border rounded-full text-black flex items-center justify-center">
              <User className="w-10 h-10" />
            </div>
          </div>

          <h1 className="text-3xl font-bold text-black mb-2 text-center">
            Welcome Back
          </h1>
          <p className="text-center text-gray-600 mb-6 text-sm">
            Login in to continue to your account
          </p>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg animate-shake">
              <p className="text-center text-sm text-red-600">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="relative group">
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 z-10 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-700 transition-colors" />
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none transition-all bg-white/50 backdrop-blur-sm"
                  placeholder="Enter Your Email Id"
                />
              </div>
            </div>

            <div className="relative group">
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 z-10 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-700" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none transition-all bg-white/50 backdrop-blur-sm"
                  placeholder="Enter the Password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-black hover:bg-emerald-600 text-white py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transform transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Login...</span>
                </>
              ) : (
                <>
                  <LogIn className="w-5 h-5" />
                  <span>Login</span>
                </>
              )}
            </button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white/80 text-gray-500">New here?</span>
            </div>
          </div>

          <Link href="/register">
            <button className="w-full bg-white border text-gray-800 py-3 rounded-lg font-semibold hover:bg-orange-50 transform transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2">
              <UserPlus className="w-5 h-5" />
              <span>Create an Account</span>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
