import React from "react";
import { useHistory } from "../providers/history";

export const useSearchParams = () => {
  const history = useHistory();
  const params = React.useMemo(
    () => new URLSearchParams(window.location.search),
    [window.location.search]
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
    [params]
  );

  return { setParam, params };
};
