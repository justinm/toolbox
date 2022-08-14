import { KeyValueTable } from "../components/Tables/Tables";
import UAParser from "ua-parser-js";
import { AllowGeoLookupButton } from "../components/AllowGeoLookup/AllowGeoLookupButton";
import { queryBuilder } from "../utils/queryBuilder";
import React from "react";
import { useGeoData } from "../providers/geo-data-provider";
import { Alert, Box, Link } from "@mui/material";
import { Center } from "../components/Typography/Center";

const keywords = ["whatismyip", "whoami", "ip"];

export const WhoAmIQuery = queryBuilder("Who Am I", ({ query }) => {
  const { loadGeoData, geoData, geoError } = useGeoData();

  React.useEffect(() => {
    if (!geoData && loadGeoData) {
      loadGeoData();
    }
  }, [loadGeoData, geoData]);

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
      let values: Record<string, string | number | boolean> = {};

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
      <AllowGeoLookupButton />

      {(() =>
        (geoData || geoError) && (
          <Box>
            <Box sx={{ margin: 4 }}>
              <Center variant={"h5"}>Data provided by</Center>
              <Center variant={"h5"}>
                <Link href={"https://geoiplookup.io"} target={"_blank"}>
                  geoiplookup.io
                </Link>
              </Center>
            </Box>
            {(() =>
              geoError && (
                <Alert severity={"error"}>{geoError.message}</Alert>
              ))()}
            {(() => geoData && <KeyValueTable values={geoData as {}} />)()}
          </Box>
        ))()}
    </>
  );
});
