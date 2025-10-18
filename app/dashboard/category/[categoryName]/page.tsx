"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { LanguageProvider, useLanguage } from "../../../components/LanguageProvider";

interface CropData {
  id: string;
  name: string;
  variety: string;
  plantingDate: string;
  expectedHarvest: string;
  status: "growing" | "harvested" | "failed";
  notes: string;
}

const categoryData: Record<string, {
  title: string;
  icon: string;
  description: string;
  tips: string[];
  bgColor: string;
}> = {
  tomato: {
    title: "Tomato",
    icon: "🍅",
    description: "Fresh tomatoes are perfect for cooking, salads, and sauces. They require warm weather and regular watering.",
    tips: [
      "Plant in well-drained soil with full sun exposure",
      "Water consistently but avoid wetting leaves to prevent disease",
      "Support plants with stakes or cages as they grow",
      "Harvest when fruits are fully colored but still firm"
    ],
    bgColor: "bg-red-50"
  },
  chili: {
    title: "Chili",
    icon: "🌶️",
    description: "Spicy chili peppers add heat and flavor to many dishes. They thrive in warm, sunny conditions.",
    tips: [
      "Choose varieties based on desired heat level",
      "Provide plenty of sunlight and warmth",
      "Use well-draining soil to prevent root rot",
      "Harvest peppers regularly to encourage more production"
    ],
    bgColor: "bg-orange-50"
  },
  beans: {
    title: "Beans",
    icon: "🫘",
    description: "Nutritious beans are easy to grow and provide protein-rich harvests throughout the season.",
    tips: [
      "Plant after the last frost in spring",
      "Provide support for climbing varieties",
      "Keep soil consistently moist but not waterlogged",
      "Harvest beans regularly when pods are firm and crisp"
    ],
    bgColor: "bg-green-50"
  }
};

function CategoryDetailContent() {
  const { t, language, setLanguage } = useLanguage();
  const [userNIC, setUserNIC] = useState("");
  const [crops, setCrops] = useState<CropData[]>([]);
  const [newCropName, setNewCropName] = useState("");
  const [newCropVariety, setNewCropVariety] = useState("");
  const [totalInvestment, setTotalInvestment] = useState(0);
  const [totalProfit, setTotalProfit] = useState(0);
  const [investmentInput, setInvestmentInput] = useState("");
  const [profitInput, setProfitInput] = useState("");
  const params = useParams();
  const router = useRouter();

  const categoryName = typeof params?.categoryName === 'string' ? params.categoryName : '';
  const categoryInfo = categoryData[categoryName] || {
    title: "Unknown Category",
    icon: "🌱",
    description: "Category information not available.",
    tips: ["No specific tips available for this category."],
    bgColor: "bg-gray-50"
  };

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

    // Load crops for this category
    const savedCrops = localStorage.getItem(`crops_${categoryName}`);
    if (savedCrops) {
      setCrops(JSON.parse(savedCrops));
    }

    // Load investment and profit data from API
    const loadFinancialData = async () => {
      try {
        const response = await fetch('/api/transactions');
        if (response.ok) {
          const data = await response.json();
          setTotalInvestment(data.totals.totalInvestment);
          setTotalProfit(data.totals.totalProfit);
        }
      } catch (error) {
        console.error('Error loading financial data:', error);
      }
    };

    loadFinancialData();
  }, [router, categoryName]);

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userNIC");
    router.push("/");
  };

  const handleAddCrop = () => {
    if (!newCropName.trim() || !newCropVariety.trim()) return;

    const newCrop: CropData = {
      id: Date.now().toString(),
      name: newCropName,
      variety: newCropVariety,
      plantingDate: new Date().toISOString().split('T')[0],
      expectedHarvest: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 60 days from now
      status: "growing",
      notes: ""
    };

    const updatedCrops = [...crops, newCrop];
    setCrops(updatedCrops);
    localStorage.setItem(`crops_${categoryName}`, JSON.stringify(updatedCrops));

    // Reset form
    setNewCropName("");
    setNewCropVariety("");
  };

  const handleDeleteCrop = (cropId: string) => {
    const updatedCrops = crops.filter(crop => crop.id !== cropId);
    setCrops(updatedCrops);
    localStorage.setItem(`crops_${categoryName}`, JSON.stringify(updatedCrops));
  };

  const handleUpdateCropStatus = (cropId: string, newStatus: "growing" | "harvested" | "failed") => {
    const updatedCrops = crops.map(crop =>
      crop.id === cropId ? { ...crop, status: newStatus } : crop
    );
    setCrops(updatedCrops);
    localStorage.setItem(`crops_${categoryName}`, JSON.stringify(updatedCrops));
  };

  return (
    <div className={`min-h-screen ${categoryInfo.bgColor}`}>
      {/* Header */}
      <header className="bg-white shadow-lg border-b-2 border-green-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-4">
              <Link href="/dashboard/category" className="text-3xl hover:text-green-600 transition-colors">
                ←
              </Link>
              <div className="text-3xl">{categoryInfo.icon}</div>
              <div>
                <h1 className="text-3xl font-bold text-green-800">{categoryInfo.title} Management</h1>
                <p className="text-sm text-gray-600">Manage your {categoryInfo.title.toLowerCase()} crops</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-green-100 px-4 py-2 rounded-full">
                <span className="text-sm font-medium text-green-800">NIC: {userNIC}</span>
              </div>

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
        {/* Category Info */}
        <div className="mb-8 bg-white rounded-2xl shadow-xl p-8 relative overflow-hidden">
          <div className="absolute top-4 right-4 w-16 h-16 bg-green-100 rounded-full opacity-50"></div>
          <div className="absolute bottom-4 left-4 w-12 h-12 bg-yellow-100 rounded-full opacity-50"></div>

          <div className="relative z-10">
            <div className="flex items-center space-x-4 mb-4">
              <span className="text-5xl">{categoryInfo.icon}</span>
              <div>
                <h2 className="text-3xl font-bold text-green-800">{categoryInfo.title}</h2>
                <p className="text-lg text-gray-600">{categoryInfo.description}</p>
              </div>
            </div>

            <div className="bg-blue-50 p-6 rounded-xl">
              <h3 className="text-xl font-semibold text-blue-800 mb-3">🌱 Growing Tips</h3>
              <ul className="space-y-2">
                {categoryInfo.tips.map((tip, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <span className="text-green-600 mt-1">•</span>
                    <span className="text-gray-700">{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Add New Crop */}
        <div className="mb-8 bg-white rounded-2xl shadow-xl p-8">
          <h3 className="text-2xl font-bold text-green-800 mb-6 flex items-center">
            <span className="mr-3">➕</span>
            Add New {categoryInfo.title} Crop
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Crop Name</label>
              <input
                type="text"
                value={newCropName}
                onChange={(e) => setNewCropName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder={`Enter ${categoryInfo.title.toLowerCase()} variety name`}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Variety</label>
              <input
                type="text"
                value={newCropVariety}
                onChange={(e) => setNewCropVariety(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="e.g., Cherry, Beefsteak, Roma"
              />
            </div>
            <div className="flex items-end">
              <button
                onClick={handleAddCrop}
                disabled={!newCropName.trim() || !newCropVariety.trim()}
                className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-bold py-3 px-6 rounded-xl transition duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                <span>➕</span>
                <span>Add Crop</span>
              </button>
            </div>
          </div>
        </div>

        {/* Crops List */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h3 className="text-2xl font-bold text-green-800 mb-6 flex items-center">
            <span className="mr-3">🌾</span>
            Your {categoryInfo.title} Crops ({crops.length})
          </h3>

          {crops.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">{categoryInfo.icon}</div>
              <h4 className="text-xl font-semibold text-gray-600 mb-2">No crops added yet</h4>
              <p className="text-gray-500">Add your first crop above to get started!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {crops.map((crop) => (
                <div key={crop.id} className="border-2 border-green-200 rounded-xl p-6 bg-green-50 relative group hover:shadow-lg transition-all duration-300">
                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100">
                    <button
                      onClick={() => handleDeleteCrop(crop.id)}
                      className="bg-red-500 hover:bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center transition-all duration-300"
                      title="Delete crop"
                    >
                      ×
                    </button>
                  </div>

                  <div className="mb-4">
                    <h4 className="text-xl font-bold text-green-800 mb-2">{crop.name}</h4>
                    <p className="text-sm text-gray-600 mb-2">Variety: {crop.variety}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <span>Planted: {crop.plantingDate}</span>
                      <span>Expected: {crop.expectedHarvest}</span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <select
                      value={crop.status}
                      onChange={(e) => handleUpdateCropStatus(crop.id, e.target.value as "growing" | "harvested" | "failed")}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    >
                      <option value="growing">🌱 Growing</option>
                      <option value="harvested">✅ Harvested</option>
                      <option value="failed">❌ Failed</option>
                    </select>
                  </div>

                  <div className="text-sm text-gray-500">
                    Status: <span className={`font-medium ${
                      crop.status === 'growing' ? 'text-green-600' :
                      crop.status === 'harvested' ? 'text-blue-600' :
                      'text-red-600'
                    }`}>
                      {crop.status === 'growing' ? 'In Progress' :
                       crop.status === 'harvested' ? 'Completed' :
                       'Failed'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default function CategoryDetail() {
  return (
    <LanguageProvider>
      <CategoryDetailContent />
    </LanguageProvider>
  );
}
