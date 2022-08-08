import React, { FunctionComponent } from "react";
import { Box, Divider, Grid, Typography } from "@mui/material";
import logo from "../../assets/logo.svg";
import { Hide } from "../Transitions/Hide";

const defaultLogoSize = 75;

export interface HeaderProps {
  readonly logoSize?: number;
}

export const Header: FunctionComponent<HeaderProps> = ({ logoSize }) => {
  return (
    <Box>
      <Grid
        sx={{ paddingTop: 2, paddingRight: 5 }}
        container
        direction={"row"}
        justifyContent={"center"}
        alignContent={"center"}
        alignItems={"center"}
      >
        <Box sx={{ maxHeight: 150, width: logoSize ?? defaultLogoSize }}>
          <img src={logo} alt="logo" />
        </Box>
        <Typography variant={"h5"}>The Developer Toolbox</Typography>
      </Grid>
      <Hide
        open={true}
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          padding: 5,
        }}
      >
        <Typography variant={"subtitle1"}>
          A simple query engine for data commonly encountered by software
          engineers.
        </Typography>
      </Hide>
      <Divider />
    </Box>
  );
};
