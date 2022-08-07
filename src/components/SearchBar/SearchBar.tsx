import React, {
  ChangeEvent,
  ChangeEventHandler,
  FunctionComponent,
} from "react";
import { SearchRounded } from "@mui/icons-material";
import { Box, TextField } from "@mui/material";
import { useDebounce } from "../../utils/debounce";

export interface ISearchBarForm {
  readonly search: string;
}

export interface SearchBarProps {
  readonly onSearch: (input: string) => void;
  readonly initialValue?: string | null;
}
export const SearchBar: FunctionComponent<SearchBarProps> = ({
  onSearch,
  initialValue,
}) => {
  const [searchQuery, setSearchQuery] = React.useState(
    initialValue ? initialValue : ""
  );
  const debouncedValue = useDebounce(searchQuery, 200);

  React.useEffect(() => {
    onSearch(debouncedValue);
  }, [onSearch, debouncedValue]);

  const onChange = React.useCallback((evt: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(evt.target.value);
  }, []);

  return (
    <Box sx={{ display: "flex", alignItems: "flex-end", padding: 1 }}>
      <SearchRounded sx={{ color: "action.active", mr: 1, my: 0.5 }} />
      <TextField
        fullWidth
        id="query"
        label="Your Query"
        variant="standard"
        onChange={onChange}
        value={searchQuery}
      />
    </Box>
  );
};
