import { Button } from "@mui/material";
import { Box } from "@mui/system";
import { useContext, useState } from "react";
import createExpense from "../lib/expense/createExpense";
import createIncome from "../lib/income/createIncome";
import { NetDataContext } from "../context/netDataContext/netDataContext";
import getAllExpenses from "../lib/expense/getAllExpenses";
import getAllIncome from "../lib/income/getAllIncome";
import useApi from "../hooks/useApi";
import { toast } from "react-toastify";

const Form = ({ type }) => {
  const [amount, setAmont] = useState(0);
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");

  const api = useApi();

  const {
    setNetExpense,
    setNetIncome,
    setTotalNetExpense,
    setTotalNetIncome,
    setTotalNetSaving,
  } = useContext(NetDataContext);

  const incomeCategory = ["Salary", "Freelancing", "Passive Income", "Others"];

  const expenseCategory = [
    "Food",
    "Transportation",
    "Housing",
    "Health",
    "Others",
  ];

  async function handelSubmit() {
    api.startLoading();
    try {
      const payload = { category, date, amount: Number(amount) };

      if (type === "income") {
        await createIncome(payload);
      } else {
        await createExpense(payload);
      }

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

      setAmont(0);
      setDate("");
      setCategory("");

      toast("Data Added");
    } catch (error) {
      toast(error.response.data.message);
    } finally {
      api.stopLoading();
    }
  }

  return (
    <Box
      alignItems="center"
      display="flex"
      gap="20px"
      marginTop="25px"
      marginBottom="25px"
    >
      <Box display="flex" flexDirection="column">
        <label>Amount</label>
        <input
          type="text"
          value={amount}
          onChange={(e) => setAmont(e.target.value)}
          className="peer bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border  border-t-transparent focus:border-t-transparent text-sm px-3 py-1 rounded-[7px] border-blue-gray-200 focus:border-gray-900"
        />
      </Box>

      <Box display="flex" flexDirection="column">
        <label>Date</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </Box>

      <Box display="flex" flexDirection="column">
        <label>Category</label>
        <select
          name="cars"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          id="cars"
          className="p-2"
        >
          {type == "income" &&
            incomeCategory.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}

          {type == "expense" &&
            expenseCategory.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
        </select>
      </Box>

      <Button
        sx={{ alignSelf: "end" }}
        onClick={handelSubmit}
        variant="contained"
        disabled={api.isLoading}
      >
        Submit
      </Button>
    </Box>
  );
};

export default Form;
