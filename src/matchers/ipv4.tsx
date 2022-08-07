import { IMatcher } from "calculator-types";
import { KeyValueTable } from "../components/Tables/Tables";
import { Netmask } from "netmask";

export class IPV4Matcher implements IMatcher {
  public matches(input: string) {
    return !!input.match(/^(?:[0-9]{1,3}\.){3}[0-9]{1,3}(\/[0-9]{1,2})?$/);
  }

  public render(input: string) {
    try {
      let values: Record<string, string | number> = {};

      const ip = new Netmask(input);

      if (ip) {
        values["Base"] = ip.base;

        if (ip.bitmask !== 32) {
          values["Mask"] = ip.mask;
          values["Broadcast"] = ip.broadcast;
          values["Size"] = ip.size;
          values["First"] = ip.first;
          values["Last"] = ip.last;
        }
      }

      values = Object.keys(values)
        .filter((k) => !!values[k] && values[k] !== "")
        .reduce((coll, next) => {
          coll[next] = values[next];

          return coll;
        }, {} as Record<string, string | number>);

      if (!values || !Object.keys(values).length) {
        return undefined;
      }

      return <KeyValueTable values={values} />;
    } catch (err) {
      console.error(err);
    }

    return undefined;
  }

  readonly type: string = "networking";
  readonly title: string = "Networking";
}

export default IPV4Matcher;
