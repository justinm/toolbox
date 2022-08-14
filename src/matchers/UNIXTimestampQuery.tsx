import { DateTime } from "luxon";
import React from "react";
import { KeyValueTable } from "../components/Tables/Tables";
import { queryBuilder } from "../utils/queryBuilder";

export const UNIXTimestampQuery = queryBuilder(
  "Unix Timestamp",
  ({ query }) => {
    const match = React.useMemo(() => query.match(/^([0-9]+) ?/), [query]);
    const number = React.useMemo(
      () => match && (match[1] ?? "").trim(),
      [match]
    );
    const offset = React.useMemo(
      () => match && (match[2] ?? "").trim(),
      [match]
    );

    if (!match || !number) {
      return null;
    }

    const date = React.useMemo(() => {
      let date: DateTime | undefined;

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
      }

      return date;
    }, [offset, number]);

    const values = React.useMemo(() => {
      if (date) {
        return {
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
      }
    }, [date]);

    if (values) {
      return <KeyValueTable values={values} />;
    }

    return null;
  }
);
