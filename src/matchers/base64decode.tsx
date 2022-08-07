import { IMatcher } from "calculator-types";
import { MultilineTextSearchResult } from "../components/SearchResults/MultilineTextSearchResult";
import { Buffer } from "buffer";

export class Base64DecodeMatcher implements IMatcher {
  public matches(input: string) {
    return !!input.match(
      /^([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{2}==)?$/
    );
  }

  public render(input: string) {
    if (this.matches(input)) {
      try {
        const value = Buffer.from(input, "base64").toString("ascii");

        return <MultilineTextSearchResult value={value} />;
      } catch (err) {
        console.error(err);
      }
    }

    return undefined;
  }

  readonly type: string = "base64decoder";
  readonly title: string = "Base64 Decoded";
}

export default Base64DecodeMatcher;
