import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function ConfigmDialog(props: {
  title: string;
  message: string;
  value: boolean;
  onChange: any;
  onAccept: any;
  onReject: any;
  data: any;
}) {
  return (
    <React.Fragment>
      <Dialog
        dir="rtl"
        open={props.value}
        onClose={props.onChange}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{props.title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {props.message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="info" onClick={() => props.onReject(props.data)}>
            Cancel
          </Button>
          <Button
            color="error"
            onClick={() => props.onAccept(props.data)}
            autoFocus
          >
            Accept
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
