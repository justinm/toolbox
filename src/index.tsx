import * as React from "react";
import * as ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import Analytics from "analytics";
import googleAnalytics from "@analytics/google-analytics";
import doNotTrack from "analytics-plugin-do-not-track";
import { AnalyticsProvider } from "use-analytics";
import "./index.css";
import { HistoryProvider } from "./providers/history";
import { ReportHandler } from "web-vitals";
import { QueryHistoryProvider } from "./providers/query-history";
import { SearchParamsProvider } from "./utils/searchParams";
import { GeoipProvider } from "./providers/geoip-provider";
import { StorageProvider } from "./providers/storage-provider";

const measurementIds: string[] = ["G-Y95CW6KTF5"];

const plugins = [doNotTrack()];

if (measurementIds.length) {
  plugins.push(
    googleAnalytics({
      measurementIds,
    })
  );
}

const analytics = Analytics({
  app: "devtoolbox",
  plugins,
});

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <StorageProvider>
      <AnalyticsProvider instance={analytics}>
        <HistoryProvider>
          <SearchParamsProvider>
            <QueryHistoryProvider>
              <GeoipProvider>
                <App />
              </GeoipProvider>
            </QueryHistoryProvider>
          </SearchParamsProvider>
        </HistoryProvider>
      </AnalyticsProvider>
    </StorageProvider>
  </React.StrictMode>
);

const reportHandler: ReportHandler = ({ id, name, value }) => {
  analytics
    .track("ga", {
      eventCategory: "Web Vitals",
      eventAction: name,
      eventValue: Math.round(name === "CLS" ? value * 1000 : value), // values must be integers
      eventLabel: id, // id unique to current page load
      nonInteraction: true, // avoids affecting bounce rate
    })
    .catch(console.error);
};

reportWebVitals(reportHandler);
