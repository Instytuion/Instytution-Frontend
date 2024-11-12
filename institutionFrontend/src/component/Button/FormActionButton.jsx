import React from "react";
import {Stack, Button, CircularProgress, Tooltip} from "@mui/material";
import {useTheme} from "@mui/material/styles";
import {useNavigate} from "react-router-dom";

const FormActionButtons = ({mode, hasChanges, loading}) => {
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <Stack justifyContent="flex-end" gap={1} direction="row" mt={2}>
      <Tooltip
        title={mode === "edit" && !hasChanges ? "No changes made" : ""}
        arrow
      >
        <span>
          <Button
            type="submit"
            sx={{
              color: "white",
              bgcolor:
                mode === "edit" && !hasChanges
                  ? "grey.200"
                  : theme.palette.customColors,
            }}
            disabled={mode === "edit" && !hasChanges}
          >
            {loading ? (
              <CircularProgress size={20} color="inherit" />
            ) : mode === "create" ? (
              "Create"
            ) : (
              "Update"
            )}
          </Button>
        </span>
      </Tooltip>
      <Button
        sx={{bgcolor: "red", color: "white"}}
        onClick={() => navigate(-1)}
        disabled={loading}
      >
        Cancel
      </Button>
    </Stack>
  );
};

export default FormActionButtons;
