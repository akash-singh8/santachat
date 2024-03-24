import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./assets/styles/index.css";
import { RecoilRoot } from "recoil";
import { BrowserRouter } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "./utils/theme.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <>
    <React.StrictMode>
      <BrowserRouter>
        <RecoilRoot>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <App />
          </ThemeProvider>
        </RecoilRoot>
      </BrowserRouter>
    </React.StrictMode>

    <Analytics />
  </>
);
