import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import { Box } from "@mui/material";

export default function YearMonthPicker({ value, setValue }) {
  const handelChange = (newValue) => {
    setValue(newValue);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box display="inline">
        <DatePicker
          label={'"month" and "year"'}
          views={["month", "year"]}
          value={value}
          onChange={(newValue) => handelChange(newValue)}
        />
      </Box>
    </LocalizationProvider>
  );
}
