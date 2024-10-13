import { experimental_extendTheme as extendTheme } from "@mui/material/styles";

// extendTheme is a new API
const theme = extendTheme({
  colorSchemes: {
    light: {
      // palette for light mode
      palette: {
        customText: {
          main: "#000000", //black
        },
      },
    },
    dark: {
      // palette for dark mode
      palette: {
        customText: {
          main: "#ffffff", //white
        },
      },
    },
  },
  components: {
    // Name of the component
    MuiButton: {
      styleOverrides: {
        root: ({ theme }) => {
          return {
            textTransform: "none",
            color: theme.palette.customText.main,
          };
        },
      },
    },
    MuiFormControl: {
      styleOverrides: {
        root: ({ theme }) => ({
          margin: "0 !important",
          width: "100%",
        }),
      },
    },
  },
});

export default theme;
