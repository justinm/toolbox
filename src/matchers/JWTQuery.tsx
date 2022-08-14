import jwtDecode from "jwt-decode";
import { JsonResult } from "../components/SearchResults/JsonResult";
import React, { ReactNode } from "react";
import { Alert, Stack, Typography } from "@mui/material";
import { queryBuilder } from "../utils/queryBuilder";
import { tryOrUndefined } from "../utils/tryOrUndefined";

export const JWTQuery = queryBuilder("JWT Decoder", ({ query }) => {
  const matches = React.useMemo(
    () => !!query.match(/^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+$/),
    [query]
  );

  const headers = React.useMemo(
    () => matches && tryOrUndefined(() => jwtDecode(query, { header: true })),
    [matches, query]
  );

  const payload = React.useMemo(
    () => matches && tryOrUndefined(() => jwtDecode(query, { header: true })),
    [matches, query]
  );

  const contents = React.useMemo(() => {
    const contents: ReactNode[] = [];

    if (matches) {
      if (headers) {
        contents.push(
          <div>
            <Typography variant={"subtitle1"}>Headers</Typography>
            <JsonResult value={headers} />
          </div>
        );
      } else {
        contents.push(
          <Alert severity={"error"}>Unable to decode JWT headers</Alert>
        );
      }

      if (payload) {
        contents.push(
          <div>
            <Typography variant={"subtitle1"}>Payload</Typography>
            <JsonResult value={payload} />
          </div>
        );
      } else {
        contents.push(
          <Alert severity={"error"}>Unable to decode JWT payload</Alert>
        );
      }
    }

    return contents;
  }, [matches, headers, payload]);

  if (!contents.length) {
    return null;
  }

  return <Stack spacing={2}>{contents}</Stack>;
});
