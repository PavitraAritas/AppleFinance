import { IncomeStatement } from './types';

const API_KEY = '2vw46lQbR8fCvr84mZnDcoXXgcFgsog9';
const BASE_URL = 'https://financialmodelingprep.com/api/v3';

export async function fetchIncomeStatements(): Promise<IncomeStatement[]> {
  try {
    const response = await fetch(
      `${BASE_URL}/income-statement/AAPL?period=annual&apikey=${API_KEY}`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }

    const data = await response.json();
    
    return data.map((item: any) => ({
      date: item.date,
      revenue: item.revenue,
      netIncome: item.netIncome,
      grossProfit: item.grossProfit,
      eps: item.eps,
      operatingIncome: item.operatingIncome
    }));
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}