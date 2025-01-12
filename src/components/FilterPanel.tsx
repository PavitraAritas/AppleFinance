import React from 'react';
import { FilterCriteria } from '../types';

interface FilterPanelProps {
  filters: FilterCriteria;
  onFilterChange: (filters: FilterCriteria) => void;
}

export function FilterPanel({ filters, onFilterChange }: FilterPanelProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let newValue = value === '' ? 0 : Number(value);
    
    // Convert revenue and net income values from billions to actual values
    if (['minRevenue', 'maxRevenue', 'minNetIncome', 'maxNetIncome'].includes(name)) {
      newValue = newValue * 1000000000; // Convert billions to actual value
    }
    
    onFilterChange({
      ...filters,
      [name]: newValue,
    });
  };

  const displayBillions = (value: number) => {
    return value ? (value / 1000000000).toString() : '';
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 space-y-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Filters</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-sm font-medium text-gray-700">Date Range</h3>
          <div className="flex gap-4">
            <div>
              <label className="block text-sm text-gray-600">Start Year</label>
              <input
                type="number"
                name="startYear"
                value={filters.startYear || ''}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                placeholder="Start Year"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600">End Year</label>
              <input
                type="number"
                name="endYear"
                value={filters.endYear || ''}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                placeholder="End Year"
              />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-medium text-gray-700">Revenue Range (in Billions USD)</h3>
          <div className="flex gap-4">
            <div>
              <label className="block text-sm text-gray-600">Min Revenue</label>
              <input
                type="number"
                name="minRevenue"
                value={displayBillions(filters.minRevenue)}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                placeholder="Min Revenue"
                step="0.1"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600">Max Revenue</label>
              <input
                type="number"
                name="maxRevenue"
                value={displayBillions(filters.maxRevenue)}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                placeholder="Max Revenue"
                step="0.1"
              />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-medium text-gray-700">Net Income Range (in Billions USD)</h3>
          <div className="flex gap-4">
            <div>
              <label className="block text-sm text-gray-600">Min Net Income</label>
              <input
                type="number"
                name="minNetIncome"
                value={displayBillions(filters.minNetIncome)}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                placeholder="Min Net Income"
                step="0.1"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600">Max Net Income</label>
              <input
                type="number"
                name="maxNetIncome"
                value={displayBillions(filters.maxNetIncome)}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                placeholder="Max Net Income"
                step="0.1"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
