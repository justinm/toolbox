import { FunctionComponent } from "react";
import { CopyElement } from "../CopyElement/CopyElement";
import { TextField } from "@mui/material";
import { grey } from "@mui/material/colors";

export interface MultilineTextSearchResultProps {
  readonly value: string | number;
}

export const MultilineTextSearchResult: FunctionComponent<
  MultilineTextSearchResultProps
> = ({ value }) => {
  return (
    <CopyElement value={value}>
      <TextField
        variant={"standard"}
        multiline
        fullWidth
        aria-readonly
        value={value}
        sx={{ border: 1, borderColor: grey[400], padding: 1 }}
        InputProps={{ disableUnderline: true }}
      />
    </CopyElement>
  );
};
