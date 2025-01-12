import React, { useEffect, useState } from 'react';
import { Apple } from 'lucide-react';
import { DataTable } from './components/DataTable';
import { FilterPanel } from './components/FilterPanel';
import { fetchIncomeStatements } from './api';
import { IncomeStatement, FilterCriteria, SortConfig } from './types';

function App() {
  const [data, setData] = useState<IncomeStatement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [filters, setFilters] = useState<FilterCriteria>({
    startYear: 0,
    endYear: 0,
    minRevenue: 0,
    maxRevenue: 0,
    minNetIncome: 0,
    maxNetIncome: 0,
  });

  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: 'date',
    direction: 'desc',
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        const statements = await fetchIncomeStatements();
        setData(statements);
        setError(null);
      } catch (err) {
        setError('Failed to fetch financial data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const filteredData = data.filter((item) => {
    const year = new Date(item.date).getFullYear();
    
    if (filters.startYear && year < filters.startYear) return false;
    if (filters.endYear && year > filters.endYear) return false;
    if (filters.minRevenue && item.revenue < filters.minRevenue) return false;
    if (filters.maxRevenue && item.revenue > filters.maxRevenue) return false;
    if (filters.minNetIncome && item.netIncome < filters.minNetIncome) return false;
    if (filters.maxNetIncome && item.netIncome > filters.maxNetIncome) return false;
    
    return true;
  });

  const sortedData = [...filteredData].sort((a, b) => {
    const aValue = a[sortConfig.key];
    const bValue = b[sortConfig.key];
    
    if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
    return 0;
  });

  const handleSort = (key: SortConfig['key']) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc',
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Apple className="h-8 w-8 text-gray-900" />
            <h1 className="text-2xl font-bold text-gray-900">
              Apple Inc. Financial Data
            </h1>
          </div>
          <p className="text-gray-600">
            Annual income statements and key financial metrics
          </p>
        </div>

        {error ? (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8">
            <p className="text-red-800">{error}</p>
          </div>
        ) : null}

        <div className="space-y-6">
          <FilterPanel filters={filters} onFilterChange={setFilters} />
          
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading financial data...</p>
            </div>
          ) : (
            <DataTable 
              data={sortedData} 
              sortConfig={sortConfig} 
              onSort={handleSort} 
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;