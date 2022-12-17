import { Snackbar, Alert } from "@mui/material";

export const SuccessSnackbar = (props) => {
  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      autoHideDuration={2000}
      open={props.showSnack}
      onClose={() => props.setShowSnack(false)}
    >
      <Alert
        onClose={() => props.setShowSnack(false)}
        severity="success"
        sx={{ width: "100%" }}
      >
        {props.message}
      </Alert>
    </Snackbar>
  );
};
