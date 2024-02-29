import { useState } from "react";

import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import Popover from "@mui/material/Popover";
import { alpha } from "@mui/material/styles";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { useAuthStore } from "../../../hooks/use-auth";
import { useRouter } from "next/router";
import { roleNames } from "../../../utils/enum";
import { usePWAStore } from "../../../hooks/use-pwa";

// ----------------------------------------------------------------------

const MENU_OPTIONS = [
  {
    label: "Dashboard",
    page: "",
    icon: "eva:home-fill",
  },
  {
    label: "Settings",
    page: "setting",
    icon: "eva:settings-2-fill",
  },
];

// ----------------------------------------------------------------------

export default function AccountPopover() {
  const [open, setOpen] = useState(null);

  const user = useAuthStore((state) => state.user);
  const clearToken = useAuthStore((state) => state.clearToken);
  const router = useRouter();
  const setPage = usePWAStore((state) => state.setPage);

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const logout = () => {
    handleClose();
    clearToken();
    router.replace("/login");
  };

  return (
    <>
      <IconButton
        onClick={handleOpen}
        sx={{
          width: 40,
          height: 40,
          background: (theme) => alpha(theme.palette.grey[500], 0.08),
          ...(open && {
            background: (theme) =>
              `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
          }),
        }}
      >
        <Avatar
          src="/assets/images/avatars/avatar_25.jpg"
          alt={user?.name}
          sx={{
            width: 36,
            height: 36,
            border: (theme) => `solid 2px ${theme.palette.background.default}`,
          }}
        >
          {user?.name.charAt(0)}
        </Avatar>
      </IconButton>

      <Popover
        dir="rtl"
        open={!!open}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        PaperProps={{
          sx: {
            p: 0,
            mt: 1,
            ml: 0.75,
            width: 200,
          },
        }}
      >
        <Box sx={{ my: 1.5, px: 2 }}>
          <Typography variant="subtitle2" noWrap>
            {user?.name}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }} noWrap>
            {roleNames[user?.role]}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: "dashed" }} />

        {MENU_OPTIONS.map((option) => (
          <MenuItem
            key={option.label}
            onClick={() => {
              setPage(option.page);
              handleClose();
            }}
          >
            {option.label}
          </MenuItem>
        ))}

        <Divider sx={{ borderStyle: "dashed", m: 0 }} />

        <MenuItem
          disableRipple
          disableTouchRipple
          onClick={logout}
          sx={{ typography: "body2", color: "error.main", py: 1.5 }}
        >
          خروج
        </MenuItem>
      </Popover>
    </>
  );
}
