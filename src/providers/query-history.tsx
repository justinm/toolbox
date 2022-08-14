import React, { FunctionComponent, ReactNode } from "react";
import { useSearchParams } from "../utils/searchParams";
import { useStorage } from "./storage-provider";

export interface HistoryEntry {
  readonly query: string;
  readonly time: number;
}

export interface IQueryHistoryContext {
  readonly history: HistoryEntry[];
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
  const { setKey, getKey } = useStorage();
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

        void setKey("history", newHistory);
      }
    },
    [history, setKey]
  );

  React.useEffect(() => {
    if (!history) {
      getKey("history")
        .then((h) => {
          setHistory((h as HistoryEntry[]) ?? []);
        })
        .catch(() => setHistory([]));
    }

    if (history && !ready) {
      const passedInQuery = params.get("q");

      if (passedInQuery && passedInQuery !== "") {
        push(passedInQuery);
      }

      setReady(true);
    }
  }, [params, history, ready, push, getKey, setParam]);

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
