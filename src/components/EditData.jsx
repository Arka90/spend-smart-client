import { Box, CircularProgress } from "@mui/material";
import { CheckCircleIcon, PencilIcon } from "@heroicons/react/24/solid";
import { green } from "@mui/material/colors";
import { useState } from "react";

const EditAction = ({ handelShowForm, params }) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async () => {
    try {
      //   setLoading(true);
      //   await action(params.row._id);
      //   setSuccess(true);
      //   storeAction(params.row._id);
      //   setRowId("");
      //   setLoading(false);
      //   await sleep(5);
      //   setSuccess(false);
      console.log(params);
      handelShowForm(true);
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
          <PencilIcon
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

export default EditAction;
