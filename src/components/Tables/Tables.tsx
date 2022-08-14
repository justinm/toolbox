import {
  styled,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import React, { FunctionComponent, ReactElement, ReactNode } from "react";
import { CopyElement, CopyElementProps } from "../CopyElement/CopyElement";

export interface KeyValuePairs {
  [key: string]: ReactElement | string | number | boolean;
}

export const TableRowColumnHeader = styled(TableCell)(({ theme }) => ({
  background: theme.palette.background.tableHeader,
  width: 200,
}));

export const TableRowColumnValue = styled(TableCell)(({ theme }) => ({
  background: theme.palette.background.default,
}));

export const Passthrough: FunctionComponent<CopyElementProps> = ({
  children,
  ...props
}) => {
  return <React.Fragment {...props}>{children}</React.Fragment>;
};

export const KeyValueTableRow: FunctionComponent<{
  readonly title: string;
  readonly value: ReactElement | string | number;
}> = ({ title, value }) => {
  let contents: ReactNode;

  if (React.isValidElement(value)) {
    contents = <>{value}</>;
  } else {
    contents = (
      <CopyElement value={value} direction={"row"}>
        <Typography variant={"body1"}>{value}</Typography>
      </CopyElement>
    );
  }

  return (
    <TableRow>
      <TableRowColumnHeader>
        <Typography variant={"subtitle1"}>{title}</Typography>
      </TableRowColumnHeader>
      <TableRowColumnValue>{contents}</TableRowColumnValue>
    </TableRow>
  );
};

export const KeyValueTable: FunctionComponent<{
  values: KeyValuePairs;
}> = ({ values }) => {
  return (
    <Table size={"small"}>
      <TableBody>
        {(() =>
          Object.keys(values)
            .filter((k) => {
              if (typeof values[k] === "number") {
                return !isNaN(values[k] as number);
              }

              return !!values[k];
            })
            .map((v) => (
              <KeyValueTableRow
                key={v}
                title={v}
                value={values[v].toString()}
              />
            )))()}
      </TableBody>
    </Table>
  );
};
