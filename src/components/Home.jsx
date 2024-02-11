import { Box, Typography } from "@mui/material";
import StatsCards from "./StatsCards";
import MonthlyDataTable from "./MonthlyDataTable";
import { useContext, useEffect } from "react";
import { MonthlyDataContext } from "./../context/monthlyDataContext/monthlyDataContext";
import getMonthlyExpenses from "../lib/expense/getMonthlyExpenses";
import getMonthlyIncomes from "../lib/income/getMonthlyIncomes";
import useApi from "./../hooks/useApi";
import Loader from "./Loader";

const Home = () => {
  const date = new Date();

  const {
    setMonthlyExpense,
    setMonthlyIncome,
    setTotalMonthlyExpense,
    setTotalMonthlyIncome,
    setTotalMonthlySaving,
    monthlyExpense,
    monthlyIncome,
    totalMonthlyExpense,
    totalMonthlyIncome,
    totalMonthlySaving,
  } = useContext(MonthlyDataContext);

  const api = useApi();

  useEffect(() => {
    async function getData() {
      api.startLoading();
      try {
        const expenseResponse = await getMonthlyExpenses();
        const incomeResponse = await getMonthlyIncomes();

        setMonthlyExpense(expenseResponse.data.expenses);
        setMonthlyIncome(incomeResponse.data.income);
        setTotalMonthlyExpense(expenseResponse.data.totalMonthlyExpense);
        setTotalMonthlyIncome(incomeResponse.data.totalMonthlyIncome);
        setTotalMonthlySaving(
          incomeResponse.data.totalMonthlyIncome -
            expenseResponse.data.totalMonthlyExpense
        );

        api.setSuccess();
      } catch (error) {
        api.setError();
      } finally {
        api.stopLoading();
      }
    }

    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (api.isLoading) return <Loader />;

  return (
    <Box>
      <Box>
        <Typography variant="h3" sx={{ fontSize: { xs: "2rem", md: "3rem" } }}>
          Stats for the month of {date.toString().split(" ")[1]},{" "}
          {date.getFullYear()}
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          marginTop: "40px",
          gap: "28px",
          justifyContent: { xs: "space-around", md: "flex-start" },
        }}
      >
        <StatsCards color="#00796B" title="INCOME" value={totalMonthlyIncome} />
        <StatsCards
          color="#B71C1C"
          title="EXPENSE"
          value={totalMonthlyExpense}
        />
        <StatsCards color="#1565C0" title="SAVING" value={totalMonthlySaving} />
      </Box>
      <Box display="flex" flexWrap="wrap" gap="40px" marginTop="20px">
        <Box flex={1} padding="10px">
          <MonthlyDataTable title="Expense" data={monthlyExpense} />
        </Box>
        <Box flex={1} padding="10px">
          <MonthlyDataTable title="Income" data={monthlyIncome} />
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
