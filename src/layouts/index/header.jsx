import PropTypes from "prop-types";

import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import { useResponsive } from "@/src/hooks/use-responsive";
import IconButton from "@mui/material/IconButton";
import Iconify from "@/src/components/iconify";
import Stack from "@mui/material/Stack";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { NAV, HEADER } from "./config-layout";
import { bgBlur } from "@/src/theme/css";
import Typography from "@mui/material/Typography";
import IndexStyles from "@/styles/Index.module.css";
import { useThemeStore } from "../../hooks/use-theme";
import Button from "@mui/material/Button";
import { useMemo } from "react";
import Container from "@mui/material/Container";

// ----------------------------------------------------------------------

export default function Header({ onOpenNav }) {
  const theme = useTheme();

  const lgUp = useResponsive("up", "lg");
  const [isDark, setDark] = useThemeStore((state) => [
    state.dark,
    state.setDark,
  ]);

  const navs = useMemo(() => {
    return [
      { title: "Explore" },
      { title: "Examples" },
      { title: "Docs" },
      { title: "Blog" },
      { title: "Builder" },
    ];
  }, []);

  const renderContent = (
    <>
      <Stack sx={{ width: 1 }} direction="row" alignItems="center" spacing={1}>
        <Stack
          direction="row"
          sx={{
            width: NAV.GROUP_WIDTH,
            justifyContent: "space-between",
          }}
        >
          <NavItem item={navs[0]}></NavItem>
          <NavItem item={navs[1]}></NavItem>
          <NavItem item={navs[2]}></NavItem>
        </Stack>
        <Stack sx={{ flexGrow: 1 }}></Stack>
        <Typography variant="body1" color="text.primary">
          LOGO
        </Typography>
        <Stack
          sx={{
            flexGrow: 1,
            display: {
              xs: "none",
              sm: "block",
            },
          }}
        ></Stack>
        <Stack
          direction="row"
          sx={{
            width: NAV.GROUP_WIDTH,
            justifyContent: "space-between",
            display: {
              xs: "none",
              sm: "flex",
            },
          }}
        >
          <NavItem item={navs[3]}></NavItem>
          <NavItem item={navs[4]}></NavItem>
          <Box>
            <IconButton
              variant="text"
              color="primary"
              onClick={() => setDark(!isDark)}
            >
              <Iconify icon="entypo:light-up" color="text.primary"></Iconify>
            </IconButton>
          </Box>
        </Stack>
      </Stack>
    </>
  );

  return (
    <AppBar
      position="sticky"
      color="transparent"
      sx={{
        margin: "auto",
        marginTop: HEADER.H_DESKTOP_OFFSET - 2,
        paddingTop: 2,
        boxShadow: "none",
        height: HEADER.H_MOBILE,
        zIndex: theme.zIndex.appBar + 1,
        transition: theme.transitions.create(["height"], {
          duration: theme.transitions.duration.shorter,
        }),
        ...(lgUp && {
          width: `calc(100% - ${NAV.WIDTH + 1}px)`,
          height: HEADER.H_DESKTOP,
        }),
      }}
    >
      <Container maxWidth="lg">
        <Toolbar
          sx={{
            border: 1,
            borderColor: theme.palette.background.neutral,
            borderRadius: HEADER.B_RADIUS,
            height: 1,
            width: 1,
            px: { lg: 5 },
            ...bgBlur({
              color: theme.palette.background.paper,
              opacity: 0.2,
              blur: 7,
            }),
          }}
        >
          {renderContent}
        </Toolbar>
      </Container>
    </AppBar>
  );
}

Header.propTypes = {
  onOpenNav: PropTypes.func,
};

function NavItem({ item }) {
  const active = false;

  return (
    <Button sx={{ minWidth: 0 }} variant="text" color="primary">
      <Typography variant="body1" color="text.primary">
        {item.title}
      </Typography>
    </Button>
  );
}

NavItem.propTypes = {
  item: PropTypes.object,
};
