import { IMatcher } from "calculator-types";
import { KeyValueTable } from "../components/Tables/Tables";
import { FunctionComponent } from "react";
import { Box } from "@mui/material";

export const DemoColor: FunctionComponent<{ readonly code: string }> = ({
  code,
}) => {
  return (
    <Box sx={{ backgroundColor: `#${code}`, width: "100%", height: 50 }} />
  );
};

export class ColorMatcher implements IMatcher {
  public matches(input: string) {
    return (
      !!this.fullCode(input) || !!this.shortCode(input) || !!this.rgbCode(input)
    );
  }

  public fullCode(input: string) {
    const match = input.match(/^#([A-Fa-f0-9]{6})$/);

    return match && match[1];
  }

  public shortCode(input: string) {
    const match = input.match(/^#([A-Fa-f0-9]{3})$/);

    return match && match[1].repeat(2);
  }

  public rgbCode(input: string) {
    const match = input.match(/^([0-9]{1,3} ?){3}$/);

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
  }

  public render(input: string) {
    const code =
      this.fullCode(input) ?? this.shortCode(input) ?? this.rgbCode(input);

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

    return undefined;
  }

  readonly type: string = "htmlcolor";
  readonly title: string = "Colors";
}

export default ColorMatcher;
