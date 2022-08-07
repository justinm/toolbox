import React, { FunctionComponent, ReactNode } from "react";
import * as history from "history";

export const HistoryContext = React.createContext<history.History | undefined>(
  undefined
);

export interface HistoryProviderProps {
  readonly children: ReactNode;
}

export const HistoryProvider: FunctionComponent<HistoryProviderProps> = ({
  children,
}) => {
  const [h] = React.useState(history.createBrowserHistory());

  return (
    <HistoryContext.Provider value={h}>{children}</HistoryContext.Provider>
  );
};

export const useHistory = () => {
  return React.useContext(HistoryContext) as history.History;
};
