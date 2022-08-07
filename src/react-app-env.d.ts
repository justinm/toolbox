/// <reference types="react-scripts" />

declare module "calculator-types" {
  import { ReactNode } from "react";

  export interface IMatcher {
    readonly matches: (input: string) => boolean;
    readonly render: (input: string) => ReactNode | undefined;
    readonly type: string;
    readonly title: string;
  }
}

declare module "analytics-plugin-do-not-track" {
  function def();

  export default def;
}

declare module "@analytics/google-analytics" {
  function def(props: { measurementIds: string[] });

  export default def;
}

declare module "use-analytics" {
  import { Component, ReactNode } from "react";
  import { AnalyticsInstance } from "analytics";

  export function track(thing: string);
  export function page();

  export class AnalyticsProvider extends Component<{
    children?: ReactNode;
    instance: AnalyticsInstance;
  }> {}
}

declare module "node-ip" {}
