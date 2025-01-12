import React from 'react';
import { ArrowUpDown } from 'lucide-react';
import { IncomeStatement, SortConfig } from '../types';

interface DataTableProps {
  data: IncomeStatement[];
  sortConfig: SortConfig;
  onSort: (key: SortConfig['key']) => void;
}

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format(value);
};

export function DataTable({ data, sortConfig, onSort }: DataTableProps) {
  const renderSortableHeader = (label: string, key: SortConfig['key']) => {
    const isActive = sortConfig.key === key;
    return (
      <th 
        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer group"
        onClick={() => onSort(key)}
      >
        <div className="flex items-center space-x-1">
          <span>{label}</span>
          <ArrowUpDown 
            className={`h-4 w-4 transition-opacity ${
              isActive 
                ? 'opacity-100' 
                : 'opacity-50 group-hover:opacity-100'
            } ${
              isActive && sortConfig.direction === 'asc' 
                ? 'transform rotate-180' 
                : ''
            }`}
          />
        </div>
      </th>
    );
  };

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {renderSortableHeader('Date', 'date')}
            {renderSortableHeader('Revenue', 'revenue')}
            {renderSortableHeader('Net Income', 'netIncome')}
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Gross Profit
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              EPS
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Operating Income
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((item) => (
            <tr key={item.date} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {new Date(item.date).getFullYear()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {formatCurrency(item.revenue)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {formatCurrency(item.netIncome)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {formatCurrency(item.grossProfit)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {item.eps.toFixed(2)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {formatCurrency(item.operatingIncome)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}