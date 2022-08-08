import React, { FunctionComponent, SyntheticEvent } from "react";
import { SearchRounded } from "@mui/icons-material";
import { Autocomplete, Box, TextField } from "@mui/material";
import { useQueryHistory } from "../../providers/query-history";

export interface SearchBarProps {
  readonly onSearch: (input: string) => void;
  readonly initialValue?: string | null;
}
export const SearchBar: FunctionComponent<SearchBarProps> = ({
  onSearch,
  initialValue,
}) => {
  const { history, push } = useQueryHistory();
  const [searchQuery, setSearchQuery] = React.useState(
    initialValue ? initialValue : (history.length ? history[0].query : "") ?? ""
  );
  const options = React.useMemo(
    () => history.filter((h) => h.query !== searchQuery).map((h) => h.query),
    [history, searchQuery]
  );

  React.useEffect(() => {
    onSearch(searchQuery);
    push(searchQuery);
  }, [push, onSearch, searchQuery]);

  const onChange = React.useCallback(
    (evt: SyntheticEvent, value: string | null) => {
      setSearchQuery(value ? value : "");
    },
    []
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
        value={searchQuery}
        onChange={onChange}
        renderInput={(params) => (
          <TextField
            {...params}
            id="query"
            label="Your Query"
            variant="standard"
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
