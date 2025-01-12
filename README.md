# Apple Finance App

This project is a financial data filtering application that fetches and displays annual income statements for Apple Inc. (AAPL) using data from the Financial Modeling Prep API.

## Instructions to Run the Project Locally

1. Clone the repository:
   ```
   git clone https://github.com/PavitraAritas/AppleFinance
   cd apple-finance
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the root directory and add your Financial Modeling Prep API key:
   ```
   VITE_API_KEY=your_api_key_here
   ```

4. Start the development server:
   ```
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:5173` (or the port specified by Vite).

## Features

- Fetches and displays annual income statement data for Apple Inc.
- Allows filtering by date range, revenue, and net income
- Provides sorting functionality for date, revenue, and net income
- Responsive design for both desktop and mobile devices

## Technologies Used

- React
- TypeScript
- Vite
- TailwindCSS

## Link to the App
https://apple-finance.vercel.app/
