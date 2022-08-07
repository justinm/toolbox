import { FunctionComponent } from "react";
import { Alert } from "@mui/material";

export const ParseError: FunctionComponent = () => {
  return (
    <Alert variant={"filled"} severity={"error"}>
      Parse Error
    </Alert>
  );
};
