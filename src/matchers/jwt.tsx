import { IMatcher } from "calculator-types";
import jwtDecode from "jwt-decode";
import { JsonResult } from "../components/SearchResults/JsonResult";

export class JWTDecoder implements IMatcher {
  public matches(input: string) {
    return !!input.match(/^([A-Za-z0-9-_]\.?){3}$/);
  }

  public render(input: string) {
    if (this.matches(input)) {
      try {
        const headers = jwtDecode(input, { header: true });
        const token = jwtDecode(input);

        return (
          <>
            <JsonResult value={headers} />
            <JsonResult value={token} />
          </>
        );
      } catch (err) {
        console.error(err);
      }
    }

    return undefined;
  }

  readonly type: string = "jwt";
  readonly title: string = "JWT Decoder";
}

export default JWTDecoder;
