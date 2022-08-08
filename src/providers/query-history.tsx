import React, { FunctionComponent, ReactNode } from "react";
import { useSearchParams } from "../utils/searchParams";

export interface IQueryHistoryContext {
  readonly history: { query: string; time: number }[];
  readonly current: string;
  readonly push: (query: string) => void;
}

export const QueryHistoryContext = React.createContext<IQueryHistoryContext>({
  history: [],
  current: "",
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
  const { params, setParam } = useSearchParams();
  const [ready, setReady] = React.useState(false);

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

  React.useEffect(() => {
    if (!history) {
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
    }

    if (history && !ready) {
      const passedInQuery = params.get("q");

      if (passedInQuery && passedInQuery !== "") {
        push(passedInQuery);
      }

      setReady(true);
    }
  }, [params, history, ready, push, setParam]);

  const current = React.useMemo(
    () => (history && history[0]?.query) ?? "",
    [history]
  );

  React.useEffect(() => {
    if (ready) {
      if (params.get("q") !== current) {
        setParam("q", "");
      }
    }
  }, [ready, current, params, setParam]);

  React.useEffect(() => {
    console.log("Active Query:", current && current !== "" ? current : "None");
  }, [current]);

  if (!ready || !history) {
    return null;
  }

  return (
    <QueryHistoryContext.Provider value={{ current, history, push }}>
      {children}
    </QueryHistoryContext.Provider>
  );
};

export const useQueryHistory = () => {
  return React.useContext(QueryHistoryContext);
};
