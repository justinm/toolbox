import React, { FunctionComponent, SyntheticEvent } from "react";
import { SearchRounded } from "@mui/icons-material";
import { Autocomplete, Box, TextField } from "@mui/material";
import { useQueryHistory } from "../../providers/query-history";

export interface SearchBarProps {
  readonly onSearch: (input: string) => void;
  readonly query: string | null;
}
export const SearchBar: FunctionComponent<SearchBarProps> = ({
  onSearch,
  query,
}) => {
  const { history } = useQueryHistory();
  const options = React.useMemo(
    () => history.filter((h) => h.query !== query).map((h) => h.query),
    [history, query]
  );

  const onChange = React.useCallback(
    (evt: SyntheticEvent, value: string | null) => {
      onSearch(value ? value : "");
    },
    [onSearch]
  );

  return (
    <Box sx={{ display: "flex", alignItems: "flex-end", padding: 1 }}>
      <SearchRounded sx={{ color: "action.active", mr: 1, my: 0.5 }} />
      <Autocomplete
        freeSolo
        fullWidth
        clearOnEscape={true}
        clearOnBlur={true}
        options={options}
        value={query}
        onChange={onChange}
        renderInput={(params) => (
          <TextField
            {...params}
            id="query"
            label="Your Query"
            variant="standard"
            size={"small"}
            InputProps={{
              ...params.InputProps,
              // type: "search",
            }}
          />
        )}
      />
    </Box>
  );
};
