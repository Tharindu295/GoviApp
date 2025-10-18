"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { LanguageProvider, useLanguage } from "../../components/LanguageProvider";

interface Category {
  id: string;
  name: string;
  icon: string;
  description: string;
  color: string;
}

const predefinedCategories: Omit<Category, 'id'>[] = [
  {
    name: "Tomato",
    icon: "🍅",
    description: "Fresh tomatoes for cooking and salads",
    color: "bg-red-100 border-red-300 text-red-800"
  },
  {
    name: "Chili",
    icon: "🌶️",
    description: "Spicy chili peppers for cooking",
    color: "bg-orange-100 border-orange-300 text-orange-800"
  },
  {
    name: "Beans",
    icon: "🫘",
    description: "Nutritious beans for healthy meals",
    color: "bg-green-100 border-green-300 text-green-800"
  }
];

function CategoryContent() {
  const { t, language, setLanguage } = useLanguage();
  const [userNIC, setUserNIC] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newCategoryIcon, setNewCategoryIcon] = useState("🌱");
  const [newCategoryDescription, setNewCategoryDescription] = useState("");
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

    // Load selected categories from localStorage
    const savedCategories = localStorage.getItem("selectedCategories");
    if (savedCategories) {
      setSelectedCategories(JSON.parse(savedCategories));
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userNIC");
    router.push("/");
  };

  const handleAddCategory = () => {
    if (!newCategoryName.trim()) return;

    const newCategory: Category = {
      id: Date.now().toString(),
      name: newCategoryName,
      icon: newCategoryIcon,
      description: newCategoryDescription || `${newCategoryName} category`,
      color: "bg-blue-100 border-blue-300 text-blue-800"
    };

    const updatedCategories = [...selectedCategories, newCategory];
    setSelectedCategories(updatedCategories);
    localStorage.setItem("selectedCategories", JSON.stringify(updatedCategories));

    // Reset form
    setNewCategoryName("");
    setNewCategoryIcon("🌱");
    setNewCategoryDescription("");
  };

  const handleRemoveCategory = (categoryId: string) => {
    const updatedCategories = selectedCategories.filter(cat => cat.id !== categoryId);
    setSelectedCategories(updatedCategories);
    localStorage.setItem("selectedCategories", JSON.stringify(updatedCategories));
  };

  const handleSelectPredefinedCategory = (predefinedCat: Omit<Category, 'id'>) => {
    const newCategory: Category = {
      id: Date.now().toString(),
      name: predefinedCat.name,
      icon: predefinedCat.icon,
      description: predefinedCat.description,
      color: predefinedCat.color
    };

    const updatedCategories = [...selectedCategories, newCategory];
    setSelectedCategories(updatedCategories);
    localStorage.setItem("selectedCategories", JSON.stringify(updatedCategories));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-yellow-50 to-green-100">
      {/* Header */}
      <header className="bg-white shadow-lg border-b-2 border-green-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-4">
              <Link href="/dashboard" className="text-3xl hover:text-green-600 transition-colors">
                ←
              </Link>
              <div className="text-3xl">📂</div>
              <div>
                <h1 className="text-3xl font-bold text-green-800">Category Management</h1>
                <p className="text-sm text-gray-600">Manage your crop categories</p>
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
        {/* Add New Category Section */}
        <div className="mb-8 bg-white rounded-2xl shadow-xl p-8 relative overflow-hidden">
          <div className="absolute top-4 right-4 w-16 h-16 bg-green-100 rounded-full opacity-50"></div>
          <div className="absolute bottom-4 left-4 w-12 h-12 bg-yellow-100 rounded-full opacity-50"></div>

          <div className="relative z-10">
            <h2 className="text-3xl font-bold text-green-800 mb-2 flex items-center">
              <span className="mr-3">➕</span>
              Add New Category
            </h2>
            <p className="text-gray-600 mb-6">Create a new category for your crops</p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category Name</label>
                <input
                  type="text"
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Enter category name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Icon</label>
                <select
                  value={newCategoryIcon}
                  onChange={(e) => setNewCategoryIcon(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="🌱">🌱 Plants</option>
                  <option value="🌾">🌾 Crops</option>
                  <option value="🥕">🥕 Vegetables</option>
                  <option value="🌳">🌳 Trees</option>
                  <option value="🌸">🌸 Flowers</option>
                  <option value="🌿">🌿 Herbs</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Description (Optional)</label>
                <input
                  type="text"
                  value={newCategoryDescription}
                  onChange={(e) => setNewCategoryDescription(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Brief description of the category"
                />
              </div>
            </div>

            <button
              onClick={handleAddCategory}
              disabled={!newCategoryName.trim()}
              className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-bold py-3 px-8 rounded-xl transition duration-300 flex items-center space-x-2 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              <span>➕</span>
              <span>Add Category</span>
            </button>
          </div>
        </div>

        {/* Predefined Categories */}
        <div className="mb-8 bg-white rounded-2xl shadow-xl p-8">
          <h3 className="text-2xl font-bold text-green-800 mb-6 flex items-center">
            <span className="mr-3">🏷️</span>
            Quick Add Categories
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {predefinedCategories.map((category, index) => (
              <button
                key={index}
                onClick={() => handleSelectPredefinedCategory(category)}
                className={`${category.color} border-2 p-6 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 text-left`}
              >
                <div className="flex items-center space-x-3 mb-3">
                  <span className="text-3xl">{category.icon}</span>
                  <h4 className="text-xl font-bold">{category.name}</h4>
                </div>
                <p className="text-sm opacity-80">{category.description}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Selected Categories */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h3 className="text-2xl font-bold text-green-800 mb-6 flex items-center">
            <span className="mr-3">📋</span>
            Your Categories ({selectedCategories.length})
          </h3>

          {selectedCategories.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📂</div>
              <h4 className="text-xl font-semibold text-gray-600 mb-2">No categories selected</h4>
              <p className="text-gray-500">Add some categories above to get started!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {selectedCategories.map((category) => (
                <div
                  key={category.id}
                  className={`${category.color} border-2 rounded-xl p-6 relative group hover:shadow-lg transition-all duration-300`}
                >
                  <button
                    onClick={() => handleRemoveCategory(category.id)}
                    className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 bg-red-500 hover:bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center transition-all duration-300"
                    title="Remove category"
                  >
                    ×
                  </button>

                  <Link href={`/dashboard/category/${encodeURIComponent(category.name.toLowerCase())}`}>
                    <div className="cursor-pointer">
                      <div className="flex items-center space-x-3 mb-3">
                        <span className="text-3xl">{category.icon}</span>
                        <h4 className="text-xl font-bold">{category.name}</h4>
                      </div>
                      <p className="text-sm opacity-80 mb-3">{category.description}</p>
                      <div className="flex items-center text-sm font-medium">
                        <span>View Details</span>
                        <span className="ml-2">→</span>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default function Category() {
  return (
    <LanguageProvider>
      <CategoryContent />
    </LanguageProvider>
  );
}