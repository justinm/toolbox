import React, { FunctionComponent, ReactNode } from "react";
import { useStorage } from "./storage-provider";
import { Axios } from "axios";

export interface IGeoIpContext {
  readonly getGeoData?: () => Promise<GeoIPResponse | undefined>;
  readonly acceptTerms: () => void;
}

export interface GeoIPResponse {}

export const GeoIpContext = React.createContext<IGeoIpContext>({
  acceptTerms: () => {},
});

export interface GeoIpProviderProps {
  readonly children: ReactNode;
}

export const GeoipProvider: FunctionComponent<GeoIpProviderProps> = ({
  children,
}) => {
  const { getKey, setKey } = useStorage();
  const [ready, setReady] = React.useState(false);
  const [client, setClient] = React.useState<Axios | undefined>(undefined);

  const createClient = React.useCallback(() => new Axios(), []);
  const acceptTerms = React.useCallback(() => {
    setClient(createClient());
    void setKey("accept-external-connections", true);
  }, [setKey, setClient, createClient]);

  React.useEffect(() => {
    getKey("accept-external-connections")
      .then((accept) => {
        if (accept) {
          acceptTerms();
        }
        setReady(true);
      })
      .catch(() => setReady(true));
  }, [acceptTerms, getKey, setReady]);

  const getGeoData = React.useCallback(async () => {
    if (client) {
      return (await client.get(
        "https://json.geoiplookup.io/"
      )) as GeoIPResponse;
    }
  }, [client]);

  if (!ready) {
    return null;
  }

  return (
    <GeoIpContext.Provider
      value={{ getGeoData: client ? getGeoData : undefined, acceptTerms }}
    >
      {children}
    </GeoIpContext.Provider>
  );
};

export const useGeoIp = () => {
  return React.useContext(GeoIpContext);
};
