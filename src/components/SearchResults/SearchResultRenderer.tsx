import React, { FunctionComponent } from "react";
import { Stack } from "@mui/material";
import {
  Base64Query,
  ColorsQuery,
  HEXQuery,
  IPv4Query,
  JSONQuery,
  JWTQuery,
  UNIXTimestampQuery,
  URLEncodedQuery,
  WhoAmIQuery,
} from "../../matchers";
import { Query } from "calculator-types";
import { SearchResult } from "./SearchResult";

export interface SearchResultRendererProps {
  readonly query: string;
}

const queries: Query[] = [
  WhoAmIQuery,
  UNIXTimestampQuery,
  JWTQuery,
  ColorsQuery,
  IPv4Query,
  JSONQuery,
  HEXQuery,
  URLEncodedQuery,
  Base64Query,
];

export const SearchResultRenderer: FunctionComponent<
  SearchResultRendererProps
> = ({ query }) => {
  const elements = queries.map((Q) => (
    <SearchResult title={Q.title} key={Q.title} component={Q} query={query} />
  ));

  return (
    <>
      <Stack spacing={2}>{elements}</Stack>
    </>
  );
};
