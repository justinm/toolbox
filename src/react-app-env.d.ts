/// <reference types="react-scripts" />

declare module "calculator-types" {
  import { FunctionComponent, ReactNode } from "react";

  export interface Query extends FunctionComponent<{ readonly query: string }> {
    title: string;
    matcher: (query: string) => boolean;
  }

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

  export class AnalyticsProvider extends Component<{
    children?: ReactNode;
    instance: AnalyticsInstance;
  }> {}

  export function useAnalytics(): AnalyticsInstance;
}

declare module "node-ip" {}
