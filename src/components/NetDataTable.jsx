import { Box, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

import EditAction from "./EditData";
import DeleteAction from "./DeleteData";
import moment from "moment";

const NetDataTable = ({ data, type }) => {
  const columns = [
    { field: "id", headerName: "ID", width: 130 },

    { field: "category", headerName: "Category", width: 200 },
    { field: "date", headerName: "Date", width: 200 },
    { field: "amount", headerName: "Amount(INR)", width: 200 },

    {
      field: "edit",
      headerName: "Edit",
      width: 100,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      renderCell: (params) => {
        return <EditAction params={params} type={type} />;
      },
    },
    {
      field: "delete",
      headerName: "Delete",
      width: 100,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      renderCell: (params) => {
        return <DeleteAction params={params} type={type} />;
      },
    },
  ];

  const rows = data.map((curr) => {
    return {
      id: curr._id,
      date: moment(curr.date).format("DD/MM/YYYY"),
      category: curr.category,
      amount: `${curr.amount}`,
    };
  });

  return (
    <Box style={{ height: 400, width: "100%" }}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h4" fontWeight="700" marginBottom="10px">
          Table for {type}
        </Typography>
      </Box>

      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        disableRowSelectionOnClick
      />
    </Box>
  );
};

export default NetDataTable;
