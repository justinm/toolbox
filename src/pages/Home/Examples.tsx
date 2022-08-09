import React, { FunctionComponent } from "react";
import { Box, Stack, Tooltip, Typography } from "@mui/material";
import { useQueryHistory } from "../../providers/query-history";

export interface ExampleProp {
  readonly example: string;
  readonly description: string;
}

export const Example: FunctionComponent<ExampleProp> = ({
  example,
  description,
}) => {
  const { push } = useQueryHistory();

  const onClick = React.useCallback(() => {
    push(example);
  }, [push, example]);

  return (
    <Tooltip title={"Click to try it!"} placement={"bottom-start"}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "flex-end",
          cursor: "pointer",
        }}
        onClick={onClick}
      >
        <Typography variant={"subtitle1"} sx={{ fontWeight: "bold" }}>
          {example}
        </Typography>
        <Typography variant={"body2"}>... {description}</Typography>
      </Box>
    </Tooltip>
  );
};

export const Examples: FunctionComponent = () => {
  return (
    <Box
      sx={{
        marginTop: 5,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Typography variant={"h5"} sx={{ marginBottom: 2 }}>
        Common Examples
      </Typography>
      <Stack sx={{ padding: 2 }} spacing={1}>
        <Example
          example={"whoami"}
          description={"Displays information regarding your client/browser"}
        />
        <Example
          example={"1659960381"}
          description={"Displays information for a given UNIX timestamp"}
        />
        <Example
          example={"192.168.1.28/24"}
          description={"Displays information for a given CIDR"}
        />
        <Example
          example={"#FF56CC"}
          description={"Displays information for a given color code"}
        />
        <Example
          example={"127 55 80"}
          description={"Displays information for a given RGB color code"}
        />
        <Example
          example={"4F5C"}
          description={"Converts HEX to decimal and octal"}
        />
        <Example example={"aGVsbG8gd29ybGQK"} description={"Decodes base64"} />
      </Stack>
    </Box>
  );
};
