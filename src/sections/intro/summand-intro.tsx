import Iconify from "@/src/components/iconify";
import { useTheme } from "@emotion/react";
import { Stack, Typography, Button, Divider } from "@mui/material";
import styles from "@/styles/Index.module.css";
import { useEffect, useState } from "react";
import { getRelease, getRepo } from "@/src/api/github";
import Link from "@mui/material/Link";
import { useThemeStore } from "@/src/hooks/use-theme";

export default function SummandIntro() {
  const theme = useTheme();
  const [stargazers, setStargazers] = useState(0);
  const [release, setRelease] = useState({
    name: "No Release",
    link: "https://github.com/Summand-dev/Summand",
  });
  const isDark = useThemeStore((state) => state.dark);

  useEffect(() => {
    getRepo("Summand-dev/Summand").then((repo) => {
      setStargazers(repo.stargazers_count);
    });
    getRelease("Summand-dev/Summand").then((releases) => {
      if (releases.length > 0) {
        setRelease(releases[0]);
      }
    });
  }, []);

  return (
    <Stack justifyItems="center" sx={{ zIndex: 5 }}>
      <Stack direction="column" justifyItems="center" alignItems="center">
        <Typography
          variant="h1"
          color="text.primary"
          textAlign="center"
          className={isDark ? styles.summand : styles.summandLight}
          sx={{
            fontSize: {
              xs: "50px!important",
              sm: "80px!important",
              md: "110px!important",
            },
            fontWeight: "extrabold",
          }}
        >
          Summand
        </Typography>
        <Typography
          variant="h2"
          color="text.primary"
          textAlign="center"
          sx={{
            fontSize: "17px!important",
            fontWeight: "normal",
          }}
        >
          Next generation command-line automation.
        </Typography>
        <Stack direction="row" spacing={4} marginTop={8}>
          <Button
            size="large"
            variant="outlined"
            color="primary"
            sx={{ paddingX: 4 }}
          >
            <Stack direction="row" spacing={1} alignItems="center">
              <Iconify
                icon="mingcute:star-line"
                width={25}
                color="text.primary"
              ></Iconify>
              <Typography variant="body1" color="text.primary">
                {stargazers} Starts
              </Typography>
            </Stack>
          </Button>
          <Button
            size="large"
            variant="contained"
            color="primary"
            sx={{ paddingX: 4 }}
          >
            <Stack direction="row" spacing={1} alignItems="center">
              <Typography variant="body1">Read docs</Typography>
              <Iconify icon="flowbite:arrow-right-outline"></Iconify>
            </Stack>
          </Button>
        </Stack>
        <Stack
          direction="row"
          className={styles.rounded}
          spacing={3}
          alignItems="center"
          sx={{
            marginTop: 7,
            paddingX: 4,
            paddingY: 3,
            border: 1,
            borderColor: theme.palette.background.neutral,
            backgroundColor: theme.palette.background.paper,
          }}
        >
          <Typography variant="body1" color="text.primary">
            {release.name}
          </Typography>
          <Divider orientation="vertical" variant="middle" flexItem />
          <Button variant="text" color="primary">
            <Link
              rel="noopener"
              href={release.link}
              underline="none"
              target="_blank"
              variant="body1"
              color="text.secondary"
            >
              See what's new
            </Link>
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
}
