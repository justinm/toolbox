import { createTheme, Theme } from "@mui/material";
import { grey } from "@mui/material/colors";

declare module "@mui/material/styles/createPalette" {
  export interface TypeBackground {
    readonly tableHeader: string;
  }
}

export const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
      contrastText: "white",
    },
    background: {
      tableHeader: grey[400],
    },
  },
});
