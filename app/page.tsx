"use client";

import Link from "next/link";
import { LanguageProvider, useLanguage } from "./components/LanguageProvider";

function HomeContent() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-yellow-50 to-green-100 flex items-center justify-center p-4">
      {/* Main Container */}
      <div className="max-w-2xl w-full bg-white rounded-3xl shadow-2xl p-8 text-center relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-4 right-4 w-16 h-16 bg-green-100 rounded-full opacity-50"></div>
        <div className="absolute bottom-4 left-4 w-12 h-12 bg-yellow-100 rounded-full opacity-50"></div>

        {/* Header Section */}
        <div className="mb-8 relative z-10 p-4 rounded-lg" style={{ backgroundColor: '#65C18C' }}>
          <div className="mb-4">
            🌾
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-3">
            {t("home.welcome")}
          </h1>
          <p className="text-lg text-gray-700 mb-2">
            {t("home.subtitle")}
          </p>
          <p className="text-sm text-gray-600">
            {t("home.tagline")}
          </p>
        </div>

        {/* Features Section */}
        <div className="mb-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-green-50 p-4 rounded-xl">
              <div className="text-2xl mb-2">📊</div>
              <h3 className="font-semibold text-green-800 text-sm">{t("home.crop_data")}</h3>
              <p className="text-xs text-gray-600">{t("home.crop_data_desc")}</p>
            </div>
            <div className="bg-yellow-50 p-4 rounded-xl">
              <div className="text-2xl mb-2">💰</div>
              <h3 className="font-semibold text-green-800 text-sm">{t("home.income_management")}</h3>
              <p className="text-xs text-gray-600">{t("home.income_management_desc")}</p>
            </div>
            <div className="bg-blue-50 p-4 rounded-xl">
              <div className="text-2xl mb-2">🌤️</div>
              <h3 className="font-semibold text-green-800 text-sm">{t("home.weather_info")}</h3>
              <p className="text-xs text-gray-600">{t("home.weather_info_desc")}</p>
            </div>
          </div>

          <p className="text-gray-600 text-sm mb-6">
            {t("home.description")}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 relative z-10">
          <Link
            href="/Auth"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-8 rounded-xl transition duration-300 flex items-center justify-center space-x-3 text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            <span>🚪</span>
            <span>ඇතුල් වන්න (Login)</span>
          </Link>

          <Link
            href="/Auth"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 px-8 rounded-xl transition duration-300 flex items-center justify-center space-x-3 text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            <span>✨</span>
            <span>ගිණුමක් සාදන්න (Sign Up)</span>
          </Link>
        </div>

        {/* Help Section */}
        <div className="mt-8 p-4 bg-gray-50 rounded-xl relative z-10">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <span>📞</span>
            <span className="font-semibold text-gray-700">{t("home.need_help")}</span>
          </div>
          <p className="text-xs text-gray-600">
            {t("home.help_text")}
          </p>
        </div>

        {/* Bottom Tagline */}
        <div className="mt-6 text-xs text-gray-500 relative z-10">
          <p>{t("home.grow_more")}</p>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <LanguageProvider>
      <HomeContent />
    </LanguageProvider>
  );
}
