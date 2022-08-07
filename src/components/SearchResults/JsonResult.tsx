import { FunctionComponent } from "react";
import { CopyElement } from "../CopyElement/CopyElement";
import { TextField } from "@mui/material";
import { grey } from "@mui/material/colors";

export interface JsonResultProps {
  readonly value: unknown;
}

export const JsonResult: FunctionComponent<JsonResultProps> = ({ value }) => {
  const json = JSON.stringify(value, undefined, 2);

  return (
    <CopyElement value={json}>
      <TextField
        variant={"standard"}
        multiline
        fullWidth
        aria-readonly
        value={json}
        sx={{ border: 1, borderColor: grey[400], padding: 1 }}
        InputProps={{ disableUnderline: true }}
      />
    </CopyElement>
  );
};
