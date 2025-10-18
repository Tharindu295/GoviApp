"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LanguageProvider, useLanguage } from "../components/LanguageProvider";
import ProfitCalculatorForm from "../components/ProfitCalculatorForm";

function AuthContent() {
  const { t } = useLanguage();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    nic: "",
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError("");
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Basic validation
    if (!formData.nic || !formData.password) {
      setError("Please fill in all fields");
      setIsLoading(false);
      return;
    }

    try {
      // Here you would typically make an API call to authenticate
      // For now, we'll simulate a successful login
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Store authentication state (in a real app, use proper state management)
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("userNIC", formData.nic);

      router.push("/dashboard");
    } catch (err) {
      setError("Invalid NIC number or password");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Basic validation
    if (!formData.nic || !formData.password || !formData.confirmPassword) {
      setError("Please fill in all fields");
      setIsLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long");
      setIsLoading(false);
      return;
    }

    try {
      // Here you would typically make an API call to register the user
      // For now, we'll simulate a successful registration
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Auto-login after successful registration
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("userNIC", formData.nic);

      router.push("/dashboard");
    } catch (err) {
      setError("Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-yellow-50 to-green-100 flex items-center justify-center p-4">
      <div className="max-w-lg w-full bg-white rounded-3xl shadow-2xl p-8 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-4 right-4 w-16 h-16 bg-green-100 rounded-full opacity-50"></div>
        <div className="absolute bottom-4 left-4 w-12 h-12 bg-yellow-100 rounded-full opacity-50"></div>
        <div className="absolute top-1/2 left-2 w-8 h-8 bg-orange-100 rounded-full opacity-30"></div>

        {/* Header */}
        <div className="text-center mb-8 relative z-10">
          <div className="mb-4 text-4xl">
            {isLogin ? "🌾" : "🌱"}
          </div>
          <h1 className="text-3xl font-bold text-green-800 mb-3">
            {isLogin ? t("auth.welcome_back") : t("auth.create_account")}
          </h1>
          <p className="text-lg text-gray-700 mb-2">
            {isLogin
              ? t("auth.welcome_subtitle")
              : t("auth.create_subtitle")
            }
          </p>
          <p className="text-sm text-gray-600">
            {isLogin
              ? t("auth.welcome_tagline")
              : t("auth.create_tagline")
            }
          </p>
        </div>

        {/* Toggle Buttons */}
        <div className="flex bg-gray-100 rounded-xl p-1 mb-6 relative z-10">
          <button
            type="button"
            onClick={() => setIsLogin(true)}
            className={`flex-1 py-3 px-4 rounded-lg font-bold transition-all duration-300 ${
              isLogin
                ? "bg-white text-green-700 shadow-lg transform scale-105"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            🔑 {t("auth.login_btn")}
          </button>
          <button
            type="button"
            onClick={() => setIsLogin(false)}
            className={`flex-1 py-3 px-4 rounded-lg font-bold transition-all duration-300 ${
              !isLogin
                ? "bg-white text-orange-600 shadow-lg transform scale-105"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            ✨ {t("auth.register_btn")}
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-6 relative z-10">
            <div className="flex items-center space-x-2">
              <span>⚠️</span>
              <span>{error}</span>
            </div>
          </div>
        )}

        {/* Form */}
        <form onSubmit={isLogin ? handleLogin : handleRegister} className="space-y-6 relative z-10">
          <div>
            <label htmlFor="nic" className="block text-sm font-bold text-green-800 mb-2">
              {t("auth.nic_label")}
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">🆔</span>
              <input
                type="text"
                id="nic"
                name="nic"
                value={formData.nic}
                onChange={handleInputChange}
                placeholder="Enter your NIC number"
                className="w-full pl-10 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-300 bg-green-50 focus:bg-white"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-bold text-green-800 mb-2">
              {t("auth.password_label")}
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">🔒</span>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Enter your password"
                className="w-full pl-10 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-300 bg-green-50 focus:bg-white"
                required
              />
            </div>
          </div>

          {!isLogin && (
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-bold text-green-800 mb-2">
                {t("auth.confirm_password_label")}
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">✅</span>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="Confirm your password"
                  className="w-full pl-10 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-300 bg-green-50 focus:bg-white"
                  required
                />
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-4 px-6 rounded-xl font-bold text-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl ${
              isLogin
                ? "bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white shadow-lg"
                : "bg-orange-500 hover:bg-orange-600 disabled:bg-orange-400 text-white shadow-lg"
            }`}
          >
            {isLoading ? (
              <div className="flex items-center justify-center space-x-3">
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                <span>
                  {isLogin ? t("auth.signing_in") : t("auth.creating_account")}
                </span>
              </div>
            ) : (
              <div className="flex items-center justify-center space-x-2">
                <span>{isLogin ? "🚪" : "✨"}</span>
                <span>
                  {isLogin ? t("auth.login_action") : t("auth.register_action")}
                </span>
              </div>
            )}
          </button>
        </form>

        {/* Help Section */}
        <div className="mt-8 p-4 bg-gray-50 rounded-xl relative z-10">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <span>📞</span>
            <span className="font-bold text-gray-700">{t("home.need_help")}</span>
          </div>
          <p className="text-xs text-gray-600 text-center">
            {t("auth.help_text")}
          </p>
        </div>

        {/* Footer */}
        <div className="mt-6 text-center text-sm text-gray-500 relative z-10">
          <p>{t("auth.footer")}</p>
        </div>
      </div>

      {/* Profit Calculator Form */}
      <div className="mt-8 max-w-md mx-auto">
        <ProfitCalculatorForm />
      </div>
    </div>
  );
}

export default function AuthPage() {
  return (
    <LanguageProvider>
      <AuthContent />
    </LanguageProvider>
  );
}