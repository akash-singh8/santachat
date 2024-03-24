import { createTheme } from "@mui/material/styles";

const primaryTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#f8f9fa",
    },
    primary: {
      main: "#b30738",
      "100": "#ffffff",
      "200": "#eeeeee", // for light background
      "500": "#cfcfcf", // for border
      "800": "#828282", // for texts
    },
  },
});

export default primaryTheme;
