import { FunctionComponent, ReactNode } from "react";
import { Box } from "@mui/material";
import { SxProps } from "@mui/system";
import { Theme } from "@mui/material/styles";

export interface HideProps {
  readonly open: boolean;
  readonly children: ReactNode;
  readonly sx?: SxProps<Theme>;
}

export const Hide: FunctionComponent<HideProps> = ({ children, open, sx }) => {
  return (
    <Box
      sx={{
        display: open ? "flex" : "hidden",
        transition: "3s",
        transitionProperty: "display",
        ...sx,
      }}
    >
      {children}
    </Box>
  );
};
