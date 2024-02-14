import * as React from "react";
import Box from "@mui/material/Box";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import {
  GridRowModes,
  DataGrid,
  GridActionsCellItem,
  GridRowEditStopReasons,
  GridToolbarContainer,
  GridToolbarExport,
} from "@mui/x-data-grid";

import { NetDataContext } from "../context/netDataContext/netDataContext";
import { toast } from "react-toastify";

import updateExpense from "../lib/expense/updateExpense";
import getAllExpenses from "../lib/expense/getAllExpenses";
import getAllIncome from "../lib/income/getAllIncome";
import deleteExpense from "../lib/expense/deleteExpense";

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}

export default function ExpenseTable({ data }) {
  const initialRows = data.map((curr) => {
    return {
      id: curr._id,
      ...curr,
    };
  });

  const {
    setNetExpense,
    setNetIncome,
    setTotalNetIncome,
    setTotalNetExpense,
    setTotalNetSaving,
  } = React.useContext(NetDataContext);
  const [rows, setRows] = React.useState(initialRows);

  const [rowModesModel, setRowModesModel] = React.useState({});

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id) => async () => {
    try {
      await deleteExpense(id);

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

      toast("Income Deleted Successfully");

      setRows(rows.filter((row) => row.id !== id));
    } catch (error) {
      console.log(error?.response?.data?.message);
    }
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  // here call the api
  const processRowUpdate = async (newRow) => {
    try {
      const updatedRow = { ...newRow, isNew: false };

      await updateExpense(
        {
          category: updatedRow.category,
          amount: updatedRow.amount,
          date: updatedRow.date,
        },
        updatedRow._id
      );

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

      setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
      toast("Income updated successfully !!");
      return updatedRow;
    } catch (error) {
      toast("Error updating Income !!");
    }
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    console.log(newRowModesModel);
    setRowModesModel(newRowModesModel);
  };

  const columns = [
    { field: "amount", headerName: "Amount", width: 180, editable: true },

    {
      field: "date",
      headerName: "Date",
      type: "date",
      width: 180,
      editable: true,
      valueGetter: (params) => new Date(params.value),
    },
    {
      field: "category",
      headerName: "Category",
      width: 220,
      editable: true,
      type: "singleSelect",
      valueOptions: ["Salary", "Freelancing", "Passive Income", "Others"],
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      cellClassName: "actions",
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              key="3"
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: "primary.main",
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              key="4"
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            key="1"
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            key="2"
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  return (
    <Box
      sx={{
        height: 500,
        width: "100%",
        "& .actions": {
          color: "text.secondary",
        },
        "& .textPrimary": {
          color: "text.primary",
        },
      }}
    >
      <DataGrid
        rows={initialRows}
        columns={columns}
        editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        slotProps={{
          toolbar: { setRows, setRowModesModel },
        }}
        slots={{ toolbar: CustomToolbar }}
        initialState={{
          ...data.initialState,
          pagination: { paginationModel: { pageSize: 5 } },
        }}
        pageSizeOptions={[5, 10, 25]}
      />
    </Box>
  );
}
