import React from "react";
import { KeyValuePairs, KeyValueTable } from "../components/Tables/Tables";
import { queryBuilder } from "../utils/queryBuilder";

export const HEXQuery = queryBuilder("Hexadecimal", ({ query }) => {
  const isEncoded = React.useMemo(
    () => !!query.match(/^[0-9A-Fa-f]+$/),
    [query]
  );

  const hexValue = React.useMemo(
    () => query && isEncoded && parseInt(query, 16),
    [query, isEncoded]
  );
  const octalValue = React.useMemo(
    () => query && isEncoded && parseInt(query, 8),
    [query, isEncoded]
  );
  const numberValue = React.useMemo(
    () => query && isEncoded && Number(query),
    [query, isEncoded]
  );

  const values = React.useMemo(() => {
    const vals: KeyValuePairs = {};

    if (hexValue) {
      vals["As HEX"] = hexValue;
    }

    if (numberValue) {
      vals["Decimal"] = numberValue;
      vals["Decimal as HEX"] = numberValue.toString(16);
    }

    if (octalValue) {
      vals["Octal"] = octalValue;
    }

    return vals;
  }, [hexValue, numberValue, octalValue]);

  if (!isEncoded) {
    return null;
  }

  return <KeyValueTable values={values} />;
});
