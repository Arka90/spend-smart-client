import { Box, Button, Typography } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import StatsCards from "./StatsCards";
import MonthlyDataTable from "./MonthlyDataTable";
import { useContext, useEffect, useState } from "react";
import { MonthlyDataContext } from "./../context/monthlyDataContext/monthlyDataContext";
import getMonthlyExpenses from "../lib/expense/getMonthlyExpenses";
import getMonthlyIncomes from "../lib/income/getMonthlyIncomes";
import useApi from "./../hooks/useApi";
import Loader from "./Loader";
import YearMonthPicker from "./YearMonthPicker";

const Home = () => {
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [value, setValue] = useState("");
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
        const expenseResponse = await getMonthlyExpenses(
          date.getMonth() + 1,
          date.getFullYear()
        );
        const incomeResponse = await getMonthlyIncomes(
          date.getMonth() + 1,
          date.getFullYear()
        );

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
  }, [date]);

  function handelChangeDate() {
    if (!value) {
      setDate(new Date());
    } else {
      setDate(value.$d);
    }

    setShowPicker(false);
  }

  return (
    <Box>
      <Box>
        <Typography
          variant="h3"
          sx={{ fontSize: { xs: "1.5rem", md: "3rem", sm: "2rem" } }}
        >
          Stats for the month of{" "}
          {showPicker ? (
            <Box display="inline">
              <YearMonthPicker value={value} setValue={setValue} />
              <Button
                sx={{ marginLeft: "15px" }}
                onClick={handelChangeDate}
                variant="contained"
              >
                Set Date
              </Button>
            </Box>
          ) : (
            <Box
              display="inline"
              color="primary.main"
              className="cursor-pointer"
              onClick={() => setShowPicker(true)}
            >
              {date.toString().split(" ")[1]} {date.getFullYear()}{" "}
              <KeyboardArrowDownIcon />
            </Box>
          )}
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
            }}
          >
            <StatsCards
              color="#00796B"
              title="MONTHLY INCOME"
              value={totalMonthlyIncome}
            />
            <StatsCards
              color="#B71C1C"
              title="MONTHLY EXPENSE"
              value={totalMonthlyExpense}
            />
            <StatsCards
              color="#1565C0"
              title="MONTHLY SAVING"
              value={totalMonthlySaving}
            />
          </Box>
          <Box display="flex" flexWrap="wrap" gap="40px" marginTop="20px">
            <Box flex={1} padding="10px">
              <MonthlyDataTable title="Expense" data={monthlyExpense} />
            </Box>
            <Box flex={1} padding="10px">
              <MonthlyDataTable title="Income" data={monthlyIncome} />
            </Box>
          </Box>
        </>
      )}
    </Box>
  );
};

export default Home;
