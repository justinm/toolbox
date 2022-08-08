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
    [query, matchers]
  );

  const renders = React.useMemo(
    () =>
      matches.map((m) => {
        try {
          console.debug(`Trying to render ${m.type}`);

          return m.render(query);
        } catch (err) {
          console.debug("Renderer threw error", err);

          return undefined;
        }
      }),
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
    <Stack divider={<Divider flexItem />} spacing={2}>
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
