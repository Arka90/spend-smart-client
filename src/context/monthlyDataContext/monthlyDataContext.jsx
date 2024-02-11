import { createContext, useState } from "react";

export const MonthlyDataContext = createContext({
  setMonthlyExpense: () => null,
  setMonthlyIncome: () => null,
  setTotalMonthlyIncome: () => null,
  setTotalMonthlyExpense: () => null,
  setTotalMonthlySaving: () => null,
  monthlyExpense: [],
  monthlyIncome: [],
  totalMonthlyIncome: 0,
  totalMonthlyExpense: 0,
  totalMonthlySaving: 0,
});

export const MonthylDataProvider = ({ children }) => {
  const [monthlyExpense, setMonthlyExpense] = useState([]);
  const [monthlyIncome, setMonthlyIncome] = useState([]);
  const [totalMonthlyIncome, setTotalMonthlyIncome] = useState(0);
  const [totalMonthlyExpense, setTotalMonthlyExpense] = useState(0);
  const [totalMonthlySaving, setTotalMonthlySaving] = useState(0);

  const value = {
    monthlyExpense,
    monthlyIncome,
    totalMonthlyIncome,
    totalMonthlyExpense,
    totalMonthlySaving,
    setMonthlyIncome,
    setMonthlyExpense,
    setTotalMonthlyIncome,
    setTotalMonthlyExpense,
    setTotalMonthlySaving,
  };

  return (
    <MonthlyDataContext.Provider value={value}>
      {children}
    </MonthlyDataContext.Provider>
  );
};
