"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { LanguageProvider, useLanguage } from "../components/LanguageProvider";
import { ThemeProvider, useTheme } from "../components/ThemeProvider";
import ProfitCalculatorForm from "../components/ProfitCalculatorForm";

function DashboardContent() {
  const { t, language, setLanguage } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const [userNIC, setUserNIC] = useState("");
  const [currentTime, setCurrentTime] = useState("");
  const [showReports, setShowReports] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check if user is authenticated
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    if (!isAuthenticated) {
      router.push("/Auth");
      return;
    }

    // Get user NIC
    const nic = localStorage.getItem("userNIC");
    if (nic) {
      setUserNIC(nic);
    }

    // Update time every second
    const updateTime = () => {
      setCurrentTime(new Date().toLocaleString());
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userNIC");
    router.push("/");
  };

  const dashboardCards = [
    {
      title: t("dashboard.crop_management"),
      titleEn: "Crop Management",
      description: t("dashboard.crop_management_desc"),
      descriptionEn: "Manage your crops and farming activities",
      href: "/dashboard/category",
      color: "bg-green-600 hover:bg-green-700",
      icon: "🌱",
      shadowColor: "shadow-green-200"
    },
    {
      title: t("dashboard.weather_forecast"),
      titleEn: "Weather Forecast",
      description: t("dashboard.weather_forecast_desc"),
      descriptionEn: "Check weather conditions for your area",
      href: "#",
      color: "bg-blue-600 hover:bg-blue-700",
      icon: "🌤️",
      shadowColor: "shadow-blue-200"
    },
    {
      title: t("dashboard.market_prices"),
      titleEn: "Market Prices",
      description: t("dashboard.market_prices_desc"),
      descriptionEn: "View current agricultural market rates",
      href: "#",
      color: "bg-yellow-600 hover:bg-yellow-700",
      icon: "💰",
      shadowColor: "shadow-yellow-200"
    },
    {
      title: t("dashboard.farm_records"),
      titleEn: "Farm Records",
      description: t("dashboard.farm_records_desc"),
      descriptionEn: "Keep track of your farming records",
      href: "#",
      color: "bg-orange-600 hover:bg-orange-700",
      icon: "📊",
      shadowColor: "shadow-orange-200"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-yellow-50 to-green-100 dark:from-gray-900 dark:via-green-900 dark:to-gray-800">
      {/* Header */}
      <header className="bg-green-100 dark:bg-gray-800 shadow-lg border-b-2 border-green-100 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-4">
              <div className="text-3xl">🌾</div>
              <div>
                <h1 className="text-3xl font-bold text-green-800 dark:text-green-400">{t("dashboard.title")}</h1>
                <p className="text-sm text-gray-600 dark:text-gray-300">{t("dashboard.subtitle")}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-green-100 dark:bg-green-900 px-4 py-2 rounded-full">
                <span className="text-sm font-medium text-green-800 dark:text-green-200">NIC: {userNIC}</span>
              </div>

              {/* Theme Toggle Button */}
              <button
                onClick={toggleTheme}
                className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-xl text-sm font-bold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center space-x-2"
                title={t("theme.toggle")}
              >
                <span className="text-lg">{theme === "light" ? "🌙" : "☀️"}</span>
                <span className="hidden sm:inline">{theme === "light" ? t("theme.dark") : t("theme.light")}</span>
              </button>

              {/* Language Toggle Button */}
              <button
                onClick={() => setLanguage(language === "si" ? "en" : "si")}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-bold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center space-x-2"
                title={t("language.toggle")}
              >
                <span className="text-lg">{language === "si" ? "🇺🇸" : "🇱🇰"}</span>
                <span className="hidden sm:inline">{language === "si" ? t("language.english") : t("language.sinhala")}</span>
              </button>

              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-xl text-sm font-bold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center space-x-2"
              >
                <span>🚪</span>
                <span>{t("nav.logout")}</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Welcome Section */}
        <div className="mb-8 bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 relative overflow-hidden">
          <div className="absolute top-4 right-4 w-16 h-16 bg-green-100 rounded-full opacity-50"></div>
          <div className="absolute bottom-4 left-4 w-12 h-12 bg-yellow-100 rounded-full opacity-50"></div>

          <div className="relative z-10">
            <h2 className="text-4xl font-bold text-green-800 dark:text-green-400 mb-3">
              {t("dashboard.welcome")}
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-2">
              {t("dashboard.welcome_subtitle")}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {t("dashboard.current_time")} {currentTime}
            </p>
          </div>
        </div>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {dashboardCards.map((card, index) => (
            <Link
              key={index}
              href={card.href}
              className="block group"
            >
              <div className={`${card.color} rounded-2xl p-6 text-white hover:shadow-2xl transition-all duration-300 group-hover:scale-105 ${card.shadowColor} relative overflow-hidden`}>
                <div className="absolute top-3 right-3 w-8 h-8 bg-white bg-opacity-20 rounded-full"></div>
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-2">{card.title}</h3>
                      <p className="text-sm opacity-90 leading-relaxed">{card.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-3xl">{card.icon}</span>
                    <span className="text-xs opacity-75">{card.titleEn}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-8">
          <div className="flex items-center mb-6">
            <span className="text-2xl mr-3">⚡</span>
            <h3 className="text-2xl font-bold text-green-800 dark:text-green-400">{t("dashboard.quick_actions")}</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              onClick={() => router.push('/dashboard/category')}
              className="flex items-center justify-center p-6 bg-green-50 dark:bg-green-900/20 hover:bg-green-100 dark:hover:bg-green-900/30 rounded-xl text-green-700 dark:text-green-300 font-bold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 border-2 border-green-200 dark:border-green-700 hover:border-green-300 dark:hover:border-green-600"
            >
              <span className="mr-3 text-2xl">🌱</span>
              <span>{t("dashboard.add_crop")}</span>
            </button>
            <button
              onClick={() => setShowReports(!showReports)}
              className="flex items-center justify-center p-6 bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded-xl text-blue-700 dark:text-blue-300 font-bold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 border-2 border-blue-200 dark:border-blue-700 hover:border-blue-300 dark:hover:border-blue-600"
            >
              <span className="mr-3 text-2xl">📊</span>
              <span>{t("dashboard.view_reports")}</span>
            </button>
            <button className="flex items-center justify-center p-6 bg-orange-50 dark:bg-orange-900/20 hover:bg-orange-100 dark:hover:bg-orange-900/30 rounded-xl text-orange-700 dark:text-orange-300 font-bold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 border-2 border-orange-200 dark:border-orange-700 hover:border-orange-300 dark:hover:border-orange-600">
              <span className="mr-3 text-2xl">⚙️</span>
              <span>{t("dashboard.settings")}</span>
            </button>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
          <div className="flex items-center mb-6">
            <span className="text-2xl mr-3">📋</span>
            <h3 className="text-2xl font-bold text-green-800 dark:text-green-400">{t("dashboard.recent_activity")}</h3>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between py-4 px-6 bg-green-50 dark:bg-green-900/20 rounded-xl border-l-4 border-green-500">
              <div className="flex items-center">
                <span className="text-green-600 mr-4 text-xl">✅</span>
                <span className="text-gray-900 dark:text-gray-100 font-medium">{t("dashboard.harvest_success")}</span>
              </div>
              <span className="text-sm text-gray-600 dark:text-gray-400 bg-white dark:bg-gray-700 px-3 py-1 rounded-full">{t("dashboard.hours_ago")}</span>
            </div>
            <div className="flex items-center justify-between py-4 px-6 bg-blue-50 dark:bg-blue-900/20 rounded-xl border-l-4 border-blue-500">
              <div className="flex items-center">
                <span className="text-blue-600 mr-4 text-xl">💧</span>
                <span className="text-gray-900 dark:text-gray-100 font-medium">{t("dashboard.irrigation_activated")}</span>
              </div>
              <span className="text-sm text-gray-600 dark:text-gray-400 bg-white dark:bg-gray-700 px-3 py-1 rounded-full">{t("dashboard.hours_ago_5")}</span>
            </div>
            <div className="flex items-center justify-between py-4 px-6 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl border-l-4 border-yellow-500">
              <div className="flex items-center">
                <span className="text-yellow-600 mr-4 text-xl">🌾</span>
                <span className="text-gray-900 dark:text-gray-100 font-medium">{t("dashboard.fertilizer_applied")}</span>
              </div>
              <span className="text-sm text-gray-600 dark:text-gray-400 bg-white dark:bg-gray-700 px-3 py-1 rounded-full">{t("dashboard.day_ago")}</span>
            </div>
          </div>
        </div>

        {/* Profit Calculator Form */}
        <div className="mt-8">
          <ProfitCalculatorForm />
        </div>

        {/* Category Reports */}
        {showReports && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <span className="text-2xl mr-3">📈</span>
                <h3 className="text-2xl font-bold text-green-800 dark:text-green-400">Category Reports</h3>
              </div>
              <button
                onClick={() => setShowReports(false)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <span className="text-xl">✕</span>
              </button>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {/* Services Report */}
              <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-xl p-6 border border-green-200 dark:border-green-800">
                <div className="flex items-center mb-4">
                  <span className="text-3xl mr-3">🚜</span>
                  <div>
                    <h4 className="text-lg font-semibold text-green-800 dark:text-green-400">Services</h4>
                    <p className="text-sm text-green-600 dark:text-green-300">Investment: $5,000</p>
                    <p className="text-sm text-green-600 dark:text-green-300">Profit: $8,500</p>
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400">$3,500</div>
                  <p className="text-sm text-green-600 dark:text-green-300">Net Profit</p>
                  <div className="mt-3">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
                      🎉 Excellent ROI
                    </span>
                  </div>
                </div>
              </div>

              {/* Resources Report */}
              <div className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 rounded-xl p-6 border border-orange-200 dark:border-orange-800">
                <div className="flex items-center mb-4">
                  <span className="text-3xl mr-3">📚</span>
                  <div>
                    <h4 className="text-lg font-semibold text-orange-800 dark:text-orange-400">Resources</h4>
                    <p className="text-sm text-orange-600 dark:text-orange-300">Investment: $2,000</p>
                    <p className="text-sm text-orange-600 dark:text-orange-300">Profit: $3,200</p>
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">$1,200</div>
                  <p className="text-sm text-orange-600 dark:text-orange-300">Net Profit</p>
                  <div className="mt-3">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300">
                      📈 Good Returns
                    </span>
                  </div>
                </div>
              </div>

              {/* Contact Report */}
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-xl p-6 border border-purple-200 dark:border-purple-800">
                <div className="flex items-center mb-4">
                  <span className="text-3xl mr-3">📞</span>
                  <div>
                    <h4 className="text-lg font-semibold text-purple-800 dark:text-purple-400">Contact</h4>
                    <p className="text-sm text-purple-600 dark:text-purple-300">Investment: $1,500</p>
                    <p className="text-sm text-purple-600 dark:text-purple-300">Profit: $2,800</p>
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">$1,300</div>
                  <p className="text-sm text-purple-600 dark:text-purple-300">Net Profit</p>
                  <div className="mt-3">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300">
                      💼 Partnership Value
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                These calculations are based on your recent profit calculator entries across all categories.
              </p>
              <div className="flex justify-center space-x-4">
                <Link
                  href="/services"
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                >
                  View Services Details
                </Link>
                <Link
                  href="/resources"
                  className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                >
                  View Resources Details
                </Link>
                <Link
                  href="/contact"
                  className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                >
                  View Contact Details
                </Link>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default function Dashboard() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <DashboardContent />
      </LanguageProvider>
    </ThemeProvider>
  );
}