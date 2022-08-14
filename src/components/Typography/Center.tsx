import { FunctionComponent } from "react";
import { Box, Typography, TypographyProps } from "@mui/material";

export const Center: FunctionComponent<TypographyProps> = ({
  children,
  ...props
}) => {
  return (
    <Box
      sx={{ display: "flex", flexDirection: "row", justifyContent: "center" }}
    >
      <Typography {...props}>{children}</Typography>
    </Box>
  );
};
