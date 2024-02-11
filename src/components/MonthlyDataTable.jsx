import { Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import moment from "moment";

const columns = [
  { field: "id", headerName: "ID", width: 130 },

  { field: "category", headerName: "Category", width: 130 },
  { field: "date", headerName: "Date", width: 130 },
  { field: "amount", headerName: "Amount(INR)", width: 130 },
];

export default function MonthlyDataTable({ title, data }) {
  const rows = data.map((curr) => {
    return {
      id: curr._id,
      date: moment(curr.date).format("DD/MM/YYYY"),
      category: curr.category,
      amount: `${curr.amount}`,
    };
  });

  return (
    <div style={{ height: 400, width: "100%" }}>
      <Typography variant="h4" fontWeight="700" marginBottom="10px">
        Table for {title}
      </Typography>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
      />
    </div>
  );
}
