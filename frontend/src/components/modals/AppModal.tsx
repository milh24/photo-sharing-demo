import { makeStyles, Theme } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import Stack from "@material-ui/core/Stack";
import Typography from "@material-ui/core/Typography";
import CloseRoundedIcon from "@material-ui/icons/CloseRounded";
import LoadingButton from "@material-ui/lab/LoadingButton";
import { createStyles } from "@material-ui/styles";
import { useBreakpoint, useSnackbar } from "hooks/general";
import { FC, ReactNode, useState } from "react";

const Modal: FC<{
  visible: boolean;
  onClose: () => void;
  title: string;
  actionLabel?: string;
  actionDisabled?: boolean;
  onAction?: () => Promise<void>;
  message?: string;
  buttonExtra?: ReactNode;
  fullScreen?: boolean;
  hideClose?: boolean;
}> = (props) => {
  const {
    visible,
    onClose,
    title,
    children,
    actionLabel = "",
    actionDisabled = true,
    onAction,
    message,
    buttonExtra,
    fullScreen = true,
    hideClose,
  } = props;
  const [loading, setLoading] = useState(false);
  const classes = useStyles();
  const { smDown } = useBreakpoint();
  const snackbar = useSnackbar();

  const onClick = async () => {
    try {
      setLoading(true);
      if (onAction) {
        await onAction();
      }
      onClose();
      if (message) {
        snackbar.showSuccess(message);
      }
    } catch (e) {
      snackbar.showError(e.code ?? e.toString());
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      open={visible}
      onClose={onClose}
      aria-labelledby={title}
      fullWidth
      maxWidth="sm"
      fullScreen={smDown && fullScreen}
    >
      <DialogTitle>
        {!hideClose && (
          <div className={classes.closeButton}>
            <IconButton onClick={onClose}>
              <CloseRoundedIcon />
            </IconButton>
          </div>
        )}
        <Typography className={classes.title}>{title}</Typography>
      </DialogTitle>
      <DialogContent>
        <Stack style={{ height: "100%" }} spacing={3}>
          {children}
        </Stack>
      </DialogContent>
      {onAction && (
        <DialogActions>
          <Stack
            style={{
              width: "100%",
              marginBottom: "env(safe-area-inset-bottom)",
            }}
            spacing={3}
          >
            <LoadingButton
              type="submit"
              fullWidth
              disabled={actionDisabled}
              onClick={onClick}
              variant="contained"
              color="primary"
              size="large"
              loading={loading}
            >
              {actionLabel}
            </LoadingButton>
            {buttonExtra}
          </Stack>
        </DialogActions>
      )}
    </Dialog>
  );
};

export default Modal;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      fontSize: 20,
      textAlign: "center",
    },
    closeButton: {
      position: "absolute",
      top: theme.spacing(2),
      right: theme.spacing(2),
    },
  })
);
