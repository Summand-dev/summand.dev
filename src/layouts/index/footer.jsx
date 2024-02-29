import Iconify from "@/src/components/iconify/iconify";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { FOOTER } from "./config-layout";
import { useTheme } from "@emotion/react";
import { useMemo } from "react";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";

export default function Footer() {
  const theme = useTheme();

  const icons = useMemo(() => {
    return [
      { name: "github", icon: "mingcute:github-line" },
      { name: "discord", icon: "ri:discord-line" },
      { name: "telegram", icon: "basil:telegram-outline" },
    ];
  }, []);

  const links = useMemo(() => {
    return [
      { name: "About", link: "" },
      { name: "Releases", link: "" },
      { name: "Docs", link: "" },
      { name: "Copyright", link: "" },
      { name: "Source", link: "" },
      { name: "Builder", link: "" },
    ];
  }, []);

  return (
    <Container
      maxWidth="xl"
      sx={{
        border: 1,
        borderColor: theme.palette.background.neutral,
        backgroundColor: theme.palette.background.paper,
        borderTopLeftRadius: FOOTER.B_RADIUS,
        borderTopRightRadius: FOOTER.B_RADIUS,
      }}
    >
      <Container maxWidth="lg">
        <Stack
          spacing={4}
          direction="row"
          sx={{
            paddingTop: FOOTER.H_DESKTOP_OFFSET,
            paddingBottom: FOOTER.H_DESKTOP_OFFSET / 2,
          }}
        >
          <Stack direction="column" spacing={3}>
            <Typography color="text.primary">LOGO</Typography>
            <Stack direction="row" spacing={1}>
              {icons.map((icon, index) => (
                <IconButton
                  aria-label={icon.name}
                  key={index}
                  color="text.primary"
                >
                  <Iconify
                    icon={icon.icon}
                    key={icon.name}
                    width={25}
                  ></Iconify>
                </IconButton>
              ))}
            </Stack>
          </Stack>
          <Stack>
            <Grid container spacing={1} direction="row">
              {links.map((link, index) => (
                <Grid item xs={4} key={index}>
                  <Typography variant="caption" color="text.primary">
                    {link.name}
                  </Typography>
                </Grid>
              ))}
            </Grid>
          </Stack>
          <Stack sx={{ flexGrow: 1 }}></Stack>
          <Stack></Stack>
        </Stack>
        <Stack
          direction="row"
          sx={{ justifyContent: "center", marginBottom: 3 }}
        >
          <Typography variant="body2" color="text.primary">
            Made with <Iconify width={13} icon="mdi:heart"></Iconify> for
            Open-source world!
          </Typography>
        </Stack>
      </Container>
    </Container>
  );
}
