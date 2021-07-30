import { createTheme, ThemeOptions } from "@material-ui/core";
import { cloneDeep, merge } from "lodash";

const common = {
  spacing: [0, 4, 8, 16, 24, 32, 40, 48, 56, 64, 72],
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiAppBar: {
      defaultProps: {
        elevation: 0,
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: 16,
          backgroundImage: "unset",
        },
        paperFullScreen: {
          borderRadius: 0,
        },
      },
    },
    MuiDialogContent: {
      styleOverrides: {
        root: {
          padding: 16,
        },
      },
    },
    MuiDialogActions: {
      styleOverrides: {
        root: {
          padding: 16,
        },
      },
    },
    MuiContainer: {
      defaultProps: {
        maxWidth: "sm",
      },
    },
  },
} as ThemeOptions;

export const lightTheme = createTheme(
  merge(cloneDeep(common), {
    palette: {
      mode: "light",
      divider: "#F2F2F7",
      primary: {
        main: "#000000",
        contrastText: "#FFFFFF",
      },
      secondary: {
        main: "#03DAC6",
        contrastText: "#000000",
      },
    },
  })
);
