import React, { FunctionComponent } from "react";
import { SearchBar } from "../../components/SearchBar/SearchBar";
import { SearchResultRenderer } from "../../components/SearchResults/SearchResultRenderer";
import { Box } from "@mui/material";
import { useAnalytics } from "use-analytics";
import { Examples } from "./Examples";
import { useQueryHistory } from "../../providers/query-history";

export const Home: FunctionComponent = () => {
  const { track } = useAnalytics();
  const { current, push } = useQueryHistory();

  const setSearchQuery = React.useCallback(
    (query: string) => {
      push(query);
      void track("query", 1);
    },
    [push, track]
  );

  return (
    <Box>
      <SearchBar onSearch={setSearchQuery} query={current} />
      {current && current !== "" ? (
        <SearchResultRenderer query={current} />
      ) : (
        <Examples />
      )}
    </Box>
  );
};
