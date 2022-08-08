import React, { FunctionComponent, ReactNode } from "react";

export interface IQueryHistoryContext {
  readonly history: { query: string; time: number }[];
  readonly push: (query: string) => void;
}

export const QueryHistoryContext = React.createContext<IQueryHistoryContext>({
  history: [],
  push: () => {},
});

export interface QueryHistoryProviderProps {
  readonly children: ReactNode;
}

export const QueryHistoryProvider: FunctionComponent<
  QueryHistoryProviderProps
> = ({ children }) => {
  const [history, setHistory] = React.useState<
    { query: string; time: number }[] | undefined
  >();

  React.useEffect(() => {
    const h = window.sessionStorage.getItem("history");

    try {
      if (h && h !== "") {
        setHistory(JSON.parse(h));
      } else {
        setHistory([]);
      }
    } catch (err) {
      setHistory([]);
      console.error(err);
    }
  }, []);

  const push = React.useCallback(
    (query: string) => {
      if (history) {
        const prunedHistory = history.filter(
          (h) => h.query !== query && h.query
        );

        const newHistory = [
          { query: query ?? "", time: new Date().getTime() },
          ...prunedHistory.slice(0, 20),
        ];

        setHistory(newHistory);

        window.sessionStorage.setItem("history", JSON.stringify(newHistory));
      }
    },
    [history]
  );

  if (!history) {
    return null;
  }

  return (
    <QueryHistoryContext.Provider value={{ history, push }}>
      {children}
    </QueryHistoryContext.Provider>
  );
};

export const useQueryHistory = () => {
  return React.useContext(QueryHistoryContext);
};
