import { MultilineTextSearchResult } from "../components/SearchResults/MultilineTextSearchResult";
import { Buffer } from "buffer";
import React, { ReactElement } from "react";
import { Typography } from "@mui/material";
import { tryOrUndefined } from "../utils/tryOrUndefined";
import { queryBuilder } from "../utils/queryBuilder";

export const Base64Query = queryBuilder("Base64", ({ query }) => {
  const isEncoded = React.useMemo(
    () =>
      !!query.match(
        /^([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{2}==)?$/
      ),
    [query]
  );

  const decodedValue = React.useMemo(
    () =>
      isEncoded &&
      tryOrUndefined(() => Buffer.from(query, "base64").toString("ascii")),
    [isEncoded, query]
  );

  const encodedValue = React.useMemo(
    () =>
      isEncoded && tryOrUndefined(() => Buffer.from(query).toString("base64")),
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
