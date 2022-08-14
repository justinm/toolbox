import { KeyValueTable } from "../components/Tables/Tables";
import UAParser from "ua-parser-js";
import { AllowLookupButton } from "../components/AllowGeoLookup/AllowLookupButton";
import { queryBuilder } from "../utils/queryBuilder";
import React from "react";

const keywords = ["whatismyip", "whoami", "ip"];

export const WhoAmIQuery = queryBuilder("Who Am I", ({ query }) => {
  const matches = React.useMemo(
    () =>
      keywords
        .map((k) => new RegExp(`\\b(${k})\\b`))
        .filter((r) => query.toLowerCase().match(r)).length,
    [query]
  );

  const parser = React.useMemo(() => matches && new UAParser(), [matches]);

  const values = React.useMemo(() => {
    if (parser) {
      const values: Record<string, string> = {};

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

      return values;
    }
  }, [parser]);

  if (!values) {
    return null;
  }

  return (
    <>
      <KeyValueTable values={values} />
      <AllowLookupButton />
    </>
  );
});
