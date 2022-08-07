import React from "react";
import logo from "./logo.svg";
import { Box, Grid, ThemeProvider, Typography } from "@mui/material";
import { Home } from "./pages/home";
import { theme } from "./providers/theme";

const logoSize = 75;

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Grid container direction={"row"} justifyContent={"center"}>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <Grid
            container
            direction={"row"}
            justifyContent={"center"}
            alignContent={"center"}
            alignItems={"center"}
          >
            <Box sx={{ maxHeight: 150, width: logoSize }}>
              <img src={logo} alt="logo" />
            </Box>
            <Typography variant={"h5"}>The Developer Toolbox</Typography>
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
