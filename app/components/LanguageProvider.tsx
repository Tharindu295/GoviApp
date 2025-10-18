"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type Language = "si" | "en";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  // Navigation & Common
  "nav.home": { si: "මුල් පිටුව", en: "Home" },
  "nav.dashboard": { si: "උපකරණ පුවරුව", en: "Dashboard" },
  "nav.login": { si: "ඇතුල් වන්න", en: "Login" },
  "nav.logout": { si: "පිටවීම", en: "Logout" },

  // Homepage
  "home.welcome": { si: "ගොවිApp", en: "GoviApp" },
  "home.subtitle": { si: "ඔබේ වගා කළමනාකරණ සහකරු", en: "Your farming companion" },
  "home.tagline": { si: "Your trusted farming companion", en: "Your trusted farming companion" },
  "home.crop_data": { si: "වගා දත්ත", en: "Crop Data" },
  "home.crop_data_desc": { si: "Track your crops", en: "Track your crops" },
  "home.income_management": { si: "ආදායම් කළමනාකරණය", en: "Income Management" },
  "home.income_management_desc": { si: "Manage income", en: "Manage income" },
  "home.weather_info": { si: "කාලගුණ තොරතුරු", en: "Weather Info" },
  "home.weather_info_desc": { si: "Weather info", en: "Weather info" },
  "home.description": { si: "Simple tools to help you farm better and earn more", en: "Simple tools to help you farm better and earn more" },
  "home.need_help": { si: "උදව් අවශ්‍යද?", en: "Need Help?" },
  "home.help_text": { si: "Simple • Secure • Made for Sri Lankan Farmers", en: "Simple • Secure • Made for Sri Lankan Farmers" },
  "home.grow_more": { si: "🌱 Grow more with technology 🌱", en: "🌱 Grow more with technology 🌱" },

  // Auth Page
  "auth.welcome_back": { si: "ආයුබෝවන්", en: "Welcome Back" },
  "auth.create_account": { si: "නව ගිණුමක්", en: "Create Account" },
  "auth.welcome_subtitle": { si: "ඔබේ ගිණුමට ඇතුල් වන්න", en: "Sign in to your account" },
  "auth.create_subtitle": { si: "ගොවිApp සමඟ එක්වන්න", en: "Join GoviApp today" },
  "auth.welcome_tagline": { si: "Welcome back to your farming companion", en: "Welcome back to your farming companion" },
  "auth.create_tagline": { si: "Start your digital farming journey", en: "Start your digital farming journey" },
  "auth.login_btn": { si: "🔑 ඇතුල් වීම", en: "🔑 Login" },
  "auth.register_btn": { si: "✨ ලියාපදිංචි වීම", en: "✨ Register" },
  "auth.nic_label": { si: "ජාතික හැඳුනුම්පත් අංකය", en: "NIC Number" },
  "auth.password_label": { si: "මුරපදය", en: "Password" },
  "auth.confirm_password_label": { si: "මුරපදය තහවුරු කරන්න", en: "Confirm Password" },
  "auth.signing_in": { si: "ඇතුල් වෙමින්...", en: "Signing in..." },
  "auth.creating_account": { si: "ගිණුම සාදමින්...", en: "Creating account..." },
  "auth.login_action": { si: "ඇතුල් වන්න", en: "Sign In" },
  "auth.register_action": { si: "ගිණුම සාදන්න", en: "Create Account" },
  "auth.help_text": { si: "ඔබේ NIC අංකය සහ සුරක්ෂිත මුරපදයක් භාවිතා කරන්න", en: "Use your NIC number and a secure password" },
  "auth.footer": { si: "🔐 Secure • Simple • Made for Sri Lankan Farmers", en: "🔐 Secure • Simple • Made for Sri Lankan Farmers" },

  // Dashboard
  "dashboard.title": { si: "ගොවිApp Dashboard", en: "GoviApp Dashboard" },
  "dashboard.subtitle": { si: "ඔබේ වගා කළමනාකරණ මධ්‍යස්ථානය", en: "Your farming management center" },
  "dashboard.welcome": { si: "ආයුබෝවන්! 🌞", en: "Welcome back! 🌞" },
  "dashboard.welcome_subtitle": { si: "ඔබේ ගොවිපොළ කළමනාකරණය සඳහා සාදරයෙන් පිළිගනිමු", en: "Welcome to your farm management" },
  "dashboard.current_time": { si: "වර්තමාන වේලාව:", en: "Current time:" },
  "dashboard.crop_management": { si: "වගා කළමනාකරණය", en: "Crop Management" },
  "dashboard.crop_management_desc": { si: "ඔබේ වගා සහ කෘෂිකාර්මික ක්‍රියාකාරකම් කළමනාකරණය කරන්න", en: "Manage your crops and farming activities" },
  "dashboard.weather_forecast": { si: "කාලගුණ අනාවැකිය", en: "Weather Forecast" },
  "dashboard.weather_forecast_desc": { si: "ඔබේ ප්‍රදේශයේ කාලගුණ තත්ත්වය පරීක්ෂා කරන්න", en: "Check weather conditions for your area" },
  "dashboard.market_prices": { si: "වෙළඳපොළ මිල", en: "Market Prices" },
  "dashboard.market_prices_desc": { si: "වර්තමාන කෘෂිකාර්මික වෙළඳපොළ ගාස්තු බලන්න", en: "View current agricultural market rates" },
  "dashboard.farm_records": { si: "ගොවිපොළ වාර්තා", en: "Farm Records" },
  "dashboard.farm_records_desc": { si: "ඔබේ කෘෂිකර්මාන්ත වාර්තා ලුහුබැඳ තබා ගන්න", en: "Keep track of your farming records" },
  "dashboard.quick_actions": { si: "ඉක්මන් ක්‍රියාකාරකම්", en: "Quick Actions" },
  "dashboard.add_crop": { si: "නව වගාවක් එකතු කරන්න", en: "Add New Crop" },
  "dashboard.view_reports": { si: "වාර්තා බලන්න", en: "View Reports" },
  "dashboard.settings": { si: "සැකසුම්", en: "Settings" },
  "dashboard.recent_activity": { si: "අලුත්ම ක්‍රියාකාරකම්", en: "Recent Activity" },
  "dashboard.harvest_success": { si: "සහල් වගාව සාර්ථකව අස්වැන්නම් කරන ලදී", en: "Rice crop harvested successfully" },
  "dashboard.irrigation_activated": { si: "වාරිමාර්ග පද්ධතිය සක්‍රිය කරන ලදී", en: "Irrigation system activated" },
  "dashboard.fertilizer_applied": { si: "ගහකොළ වගාවට පොහොර යෙදුවා", en: "Fertilizer applied to wheat field" },
  "dashboard.hours_ago": { si: "පැය 2කට පෙර", en: "2 hours ago" },
  "dashboard.hours_ago_5": { si: "පැය 5කට පෙර", en: "5 hours ago" },
  "dashboard.day_ago": { si: "දිනකට පෙර", en: "1 day ago" },

  // Language Toggle
  "language.sinhala": { si: "සිංහල", en: "සිංහල" },
  "language.english": { si: "English", en: "English" },
  "language.toggle": { si: "භාෂාව මාරු කරන්න", en: "Switch Language" },

  // Theme Toggle
  "theme.light": { si: "ලායිට් මෝඩ්", en: "Light Mode" },
  "theme.dark": { si: "ඩාර්ක් මෝඩ්", en: "Dark Mode" },
  "theme.toggle": { si: "තේමාව මාරු කරන්න", en: "Switch Theme" }
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("si");

  useEffect(() => {
    // Load saved language preference
    const savedLanguage = localStorage.getItem("language") as Language;
    if (savedLanguage && (savedLanguage === "si" || savedLanguage === "en")) {
      setLanguage(savedLanguage);
    }
  }, []);

  const updateLanguage = (newLanguage: Language) => {
    setLanguage(newLanguage);
    localStorage.setItem("language", newLanguage);
  };

  const t = (key: string): string => {
    const translation = translations[key as keyof typeof translations];
    if (!translation) {
      console.warn(`Translation key "${key}" not found`);
      return key;
    }
    return translation[language] || translation.en || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: updateLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
