import { IMatcher } from "calculator-types";
import { KeyValueTable } from "../components/Tables/Tables";
import UAParser from "ua-parser-js";

const keywords = ["whatismyip", "whoami", "ip"];

export class WhoAmI implements IMatcher {
  public matches(input: string) {
    for (const keyword of keywords) {
      console.log(keyword, input);
      const pattern = new RegExp(`\\b(${keyword})\\b`);

      if (!!input.toLowerCase().match(pattern)) {
        return true;
      }
    }

    return false;
  }

  public render() {
    let values: Record<string, string | number> = {};

    const parser = new UAParser();

    values["User Agent"] = parser.getUA() ?? "Unknown";

    values["Browser"] = `${parser.getBrowser().name ?? "Unknown"} v${
      parser.getBrowser().version ?? "Unknown"
    }`;
    values["OS"] = parser.getOS().name ?? "Unknown";
    values["OS"] = parser.getOS().name ?? "Unknown";

    const device = parser.getDevice();

    if (device.type) {
      values["Device Type"] = device.type ?? "Unknown";
      values["Device Vendor"] = device.vendor ?? "Unknown";
      values["Device Model"] = device.model ?? "Unknown";
    }

    values["Engine"] = `${parser.getEngine().name ?? "Unknown"} v${
      parser.getEngine().version ?? "Unknown"
    }`;

    values["Architecture"] = parser.getCPU().architecture ?? "Unknown";

    return <KeyValueTable values={values} />;
  }

  readonly type: string = "whoami";
  readonly title: string = "Who Am I";
}

export default WhoAmI;
