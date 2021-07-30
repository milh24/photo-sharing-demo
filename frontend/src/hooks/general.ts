import { useMediaQuery, useTheme } from "@material-ui/core";
import { useSnackbar as useMuiSnackbar } from "material-ui-snackbar-provider";
import { useMemo } from "react";

export const useSnackbar = () => {
  const snackbar = useMuiSnackbar();
  return useMemo(() => {
    const showMessage =
      (type: string) =>
      (
        message: string,
        action?: string,
        handleAction?: () => void,
        customParameters?: any
      ) =>
        snackbar.showMessage(message, action, handleAction, {
          ...customParameters,
          type,
        });

    return {
      ...snackbar,
      showMessage: showMessage("info"),
      showInfo: showMessage("info"),
      showWarning: showMessage("warning"),
      showError: showMessage("error"),
      showSuccess: showMessage("success"),
    };
  }, [snackbar]);
};

export const useBreakpoint = () => {
  const theme = useTheme();
  const lgUp = useMediaQuery(theme.breakpoints.up("lg"));
  const lgDown = useMediaQuery(theme.breakpoints.down("lg"));
  const mdUp = useMediaQuery(theme.breakpoints.up("md"));
  const mdDown = useMediaQuery(theme.breakpoints.down("md"));
  const smUp = useMediaQuery(theme.breakpoints.up("sm"));
  const smDown = useMediaQuery(theme.breakpoints.down("sm"));

  return { lgUp, lgDown, mdUp, mdDown, smUp, smDown } as const;
};
