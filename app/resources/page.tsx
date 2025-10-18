import { Metadata } from 'next';
import ProfitCalculator from '.././components/ProfitCalculator';
import ProfitCalculatorForm from '../components/ProfitCalculatorForm';

export const metadata: Metadata = {
  title: 'Resources - GoviApp',
  description: 'Access comprehensive agricultural resources including tutorials, best practices, and community support.',
};

export default function ResourcesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-red-100 dark:from-orange-950 dark:via-yellow-950 dark:to-red-900">
      <div className="container mx-auto px-4 py-12">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-orange-500 rounded-full mb-6">
            <span className="text-4xl">📚</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Agricultural Resources
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Empower your farming knowledge with our extensive collection of tutorials,
            best practices, and community resources.
          </p>
        </div>

        {/* Resources Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mb-4">
              <span className="text-white text-xl">❓</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Help Center</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Get answers to common questions and find solutions to agricultural challenges.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mb-4">
              <span className="text-white text-xl">🎓</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Tutorials</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Step-by-step guides to master agricultural techniques and technologies.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-yellow-500 rounded-lg flex items-center justify-center mb-4">
              <span className="text-white text-xl">⭐</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Best Practices</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Proven methods and techniques for successful agricultural operations.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center mb-4">
              <span className="text-white text-xl">👥</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Community</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Connect with fellow farmers and agricultural professionals worldwide.
            </p>
          </div>
        </div>

        {/* Profit Calculator Section */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-center mb-8">Calculate Your Learning Investment</h2>
          <ProfitCalculator category="Resources" />
        </div>

        {/* New Profit Calculator Form */}
        <div className="mt-8">
          <ProfitCalculatorForm />
        </div>
      </div>
    </div>
  );
}
