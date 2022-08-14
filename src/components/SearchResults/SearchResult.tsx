import React, { FunctionComponent } from "react";
import {
  Alert,
  Box,
  Card,
  CardContent,
  Divider,
  Paper,
  Typography,
} from "@mui/material";
import { Query } from "calculator-types";

export interface SearchResultProps {
  readonly component: Query;
  readonly query: string;
  readonly title: string;
}

export const SearchResultWrapper: FunctionComponent<{
  readonly component: Query;
  readonly query: string;
  readonly hasResults: boolean;
  readonly onResults: (results: boolean) => void;
}> = ({ component, query, onResults }) => {
  const [localHasResults, setLocalHasResults] = React.useState(false);

  React.useEffect(() => {
    onResults(localHasResults);
  }, [localHasResults, onResults]);

  try {
    const contents = component({ query });

    if (contents) {
      if (!localHasResults) {
        setLocalHasResults(true);
      }

      return contents;
    } else {
      if (localHasResults) {
        setLocalHasResults(false);
      }
    }
  } catch (err) {
    if (!localHasResults) {
      setLocalHasResults(true);
    }

    return <Alert severity={"error"}>{(err as Error).message}</Alert>;
  }

  return null;
};

export const SearchResult: FunctionComponent<SearchResultProps> = ({
  component,
  query,
  title,
}) => {
  const [elevation, setElevation] = React.useState(1);
  const [hasResults, setHasResults] = React.useState(false);

  const onHover = React.useCallback(
    (val: boolean) => () => setElevation(val ? 5 : 1),
    []
  );

  const contents = React.useMemo(
    () => (
      <SearchResultWrapper
        query={query}
        component={component}
        onResults={setHasResults}
        hasResults={hasResults}
      />
    ),
    [query, component, hasResults]
  );

  return (
    <Paper
      sx={{ display: hasResults ? "block" : "none" }}
      elevation={elevation}
      onMouseEnter={onHover(true)}
      onMouseLeave={onHover(false)}
    >
      <Card>
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            {title}
          </Typography>
          <Divider />
          <Box sx={{ padding: 2 }}>{contents}</Box>
        </CardContent>
      </Card>
    </Paper>
  );
};
