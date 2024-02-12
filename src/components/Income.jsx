import { Box, Typography } from "@mui/material";
import StatsCards from "./StatsCards";
import NetDataTable from "./NetDataTable";
import PieChart from "./PieChart";
import { useContext, useEffect } from "react";
import { NetDataContext } from "../context/netDataContext/netDataContext";
import useApi from "../hooks/useApi";
import getAllExpenses from "../lib/expense/getAllExpenses";
import getAllIncome from "../lib/income/getAllIncome";
import Form from "./Form";

const Income = () => {
  const {
    setNetIncome,
    setNetExpense,
    setTotalNetExpense,
    setTotalNetIncome,
    setTotalNetSaving,
    totalNetIncome,
    totalNetExpense,
    totalNetSaving,
    netIncome,
  } = useContext(NetDataContext);

  const api = useApi();

  useEffect(() => {
    async function getData() {
      api.startLoading();
      try {
        const expenseResponse = await getAllExpenses();
        const incomeResponse = await getAllIncome();

        setNetExpense(expenseResponse.data.expenses);
        setNetIncome(incomeResponse.data.income);
        setTotalNetExpense(expenseResponse.data.totalExpenseAmount);
        setTotalNetIncome(incomeResponse.data.totalIncomeAmount);
        setTotalNetSaving(
          incomeResponse.data.totalIncomeAmount -
            expenseResponse.data.totalExpenseAmount
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

  return (
    <Box>
      <Box>
        <Typography variant="h3" sx={{ fontSize: { xs: "2rem", md: "3rem" } }}>
          Income Management
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
        <StatsCards color="#00796B" title="NET INCOME" value={totalNetIncome} />
        <StatsCards
          color="#B71C1C"
          title="NET EXPENSE"
          value={totalNetExpense}
        />
        <StatsCards color="#1565C0" title="NET SAVING" value={totalNetSaving} />
      </Box>

      <Box display="flex" flexWrap="wrap" gap="40px" marginTop="20px">
        <Box flex={2} padding="10px">
          <Form type="income" />

          <NetDataTable data={netIncome} type="income" />
        </Box>
        <Box
          flex={1}
          display="flex"
          alignItems="center"
          justifyContent="flex-start"
        >
          <PieChart chartData={netIncome} />
        </Box>
      </Box>
    </Box>
  );
};

export default Income;
