import { IMatcher } from "calculator-types";
import { Buffer } from "buffer";
import { MultilineTextSearchResult } from "../components/SearchResults/MultilineTextSearchResult";

export class Base64EncodeMatcher implements IMatcher {
  public matches(input: string) {
    return !input.match(
      /^([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{2}==)?$/
    );
  }

  public render(input: string) {
    if (this.matches(input)) {
      try {
        const value = Buffer.from(input).toString("base64");

        return <MultilineTextSearchResult value={value} />;
      } catch (err) {
        console.error(err);
      }
    }

    return undefined;
  }

  readonly type: string = "base64encoder";
  readonly title: string = "Base64 Encoded";
}

export default Base64EncodeMatcher;
