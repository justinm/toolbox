import { IMatcher } from "calculator-types";
import { KeyValueTable } from "../components/Tables/Tables";

export class HEXConverter implements IMatcher {
  public matches(input: string) {
    return !!input.match(/^[0-9A-Fa-f]+$/);
  }

  public render(input: string) {
    if (this.matches(input)) {
      try {
        const values: Record<string, string | number> = {};
        const wasHEX = parseInt(input, 16);
        const wasOctal = parseInt(input, 8);
        const number = Number(input);

        if (wasHEX) {
          values["HEX to Decimal"] = wasHEX;
        }

        if (number) {
          values["Decimal to Hex"] = number.toString(16);
        }

        if (wasOctal) {
          values["Octal to Decimal"] = wasOctal;
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

  readonly type: string = "haxToDecimal";
  readonly title: string = "Hexidecimal";
}

export default HEXConverter;
