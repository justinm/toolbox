import React, { FunctionComponent } from "react";
import { useGeoData } from "../../providers/geo-data-provider";
import { AllowGeoLookupDialog } from "./AllowGeoLookupDialog";
import { Box, Button } from "@mui/material";

export const AllowGeoLookupButton: FunctionComponent = () => {
  const { loadGeoData, acceptTerms } = useGeoData();
  const [open, setOpen] = React.useState(false);

  const onCloseClick = React.useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const onOpenClick = React.useCallback(() => {
    setOpen(true);
  }, [setOpen]);

  const onAcceptClick = React.useCallback(() => {
    acceptTerms();
    setOpen(false);
  }, [setOpen, acceptTerms]);

  if (loadGeoData) {
    return null;
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 5,
      }}
    >
      <AllowGeoLookupDialog
        open={open}
        onClose={onCloseClick}
        onAccept={onAcceptClick}
      />
      <Button variant="outlined" onClick={onOpenClick}>
        Load GeoIP Data
      </Button>
    </Box>
  );
};
