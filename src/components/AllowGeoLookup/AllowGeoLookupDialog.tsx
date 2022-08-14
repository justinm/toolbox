import { FunctionComponent } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  useMediaQuery,
  useTheme,
} from "@mui/material";

export interface AllowExternalConnectionsDialogProps {
  readonly open: boolean;
  readonly onClose: () => void;
  readonly onAccept: () => void;
}

export const AllowGeoLookupDialog: FunctionComponent<
  AllowExternalConnectionsDialogProps
> = ({ open, onClose, onAccept }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Dialog fullScreen={fullScreen} open={open} onClose={onClose}>
      <DialogTitle id="responsive-dialog-title">
        {"Use geoiplookup.io service?"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          We use geoiplookup.io to help identify additional information about
          yourself, including IP address and geo location data. This means
          connecting to an external service that may collection additional data
          about you outside of our control.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={onClose}>
          Disagree
        </Button>
        <Button onClick={onAccept} autoFocus>
          Agree
        </Button>
      </DialogActions>
    </Dialog>
  );
};
