import { Query } from "calculator-types";
import { FunctionComponent } from "react";

export function queryBuilder(
  title: string,
  component: FunctionComponent<{ readonly query: string }>
) {
  (component as Query).title = title;

  return component as Query;
}
