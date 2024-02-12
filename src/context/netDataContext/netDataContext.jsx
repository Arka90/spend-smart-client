import { createContext, useState } from "react";

export const NetDataContext = createContext({
  setNetExpense: () => null,
  setNetIncome: () => null,
  setTotalNetIncome: () => null,
  setTotalNetExpense: () => null,
  setTotalNetSaving: () => null,
  netExpense: [],
  netIncome: [],
  totalNetIncome: 0,
  totalNetExpense: 0,
  totalNetSaving: 0,
});

export const NetDataProvider = ({ children }) => {
  const [netExpense, setNetExpense] = useState([]);
  const [netIncome, setNetIncome] = useState([]);
  const [totalNetIncome, setTotalNetIncome] = useState(0);
  const [totalNetExpense, setTotalNetExpense] = useState(0);
  const [totalNetSaving, setTotalNetSaving] = useState(0);

  const value = {
    netExpense,
    netIncome,
    totalNetIncome,
    totalNetExpense,
    totalNetSaving,
    setNetIncome,
    setNetExpense,
    setTotalNetIncome,
    setTotalNetExpense,
    setTotalNetSaving,
  };

  return (
    <NetDataContext.Provider value={value}>{children}</NetDataContext.Provider>
  );
};
