import { createTheme } from "@mui/material";
import { grey } from "@mui/material/colors";

declare module "@mui/material/styles/createPalette" {
  export interface TypeBackground {
    readonly tableHeader: string;
  }

  export interface PaletteOptions {
    readonly borders: {
      readonly hero: string;
    };
  }
}

export const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
      contrastText: "white",
    },
    borders: {
      hero: grey[400],
    },
    background: {
      tableHeader: grey[400],
    },
  },
});
