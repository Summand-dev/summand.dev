import PropTypes from "prop-types";

import Tooltip from "@mui/material/Tooltip";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import Popover from "@mui/material/Popover";
import MenuItem from "@mui/material/MenuItem";

import Iconify from "src/components/iconify";
import { useState } from "react";

// ----------------------------------------------------------------------

export default function UserTableToolbar({
  numSelected,
  filterName,
  onFilterName,
  onDeleteSelected,
  onDownloadRequest,
}) {
  const [open, setOpen] = useState(false);

  return (
    <Toolbar
      sx={{
        height: 80,
        display: "flex",
        justifyContent: "space-between",
        p: (theme) => theme.spacing(0, 1, 0, 3),
        ...(numSelected > 0 && {
          color: "primary.main",
          bgcolor: "primary.lighter",
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography component="div" variant="subtitle1">
          {numSelected} selected
        </Typography>
      ) : (
        <OutlinedInput
          value={filterName}
          onChange={onFilterName}
          placeholder="Search users ..."
          sx={{
            height: 40,
          }}
          startAdornment={
            <InputAdornment position="start">
              <Iconify
                icon="eva:search-fill"
                sx={{ color: "text.disabled", width: 20, height: 20 }}
              />
            </InputAdornment>
          }
        />
      )}

      {numSelected > 0 ? (
        <Tooltip title="Remove selected">
          <IconButton onClick={onDeleteSelected}>
            <Iconify icon="eva:trash-2-fill" />
          </IconButton>
        </Tooltip>
      ) : (
        <Box>
          <Tooltip title="Fetch data">
            <IconButton
              onClick={(event) => {
                setOpen(event.currentTarget);
              }}
            >
              <Iconify icon="ri:download-cloud-2-line" />
            </IconButton>
          </Tooltip>
          <Popover
            open={!!open}
            anchorEl={open}
            onClose={() => setOpen(false)}
            anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
            transformOrigin={{ vertical: "top", horizontal: "left" }}
            PaperProps={{
              sx: { width: 140 },
            }}
          >
            <MenuItem
              onClick={() => {
                onDownloadRequest("csv");
              }}
              dir="rtl"
            >
              <Iconify icon="tabler:csv" sx={{ mr: 2 }} />
              Excel
            </MenuItem>

            <MenuItem
              onClick={() => {
                onDownloadRequest("json");
              }}
              dir="rtl"
            >
              <Iconify icon="tabler:json" sx={{ mr: 2 }} />
              Javascript
            </MenuItem>

            <MenuItem
              onClick={() => {
                onDownloadRequest("xml");
              }}
              dir="rtl"
            >
              <Iconify icon="carbon:xml" sx={{ mr: 2 }} />
              Structured
            </MenuItem>

            <MenuItem
              onClick={() => {
                onDownloadRequest("txt");
              }}
              dir="rtl"
            >
              <Iconify icon="tabler:txt" sx={{ mr: 2 }} />
              Text
            </MenuItem>
          </Popover>
        </Box>
      )}
    </Toolbar>
  );
}

UserTableToolbar.propTypes = {
  numSelected: PropTypes.number,
  filterName: PropTypes.string,
  onFilterName: PropTypes.func,
};
