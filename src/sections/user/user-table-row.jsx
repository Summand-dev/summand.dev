import { useState } from "react";
import PropTypes from "prop-types";

import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import Popover from "@mui/material/Popover";
import TableRow from "@mui/material/TableRow";
import Checkbox from "@mui/material/Checkbox";
import MenuItem from "@mui/material/MenuItem";
import TableCell from "@mui/material/TableCell";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";

import Label from "src/components/label";
import Iconify from "src/components/iconify";
import { stringAvatar } from "../../utils/avatar";
import { roleColors, roleNames } from "../../utils/enum";

// ----------------------------------------------------------------------

export default function UserTableRow({
  selected,
  name,
  avatarUrl,
  username,
  role,
  status,
  handleClick,
  handleUpdateClick,
  handleDeleteClick,
  handleStatusClick,
}) {
  const [open, setOpen] = useState(null);

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleCloseMenuUpdate = () => {
    handleUpdateClick();
    handleCloseMenu();
  };

  const handleCloseMenuDelete = () => {
    handleDeleteClick();
    handleCloseMenu();
  };

  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        <TableCell padding="checkbox">
          {role != "admin" ? (
            <Checkbox disableRipple checked={selected} onChange={handleClick} />
          ) : (
            <></>
          )}
        </TableCell>

        <TableCell component="th" scope="row" padding="none">
          <Stack direction="row" alignItems="center" spacing={2}>
            {/* <Avatar alt={name} src={avatarUrl} /> */}
            <Avatar {...stringAvatar(name)} />
            <Typography variant="subtitle2" noWrap>
              {name}
            </Typography>
          </Stack>
        </TableCell>

        <TableCell>{username}</TableCell>

        <TableCell>
          <Label color={roleColors[role]}>{roleNames[role]}</Label>
        </TableCell>

        <TableCell>
          {role != "admin" ? (
            <ToggleButtonGroup
              color={(status == 0 && "error") || "success"}
              value={status}
              size="small"
              sx={{
                height: 30,
              }}
              exclusive
              onChange={() => handleStatusClick(status == 0 ? 1 : 0)}
              aria-label="Platform"
            >
              <ToggleButton
                sx={{
                  fontSize: 12,
                }}
                value={1}
              >
                active
              </ToggleButton>
              <ToggleButton
                sx={{
                  fontSize: 12,
                }}
                value={0}
              >
                inactive
              </ToggleButton>
            </ToggleButtonGroup>
          ) : (
            <></>
          )}
        </TableCell>

        <TableCell align="right">
          {role != "admin" ? (
            <IconButton onClick={handleOpenMenu}>
              <Iconify icon="eva:more-vertical-fill" />
            </IconButton>
          ) : (
            <></>
          )}
        </TableCell>
      </TableRow>

      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: "top", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        PaperProps={{
          sx: { width: 140 },
        }}
      >
        <MenuItem onClick={handleCloseMenuUpdate} dir="rtl">
          <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
          Update
        </MenuItem>

        <MenuItem
          onClick={handleCloseMenuDelete}
          sx={{ color: "error.main" }}
          dir="rtl"
        >
          <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>
    </>
  );
}

UserTableRow.propTypes = {
  avatarUrl: PropTypes.any,
  username: PropTypes.any,
  handleClick: PropTypes.func,
  name: PropTypes.any,
  role: PropTypes.any,
  selected: PropTypes.any,
  status: PropTypes.number,
};
