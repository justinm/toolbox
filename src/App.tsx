import React from "react";
import { Grid, ThemeProvider } from "@mui/material";
import { Home } from "./pages/Home/Home";
import { theme } from "./providers/theme";
import { Header } from "./components/Header/Header";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Grid container direction={"row"} justifyContent={"center"}>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <Grid>
            <Header />
          </Grid>
        </Grid>
        <Grid item xs={12} sm={11} md={8} lg={8} xl={8}>
          <Home />
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default App;
