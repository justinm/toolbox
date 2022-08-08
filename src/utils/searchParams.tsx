import React, { FunctionComponent, ReactNode } from "react";
import { useHistory } from "../providers/history";

export interface ISearchParamContext {
  readonly params: URLSearchParams;
  readonly setParam: (key: string, value: string) => void;
}

export const SearchParamContext = React.createContext<
  ISearchParamContext | undefined
>(undefined);

export interface SearchParamsProviderProps {
  readonly children: ReactNode;
}

export const SearchParamsProvider: FunctionComponent<
  SearchParamsProviderProps
> = ({ children }) => {
  const history = useHistory();
  const params = React.useMemo(
    () => new URLSearchParams(window.location.search),
    []
  );

  const setParam = React.useCallback(
    (key: string, value: string) => {
      if (!value || value === "") {
        params.delete(key);
      } else {
        params.set(key, value);
      }
      history.push({ search: params.toString() });
    },
    [params, history]
  );

  if (!params) {
    return null;
  }

  return (
    <SearchParamContext.Provider value={{ setParam, params }}>
      {children}
    </SearchParamContext.Provider>
  );
};

export const useSearchParams = () => {
  return React.useContext(SearchParamContext) as ISearchParamContext;
};
