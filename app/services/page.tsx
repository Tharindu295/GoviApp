import { Metadata } from 'next';
import ProfitCalculator from '.././components/ProfitCalculator';
import ProfitCalculatorForm from '../components/ProfitCalculatorForm';

export const metadata: Metadata = {
  title: 'Services - GoviApp',
  description: 'Explore our comprehensive agricultural management services including dashboard, crop management, and analytics.',
};

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-green-100 dark:from-green-950 dark:via-blue-950 dark:to-green-900">
      <div className="container mx-auto px-4 py-12">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-500 rounded-full mb-6">
            <span className="text-4xl">🚜</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Agricultural Services
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Comprehensive tools and services to optimize your agricultural operations,
            from crop management to yield analytics.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mb-4">
              <span className="text-white text-xl">📊</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Dashboard</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Centralized overview of your agricultural operations with real-time insights.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mb-4">
              <span className="text-white text-xl">🌾</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Crop Management</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Monitor and manage your crops with advanced tracking and analysis tools.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-yellow-500 rounded-lg flex items-center justify-center mb-4">
              <span className="text-white text-xl">📦</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Resource Tracking</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Efficiently track and manage agricultural resources and inventory.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center mb-4">
              <span className="text-white text-xl">📈</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Analytics</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Data-driven insights to optimize yields and improve decision making.
            </p>
          </div>
        </div>

        {/* Profit Calculator Section */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-center mb-8">Calculate Your Agricultural Profits</h2>
          <ProfitCalculator category="Services" />
        </div>

        {/* New Profit Calculator Form */}
        <div className="mt-8">
          <ProfitCalculatorForm />
        </div>
      </div>
    </div>
  );
}
