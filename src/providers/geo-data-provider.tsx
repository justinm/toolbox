import React, { FunctionComponent, ReactNode } from "react";
import { useStorageKey } from "./storage-provider";
import { GeoIPResponse } from "calculator-types";

export interface IGeoDataContext {
  readonly geoData?: GeoIPResponse;
  readonly geoError?: Error;
  readonly loadGeoData?: () => void;
  readonly acceptTerms: () => void;
}

export const GeoDataContext = React.createContext<IGeoDataContext>({
  acceptTerms: () => {},
});

export interface GeoDataProviderProps {
  readonly children: ReactNode;
}

export const GeoDataProvider: FunctionComponent<GeoDataProviderProps> = ({
  children,
}) => {
  const [ready, setReady] = React.useState(false);
  const [needed, setNeeded] = React.useState(false);
  const [error, setError] = React.useState<Error | undefined>(undefined);
  const [timer, setTimer] = React.useState<NodeJS.Timeout | undefined>(
    undefined
  );
  const [accepted, setAccepted, acceptedReady] = useStorageKey<boolean>(
    "accept-external-connections"
  );
  const [geoData, setGeoData, geoDataReady] =
    useStorageKey<GeoIPResponse>("geo-data");

  const acceptTerms = React.useCallback(() => {
    setAccepted(true);
  }, [setAccepted]);

  const onGeoDataCallback = React.useCallback(
    (data: GeoIPResponse) => {
      setGeoData(data);
      clearTimeout(timer);
    },
    [setGeoData, timer]
  );

  React.useEffect(() => {
    window._onGeoDataCallback = onGeoDataCallback;
  }, [onGeoDataCallback]);

  React.useEffect(() => {
    if (acceptedReady && geoDataReady) {
      setReady(true);
    }
  }, [acceptedReady, geoDataReady]);

  React.useEffect(() => {
    if (ready && needed && !timer) {
      const _timer = setTimeout(() => {
        setError(new Error("Timeout after 3000 seconds"));
      }, 3000);

      setTimer(_timer);

      return () => clearTimeout(_timer);
    }
  }, [ready, setTimer, needed, geoData, timer]);

  React.useEffect(() => {
    if (ready && needed && timer) {
      const script = document.createElement("script");

      script.src = "https://json.geoiplookup.io/?callback=_onGeoDataCallback";
      script.async = true;

      console.log("Requesting Geo Data");

      document.body.appendChild(script);

      return () => void document.body.removeChild(script);
    }
  }, [ready, needed, timer]);

  const loadGeoData = React.useCallback(() => {
    if (!needed && accepted) {
      setNeeded(true);
    }
  }, [accepted, needed]);

  return (
    <GeoDataContext.Provider
      value={{
        acceptTerms,
        geoError: error && !geoData ? error : undefined,
        geoData: needed ? geoData : undefined,
        loadGeoData: accepted ? loadGeoData : undefined,
      }}
    >
      {children}
    </GeoDataContext.Provider>
  );
};

export const useGeoData = () => {
  return React.useContext(GeoDataContext);
};
