import React, { FunctionComponent } from "react";
import { Divider, Stack } from "@mui/material";
import { SearchResult } from "./SearchResult";
import { IMatcher } from "calculator-types";

export interface SearchResultRendererProps {
  readonly query: string;
  readonly matchers: IMatcher[];
}

export const SearchResultRenderer: FunctionComponent<
  SearchResultRendererProps
> = ({ query, matchers }) => {
  const matches = React.useMemo(
    () => matchers.filter((m) => m.matches(query)),
    [query]
  );

  const renders = React.useMemo(
    () => matches.map((m) => m.render(query)),
    [matches, query]
  );

  const hasResults = React.useMemo(
    () => renders.filter((r) => !!r).length,
    [renders]
  );

  if (!hasResults) {
    return <div>No Matches</div>;
  }

  return (
    <Stack divider={<Divider flexItem />}>
      {(() =>
        matches
          .map((m, i) => {
            const contents = renders[i];

            if (contents) {
              return (
                <SearchResult key={m.type} title={m.title}>
                  {contents}
                </SearchResult>
              );
            }

            return undefined;
          })
          .filter((m) => !!m))()}
    </Stack>
  );
};
