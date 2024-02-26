import { Button } from "@mui/material";
import { Box } from "@mui/system";
import { useNavigate } from "react-router-dom";
import CreateChannelForm from "./CreateChannelForm";

const CreateChannel = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        boxSizing: "border-box",
      }}
    >
      <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
        <Box sx={{ width: "300px", boxShadow: 1 }}>
          <CreateChannelForm />
        </Box>
        <Button
          color="error"
          variant="outlined"
          onClick={() => navigate("/chats")}
        >
          Cancel
        </Button>
      </Box>
    </Box>
  );
};

export default CreateChannel;
