import React, { FunctionComponent } from "react";
import { SearchBar } from "../components/SearchBar/SearchBar";
import { SearchResultRenderer } from "../components/SearchResults/SearchResultRenderer";
import { Box } from "@mui/material";
import { IMatcher } from "calculator-types";
import Base64DecodeMatcher from "../matchers/base64decode";
import { Base64EncodeMatcher } from "../matchers/base64encode";
import TimestampMatcher from "../matchers/timestamp";
import { useSearchParams } from "../utils/searchParams";
import { URLEncoding } from "../matchers/urlencode";
import HEXConverter from "../matchers/hex";
import ColorMatcher from "../matchers/colors";
import IPMatcher from "../matchers/ipv4";
import { useDebounce } from "../utils/debounce";
import { useAnalytics } from "use-analytics";
import JWTDecoder from "../matchers/jwt";

const matchers: IMatcher[] = [
  new JWTDecoder(),
  new ColorMatcher(),
  new IPMatcher(),
  new TimestampMatcher(),
  new HEXConverter(),
  new URLEncoding(),
  new Base64DecodeMatcher(),
  new Base64EncodeMatcher(),
];

export const Home: FunctionComponent = () => {
  const { track } = useAnalytics();
  const { setParam, params } = useSearchParams();
  const [searchQuery, setSearchQuery] = React.useState("");
  const q = React.useMemo(() => params.get("q"), []);
  const debouncedQ = useDebounce(searchQuery, 1000);

  React.useEffect(() => {
    if (q && q !== searchQuery) {
      setSearchQuery(q);
    }
  }, [q]);

  React.useEffect(() => {
    setParam("q", searchQuery);
  }, [setParam, searchQuery]);

  React.useEffect(() => {
    if (debouncedQ) {
      void track("query", debouncedQ);
    }
  }, [debouncedQ]);

  return (
    <Box>
      <SearchBar onSearch={setSearchQuery} initialValue={q} />
      {searchQuery && searchQuery !== "" ? (
        <SearchResultRenderer query={searchQuery} matchers={matchers} />
      ) : (
        <div>No Query</div>
      )}
    </Box>
  );
};
