"use client";

import { useState } from "react";

const ProfitCalculatorForm = () => {
  const [investment, setInvestment] = useState<number | string>("");
  const [profit, setProfit] = useState<number | string>("");
  const [result, setResult] = useState<string>("");

  const calculateProfit = () => {
    const inv = parseFloat(investment as string);
    const prof = parseFloat(profit as string);

    if (isNaN(inv) || isNaN(prof) || inv <= 0) {
      setResult("Please enter valid investment and profit prices.");
      return;
    }

    const profitMargin = ((prof - inv) / inv) * 100;
    setResult(`Profit Margin: ${profitMargin.toFixed(2)}%`);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4">Profit Calculator</h3>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Investment Price</label>
        <input
          type="number"
          value={investment}
          onChange={(e) => setInvestment(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
          placeholder="Enter investment amount"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Profit Price</label>
        <input
          type="number"
          value={profit}
          onChange={(e) => setProfit(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
          placeholder="Enter profit amount"
        />
      </div>
      <button
        onClick={calculateProfit}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        Calculate Profit
      </button>
      {result && <p className="mt-4 text-center text-green-600">{result}</p>}
    </div>
  );
};

export default ProfitCalculatorForm;
