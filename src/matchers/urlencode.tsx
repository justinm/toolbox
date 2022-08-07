import { IMatcher } from "calculator-types";
import { KeyValueTable } from "../components/Tables/Tables";

export class URLEncoding implements IMatcher {
  public matches() {
    return true;
  }

  public render(input: string) {
    if (this.matches()) {
      try {
        const values: Record<string, string> = {};
        const encoded = encodeURIComponent(input);
        const decoded = decodeURIComponent(input);

        if (encoded !== input) {
          values["Encoded URL"] = encoded;
        }

        if (decoded !== input) {
          values["Decoded URL"] = decoded;
        }

        if (!values || !Object.keys(values).length) {
          return undefined;
        }

        return <KeyValueTable values={values} />;
      } catch (err) {
        console.error(err);
      }
    }

    return undefined;
  }

  readonly type: string = "urlencode";
  readonly title: string = "URL Encoding";
}

export default URLEncoding;
