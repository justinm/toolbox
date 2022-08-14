import React, { FunctionComponent, ReactNode } from "react";

export type SavableType = {} | any[] | string | boolean | null | undefined;

export interface IStorageContext {
  readonly setKey: (key: string, value: SavableType) => Promise<void>;
  readonly getKey: (key: string) => Promise<SavableType | undefined>;
}

export const StorageContext = React.createContext<IStorageContext>({
  setKey: async () => {},
  getKey: async () => undefined,
});

export interface StorageProviderProps {
  readonly children: ReactNode;
}

export const StorageProvider: FunctionComponent<StorageProviderProps> = ({
  children,
}) => {
  const setKey = React.useCallback(async (key: string, value: SavableType) => {
    const recordData = JSON.stringify(value);

    if (value && value !== "") {
      sessionStorage.setItem(key, recordData);
    } else {
      sessionStorage.removeItem(key);
    }
  }, []);

  const getKey: IStorageContext["getKey"] = React.useCallback(
    async (key: string) => {
      const recordData = sessionStorage.getItem(key);

      try {
        if (recordData) {
          return JSON.parse(recordData);
        }
      } catch (err) {
        console.error(`Failed to recode persisted key: ${key}`);
      }

      return undefined;
    },
    []
  );

  return (
    <StorageContext.Provider value={{ setKey, getKey }}>
      {children}
    </StorageContext.Provider>
  );
};

export const useStorage = () => {
  return React.useContext(StorageContext);
};

export function useStorageKey<T extends SavableType>(
  key: string
): [T | undefined, (data: T) => void, boolean] {
  const [cache, setCache] = React.useState<T | undefined>(undefined);
  const [ready, setReady] = React.useState(false);
  const { getKey, setKey } = useStorage();

  React.useEffect(() => {
    getKey(key)
      .then((data) => {
        setCache(data as T);
        setReady(true);
      })
      .catch(() => setReady(true));
  }, [key, getKey, setCache, setReady]);

  const setData = React.useCallback(
    (data: SavableType) => {
      if (ready) {
        setCache(data as T);
        void setKey(key, data);
      }
    },
    [ready, setCache, key, setKey]
  );

  return [cache, setData, ready];
}
