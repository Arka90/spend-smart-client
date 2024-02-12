import { Tilt } from "react-tilt";
import { Box, Typography } from "@mui/material";

const StatsCards = ({ color, title, value }) => {
  return (
    <Tilt>
      <Box
        sx={{
          display: "flex",
          height: "150px",
          width: "300px",
          backgroundColor: `${color}`,
          borderRadius: "16px",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
        }}
      >
        <Typography
          sx={{ fontWeight: "lighter", letterSpacing: "5px", color: "#fff" }}
          variant="p"
        >
          {title}
        </Typography>
        <Typography sx={{ fontWeight: "700", color: "#fff" }} variant="h3">
          ₹{value}
        </Typography>
      </Box>
    </Tilt>
  );
};

export default StatsCards;
