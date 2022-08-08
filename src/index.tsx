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

const measurementIds: string[] = [];

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
    <QueryHistoryProvider>
      <HistoryProvider>
        <AnalyticsProvider instance={analytics}>
          <App />
        </AnalyticsProvider>
      </HistoryProvider>
    </QueryHistoryProvider>
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
