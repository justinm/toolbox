import React, { FunctionComponent } from "react";
import { SearchBar } from "../../components/SearchBar/SearchBar";
import { SearchResultRenderer } from "../../components/SearchResults/SearchResultRenderer";
import { Box } from "@mui/material";
import { IMatcher } from "calculator-types";
import Base64DecodeMatcher from "../../matchers/base64decode";
import { Base64EncodeMatcher } from "../../matchers/base64encode";
import TimestampMatcher from "../../matchers/timestamp";
import { URLEncoding } from "../../matchers/urlencode";
import HEXConverter from "../../matchers/hex";
import ColorMatcher from "../../matchers/colors";
import IPMatcher from "../../matchers/ipv4";
import { useAnalytics } from "use-analytics";
import JWTDecoder from "../../matchers/jwt";
import { Examples } from "./Examples";
import { useQueryHistory } from "../../providers/query-history";
import JSONMatcher from "../../matchers/json";

const matchers: IMatcher[] = [
  new JWTDecoder(),
  new ColorMatcher(),
  new IPMatcher(),
  new TimestampMatcher(),
  new JSONMatcher(),
  new HEXConverter(),
  new Base64DecodeMatcher(),
  new Base64EncodeMatcher(),
  new URLEncoding(),
];

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
        <SearchResultRenderer query={current} matchers={matchers} />
      ) : (
        <Examples />
      )}
    </Box>
  );
};
