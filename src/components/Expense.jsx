import { Box, Typography } from "@mui/material";
import StatsCards from "./StatsCards";
import PieChart from "./PieChart";
import { useContext, useEffect } from "react";
import { NetDataContext } from "../context/netDataContext/netDataContext";
import useApi from "../hooks/useApi";
import getAllExpenses from "../lib/expense/getAllExpenses";
import getAllIncome from "../lib/income/getAllIncome";
import Form from "./Form";
import ExpenseTable from "./ExpenseTable";
import Loader from "./Loader";

const Expense = () => {
  const {
    setNetIncome,
    setNetExpense,
    setTotalNetExpense,
    setTotalNetIncome,
    setTotalNetSaving,
    totalNetIncome,
    totalNetExpense,
    totalNetSaving,
    netExpense,
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
        <Typography
          variant="h3"
          sx={{ fontSize: { xs: "1.5rem", md: "3rem", sm: "2rem" } }}
        >
          Expense Management
        </Typography>
      </Box>

      {api.isLoading ? (
        <Loader />
      ) : (
        <>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              marginTop: "40px",
              gap: "28px",
              justifyContent: {
                xs: "flex-start",
                sm: "center",
                md: "flex-start",
              },
              maxWidth: { xs: "500px", sm: "590px", md: "890px", lg: "100%" },
            }}
          >
            <StatsCards
              color="#00796B"
              title="NET INCOME"
              value={totalNetIncome}
            />
            <StatsCards
              color="#B71C1C"
              title="NET EXPENSE"
              value={totalNetExpense}
            />
            <StatsCards
              color="#1565C0"
              title="NET SAVING"
              value={totalNetSaving}
            />
          </Box>

          <Box display="flex" flexWrap="wrap" gap="40px" marginTop="20px">
            <Box flex={2} padding="10px">
              <Typography
                variant="h3"
                fontWeight={700}
                sx={{ fontSize: { xs: "2rem", md: "3rem" } }}
              >
                Table For Expense
              </Typography>
              <Form type="expense" />
              <ExpenseTable data={netExpense} />
            </Box>
            <Box
              flex={1}
              display="flex"
              alignItems="center"
              justifyContent="flex-start"
            >
              <PieChart chartData={netExpense} />
            </Box>
          </Box>
        </>
      )}
    </Box>
  );
};

export default Expense;
