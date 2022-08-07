import { FunctionComponent } from "react";
import { CopyElement } from "../CopyElement/CopyElement";
import { TextField } from "@mui/material";

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
        sx={{ border: 0 }}
        InputProps={{ disableUnderline: true }}
      />
    </CopyElement>
  );
};
