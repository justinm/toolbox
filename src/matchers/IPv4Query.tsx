import { KeyValueTable } from "../components/Tables/Tables";
import { Netmask } from "netmask";
import React from "react";
import { tryOrUndefined } from "../utils/tryOrUndefined";
import { queryBuilder } from "../utils/queryBuilder";

export const IPv4Query = queryBuilder("IPv4", ({ query }) => {
  const matches = React.useMemo(
    () => !!query.match(/^(?:[0-9]{1,3}\.){3}[0-9]{1,3}(\/[0-9]{1,2})?$/),
    [query]
  );

  const netmask = React.useMemo(
    () => matches && tryOrUndefined(() => new Netmask(query)),
    [matches, query]
  );

  const values = React.useMemo(() => {
    if (netmask) {
      let values: Record<string, string | number> = {};

      if (netmask) {
        values["Base"] = netmask.base;

        if (netmask.bitmask !== 32) {
          values["Mask"] = netmask.mask;
          values["Broadcast"] = netmask.broadcast;
          values["Size"] = netmask.size;
          values["First"] = netmask.first;
          values["Last"] = netmask.last;
        }
      }

      return values;
    }
  }, [netmask]);

  if (!matches || !values) {
    return null;
  }

  return <KeyValueTable values={values} />;
});
