import { Box, CircularProgress } from "@mui/material";
import { CheckCircleIcon, TrashIcon } from "@heroicons/react/24/solid";
import { green } from "@mui/material/colors";

import { useContext, useState } from "react";
import deleteIncome from "../lib/income/deleteIncome";
import { NetDataContext } from "../context/netDataContext/netDataContext";
import getAllExpenses from "../lib/expense/getAllExpenses";
import getAllIncome from "../lib/income/getAllIncome";
import deleteExpense from "../lib/expense/deleteExpense";

const DeleteAction = ({ params, type }) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const {
    setNetIncome,
    setNetExpense,
    setTotalNetExpense,
    setTotalNetIncome,
    setTotalNetSaving,
  } = useContext(NetDataContext);

  const handleSubmit = async () => {
    try {
      setLoading(true);

      if (type == "income") {
        await deleteIncome(params.id);
      } else {
        await deleteExpense(params.id);
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
    } catch (error) {
      setSuccess(false);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Box
      sx={{
        m: 1,
        mt: 1.5,
        position: "relative",
      }}
    >
      {success ? (
        <button className="p-1 ">
          <CheckCircleIcon className="w-7 h-7 text-emerald-500 hover:text-emerald-600" />
        </button>
      ) : (
        <button onClick={handleSubmit}>
          <TrashIcon
            className={`w-7 h-7 ${`text-slate-500 hover:text-slate-600`}`}
          />
        </button>
      )}
      {loading && (
        <CircularProgress
          size={45}
          sx={{
            color: green[400],
            position: "absolute",
            top: -8,
            left: -8,
            zIndex: 1,
          }}
        />
      )}
    </Box>
  );
};

export default DeleteAction;
