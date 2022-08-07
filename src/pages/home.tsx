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

const matchers: IMatcher[] = [
  new IPMatcher(),
  new TimestampMatcher(),
  new URLEncoding(),
  new HEXConverter(),
  new ColorMatcher(),
  new Base64DecodeMatcher(),
  new Base64EncodeMatcher(),
];

export const Home: FunctionComponent = () => {
  const { setParam, params } = useSearchParams();
  const [searchQuery, setSearchQuery] = React.useState("");
  const q = React.useMemo(() => params.get("q"), []);

  React.useEffect(() => {
    if (q && q !== searchQuery) {
      setSearchQuery(q);
    }
  }, [q]);

  React.useEffect(() => {
    setParam("q", searchQuery);
  }, [setParam, searchQuery]);

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
