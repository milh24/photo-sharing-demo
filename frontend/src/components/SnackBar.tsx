import Alert from "@material-ui/core/Alert";
import MuiSnackbar, { SnackbarProps } from "@material-ui/core/Snackbar";

const Snackbar = (props: {
  message?: string;
  SnackbarProps?: Partial<SnackbarProps>;
  customParameters?: any;
}) => {
  const {
    message = "",
    SnackbarProps,
    customParameters,
  } = props;

  return (
    <MuiSnackbar autoHideDuration={3000} {...SnackbarProps}>
      <Alert severity={customParameters?.type}>{message}</Alert>
    </MuiSnackbar>
  );
};

export default Snackbar;
