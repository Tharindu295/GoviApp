"use client";

import React, { useState, useEffect } from 'react';

interface ProfitCalculatorProps {
  category: string;
}

const ProfitCalculator: React.FC<ProfitCalculatorProps> = ({ category }) => {
  const [investmentPrice, setInvestmentPrice] = useState<string>('');
  const [profit, setProfit] = useState<string>('');
  const [netProfit, setNetProfit] = useState<number | null>(null);

  useEffect(() => {
    const investment = parseFloat(investmentPrice) || 0;
    const profitValue = parseFloat(profit) || 0;
    const calculatedNetProfit = profitValue - investment;
    setNetProfit(calculatedNetProfit);
  }, [investmentPrice, profit]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically save the calculation or send it to an API
    console.log('Calculation saved:', {
      category,
      investmentPrice: parseFloat(investmentPrice),
      profit: parseFloat(profit),
      netProfit
    });
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(value);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="investment" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Investment Price ($)
            </label>
            <input
              type="number"
              id="investment"
              value={investmentPrice}
              onChange={(e) => setInvestmentPrice(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="Enter investment amount"
              step="0.01"
              min="0"
              required
            />
          </div>

          <div>
            <label htmlFor="profit" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Profit ($)
            </label>
            <input
              type="number"
              id="profit"
              value={profit}
              onChange={(e) => setProfit(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="Enter profit amount"
              step="0.01"
              min="0"
              required
            />
          </div>
        </div>

        {netProfit !== null && (
          <div className="bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-900/20 dark:to-green-900/20 rounded-lg p-6 border border-blue-200 dark:border-blue-800">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Net Profit Calculation
              </h3>
              <div className="text-3xl font-bold text-green-600 dark:text-green-400">
                {formatCurrency(netProfit)}
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                {netProfit >= 0 ? '🎉 Great investment!' : '📊 Investment needs optimization'}
              </p>
            </div>
          </div>
        )}

        <div className="text-center">
          <button
            type="submit"
            className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white font-semibold py-3 px-8 rounded-lg transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            💾 Save Calculation
          </button>
        </div>
      </form>

      <div className="mt-8 text-center">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Calculations are saved to your {category} dashboard for future reference.
        </p>
      </div>
    </div>
  );
};

export default ProfitCalculator;
