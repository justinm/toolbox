import React, { FunctionComponent, ReactNode } from "react";
import copy from "copy-to-clipboard";
import { Button, Grid, Tooltip, Typography } from "@mui/material";
import { CopyAll } from "@mui/icons-material";

export interface CopyElementProps {
  readonly children: ReactNode;
  readonly value: string | number;
  readonly disableText?: boolean;
  readonly direction?: "row" | "column";
}

export const CopyElement: FunctionComponent<CopyElementProps> = ({
  children,
  value,
  disableText,
  direction,
}) => {
  const [copied, setCopied] = React.useState(false);
  const copyToClipboard = React.useCallback(() => {
    copy(String(value));
    setCopied(true);
  }, [value]);

  React.useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => setCopied(false), 1000);

      return () => clearTimeout(timer);
    }
  }, [copied]);

  return (
    <Grid container direction={direction ?? "column"}>
      <Grid
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        {children}
      </Grid>
      <Grid
        sx={{
          display: "flex",
          flexDirection: "row",
          flexGrow: 1,
          justifyContent: "flex-end",
        }}
      >
        <Tooltip
          title={"Copied"}
          open={copied}
          TransitionProps={{ timeout: 600 }}
        >
          <Button
            onClick={copyToClipboard}
            color={"primary"}
            sx={{
              textTransform: "inherit",
              color: "inherit",
            }}
          >
            {(() =>
              !disableText && (
                <Typography variant={"subtitle1"}>Copy to Clipboard</Typography>
              ))()}

            <CopyAll />
          </Button>
        </Tooltip>
      </Grid>
    </Grid>
  );
};
