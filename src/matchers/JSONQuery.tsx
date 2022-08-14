import { JsonResult } from "../components/SearchResults/JsonResult";
import { queryBuilder } from "../utils/queryBuilder";
import React from "react";

export const JSONQuery = queryBuilder("JSON", ({ query }) => {
  const matches = React.useMemo(
    () =>
      (query.startsWith('"') && query.endsWith('"')) ||
      (query.startsWith("{") && query.endsWith("}")) ||
      (query.startsWith("[") && query.endsWith("]")),
    [query]
  );

  const value = React.useMemo(
    () => matches && JSON.parse(query),
    [matches, query]
  );

  if (!matches) {
    return null;
  }

  return <JsonResult value={value} />;
});
