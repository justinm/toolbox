import { KeyValueTable } from "../components/Tables/Tables";
import React, { FunctionComponent } from "react";
import { Box } from "@mui/material";
import { queryBuilder } from "../utils/queryBuilder";

export const DemoColor: FunctionComponent<{ readonly code: string }> = ({
  code,
}) => {
  return (
    <Box sx={{ backgroundColor: `#${code}`, width: "100%", height: 50 }} />
  );
};

export const ColorsQuery = queryBuilder("Colors", ({ query }) => {
  const fullCode = React.useMemo(() => {
    const match = query.match(/^#([A-Fa-f0-9]{6})$/);

    return match && match[1];
  }, [query]);

  const shortCode = React.useMemo(() => {
    const match = query.match(/^#([A-Fa-f0-9]{3})$/);

    return match && match[1].repeat(2);
  }, [query]);

  const rgbCode = React.useMemo(() => {
    const match = query.match(/^([0-9]{1,3} ?){3}$/);

    if (match) {
      const codes = match[0]
        .split(" ")
        .map((n) => Number(n))
        .filter((n) => !isNaN(n))
        .filter((n) => n <= 255 && n >= 0)
        .map((n) => n.toString(16));

      if (codes.length === 3) {
        return codes.join("");
      }
    }

    return undefined;
  }, [query]);

  const code = React.useMemo(
    () => fullCode ?? shortCode ?? rgbCode,
    [fullCode, shortCode, rgbCode]
  );

  if (code) {
    const codes = code.match(/(.{2})/g);

    if (codes) {
      const values = {
        Demo: <DemoColor code={code} />,
        Red: parseInt(codes[0], 16),
        Green: parseInt(codes[1], 16),
        Blue: parseInt(codes[2], 16),
      };

      return <KeyValueTable values={values} />;
    }
  }

  return null;
});
