import React, { FunctionComponent, ReactNode } from "react";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Paper,
  Typography,
} from "@mui/material";

export interface SearchResultProps {
  readonly children: ReactNode;
  readonly title: string;
}

export const SearchResult: FunctionComponent<SearchResultProps> = ({
  children,
  title,
}) => {
  const [elevation, setElevation] = React.useState(1);

  const onHover = React.useCallback(
    (val: boolean) => () => setElevation(val ? 5 : 1),
    [elevation]
  );

  return (
    <Paper
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
          <Box sx={{ padding: 2 }}>{children}</Box>
        </CardContent>
      </Card>
    </Paper>
  );
};
