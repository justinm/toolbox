import { IMatcher } from "calculator-types";
import { JsonResult } from "../components/SearchResults/JsonResult";

export class JSONMatcher implements IMatcher {
  public matches(input: string) {
    return (
      (input.startsWith('"') && input.endsWith('"')) ||
      (input.startsWith("{") && input.endsWith("}")) ||
      (input.startsWith("[") && input.endsWith("]"))
    );
  }

  public render(input: string) {
    if (this.matches(input)) {
      try {
        const value = JSON.parse(input);

        return <JsonResult value={value} />;
      } catch (err) {
        console.error(err);
      }
    }

    return undefined;
  }

  readonly type: string = "json";
  readonly title: string = "JSON";
}

export default JSONMatcher;
