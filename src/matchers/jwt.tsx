import { IMatcher } from "calculator-types";
import jwtDecode from "jwt-decode";
import { JsonResult } from "../components/SearchResults/JsonResult";
import { ReactNode } from "react";
import { Alert, Stack, Typography } from "@mui/material";

export class JWTDecoder implements IMatcher {
  public matches(input: string) {
    return !!input.match(/^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+$/);
  }

  public render(input: string) {
    if (this.matches(input)) {
      const contents: ReactNode[] = [];

      try {
        const headers = jwtDecode(input, { header: true });

        contents.push(
          <div>
            <Typography variant={"subtitle1"}>Headers</Typography>
            <JsonResult value={headers} />
          </div>
        );
      } catch (err) {
        contents.push(
          <Alert severity={"error"}>Unable to decode JWT headers</Alert>
        );
      }

      try {
        const token = jwtDecode(input);

        contents.push(
          <div>
            <Typography variant={"subtitle1"}>Payload</Typography>
            <JsonResult value={token} />
          </div>
        );
      } catch (err) {
        contents.push(
          <Alert severity={"error"}>Unable to decode JWT payload</Alert>
        );
        console.error(err);
      }

      if (!contents.length) {
        return undefined;
      }

      return <Stack spacing={2}>{contents}</Stack>;
    }

    return undefined;
  }

  readonly type: string = "jwt";
  readonly title: string = "JWT Decoder";
}

export default JWTDecoder;
