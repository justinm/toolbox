import { queryBuilder } from "../utils/queryBuilder";
import React, { ReactElement } from "react";
import { tryOrUndefined } from "../utils/tryOrUndefined";
import { Typography } from "@mui/material";
import { MultilineTextSearchResult } from "../components/SearchResults/MultilineTextSearchResult";

export const URLEncodedQuery = queryBuilder("URL Encoding", ({ query }) => {
  const isEncoded = React.useMemo(
    () =>
      !!query.match(
        /^([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{2}==)?$/
      ),
    [query]
  );

  const decodedValue = React.useMemo(
    () => isEncoded && tryOrUndefined(() => decodeURIComponent(query)),
    [isEncoded, query]
  );

  const encodedValue = React.useMemo(
    () => isEncoded && tryOrUndefined(() => encodeURIComponent(query)),
    [isEncoded, query]
  );

  const results = React.useMemo(() => {
    const results: ReactElement[] = [];

    if (encodedValue) {
      results.push(
        <>
          <Typography>Decoded Value</Typography>
          <MultilineTextSearchResult value={encodedValue} />
        </>
      );
    }

    if (decodedValue) {
      results.push(
        <>
          <Typography>Decoded Value</Typography>
          <MultilineTextSearchResult value={decodedValue} />
        </>
      );
    }

    return results;
  }, [encodedValue, decodedValue]);

  if (!results.length) {
    return null;
  }

  return <>{results}</>;
});
