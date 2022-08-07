/* eslint-disable react-hooks/rules-of-hooks */
import { IMatcher } from "calculator-types";
import { DateTime } from "luxon";
import React from "react";
import { KeyValueTable } from "../components/Tables/Tables";

export class TimestampMatcher implements IMatcher {
  public matches(input: string) {
    return !!input.match(/^([0-9]+) ?/);
  }

  public render(input: string) {
    const match = input.match(/^([0-9]+) ?(.+)?$/);

    if (!match) {
      return undefined;
    }

    let date: DateTime | undefined;
    const number = match[1];
    const offset = (match[2] ?? "").trim();

    if (number.length >= 16) {
      const value = Number(number.substring(0, 16));

      date = DateTime.fromMillis(value / 1000);
    } else if (number.length >= 13) {
      const value = Number(number.substring(0, 13));

      date = DateTime.fromMillis(value);
    } else if (number.length >= 10) {
      const value = Number(number.substring(0, 10));

      date = DateTime.fromSeconds(value);
    }

    if (date) {
      if (offset && offset !== "") {
        const newDate = date.setZone(offset);

        if (newDate.isValid) {
          date = newDate;
        }
      }

      const values = {
        "Relative Time": date.toRelative() ?? "Unknown",
        "ISO 8601 (AWS)": date.toISO(),
        "RFC 2822": date.toRFC2822(),
        "RFC 822, 1036, 1123, 2822": date.toFormat(
          "ccc, dd DD yyyy hh:mm:ss ZZ"
        ),
        "RFC 3339": date.toFormat("yyyy-MM-dd'T'HH:MM:ssZZ"),
        HTTP: date.toHTTP(),
        Timezone: `${date.offsetNameLong} (${date.offsetNameShort})`,
      };

      return <KeyValueTable values={values} />;
    }

    return undefined;
  }

  readonly type: string = "timestamp";
  readonly title: string = "Unix Timestamp";
}

export default TimestampMatcher;
