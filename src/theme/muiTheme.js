import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#e7ff8c",
      main: "#b2ff59",
      dark: "#7ecb20",
    },
    secondary: {
      light: "#484848",
      main: "#212121",
      dark: "#000000",
    },
  },
  overrides: {
    MuiOutlinedInput: {
      root: {
        "& $notchedOutline": {
          borderColor: "#FFF",
        },
        "&:hover:not($disabled):not($focused):not($error) $notchedOutline": {
          borderColor: "#b2ff59",
          borderWidth: "2px",
        },
      },
      input: {
        color: "#FFF",
      },
    },
    MuiFormLabel: {
      root: {
        color: "#FFF",
      },
    },
  },
});

export default theme;
