import { createTheme } from "@mui/material/styles";

const primaryTheme = createTheme({
  palette: {
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

const greenTheme = createTheme({
  palette: {
    background: {
      default: "#f8f9fa", // A dark, slightly cool gray-green
    },
    primary: {
      main: "#4CAF50", // Green color
      "100": "#ffffff",
      "200": "#e8f5e9", // for light background
      "500": "#81C784", // for border
      "800": "#81C784", // for border
    },
  },
});

const blueTheme = createTheme({
  palette: {
    background: {
      default: "#d7efff",
    },
    primary: {
      main: "#2c56c3", // A deep, rich dark blue
      "100": "#E3F2FD", // Very light blue for subtle highlights
      "200": "#BBDEFB", // Soft blue for light backgrounds
      "500": "#64B5F6", // Slightly brighter for borders
      "800": "#0000a7", // Very dark blue, almost black, for text
    },
  },
});

const yellowTheme = createTheme({
  palette: {
    background: {
      default: "#f8f9fa", // Dark charcoal for contrast
    },
    primary: {
      main: "#f5c943", // Sunny yellow
      "100": "#ffffff",
      "200": "#e9ff62", // Light yellow for light backgrounds
      "500": "#fff400", // Muted yellow for borders
      "800": "#ffc107", // Dark yellow for text
    },
  },
});

const brownTheme = createTheme({
  palette: {
    background: {
      default: "#f8f9fa", // Dark charcoal for contrast
    },
    primary: {
      main: "#b3886b", // Warm light brown
      "100": "#f2e8df", // Very light beige for highlights
      "200": "#e0d0c2", // Light beige for backgrounds
      "500": "#c2a086", // Muted brown for borders
      "800": "#775a4a", // Dark brown for text
    },
  },
});

const greyTheme = createTheme({
  palette: {
    background: {
      default: "#f8f9fa", // Dark charcoal for contrast
    },
    primary: {
      main: "#9E9E9E", // Grey color
      "100": "#ffffff",
      "200": "#EEEEEE", // for light background
      "500": "#757575", // for border
      "800": "#424242", // for texts
    },
  },
});

const blackTheme = createTheme({
  palette: {
    background: {
      default: "#333333", // Dark charcoal for contrast
    },
    primary: {
      main: "#757575", // Pure black
      "100": "#fff", // Dark grey for some contrast
      "200": "#EEEEEE", // Even darker grey for some hierarchy
      "500": "#9E9E9E", // Very dark grey for borders (almost invisible)
      "800": "#757575", // Almost black for text (may not be accessible)
    },
  },
});

export default [
  primaryTheme,
  greenTheme,
  yellowTheme,
  blueTheme,
  blackTheme,
  brownTheme,
  greyTheme,
];
