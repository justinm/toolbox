/// <reference types="react-scripts" />

declare module "calculator-types" {
  import { FunctionComponent, ReactNode } from "react";

  export interface GeoIPResponse {
    readonly asn: string;
    readonly asn_number: number;
    readonly asn_org: string;
    readonly city: string;
    readonly connection_type: string;
    readonly continent_code: string;
    readonly continent_name: string;
    readonly country_code: string;
    readonly country_name: string;
    readonly currency_code: string;
    readonly currency_name: string;
    readonly district: string;
    readonly hostname: string;
    readonly ip: string;
    readonly isp: string;
    readonly latitude: number;
    readonly longitude: number;
    readonly org: string;
    readonly postal_code: string;
    readonly premium: boolean;
    readonly region: string;
    readonly success: boolean;
    readonly timezone_name: string;
  }

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

interface Window {
  _onGeoDataCallback?: (data: GeoIPResponse) => void;
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
