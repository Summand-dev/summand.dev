import { useTheme } from "@emotion/react";
import {
  Container,
  Stack,
  Typography,
  Tabs,
  Tab,
  Divider,
  Button,
} from "@mui/material";
import styles from "@/styles/Index.module.css";
import { SyntheticEvent, useMemo, useRef, useState } from "react";
import Iconify from "@/src/components/iconify";
import { copyToClipboard } from "@/src/utils/clipboard";

export default function HowToInstall() {
  const theme = useTheme();
  const [copied, setCopied] = useState(false);
  const [value, setValue] = useState(0);
  const copyTimeout = useRef<any>();
  const command = useMemo(() => {
    return [
      "chocolaty install summand",
      "brew install summand",
      "apt install summand",
      "pip install summand",
    ][value];
  }, [value]);
  const handleChange = (event: SyntheticEvent, newValue: number) => {
    if (copyTimeout.current) {
      clearTimeout(copyTimeout.current);
    }
    setCopied(false);
    setValue(newValue);
  };
  const copyCommand = () => {
    copyToClipboard(command);
    setCopied(true);
    if (copyTimeout.current) {
      clearTimeout(copyTimeout.current);
    }
    copyTimeout.current = setTimeout(() => {
      setCopied(false);
    }, 5000);
  };
  return (
    <Container maxWidth="lg">
      <Stack direction="column" alignItems="center" spacing={2}>
        <Typography variant="h4" color="text.primary" textAlign="center">
          How to install
        </Typography>
        <Stack>
          <Tabs
            value={value}
            onChange={handleChange}
            textColor="inherit"
            indicatorColor="primary"
            aria-label="installation guide tabs"
          >
            <Tab label="Windows" />
            <Tab label="Mac" />
            <Tab label="Linux" />
            <Tab label="Pip" />
          </Tabs>
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
            {command}
          </Typography>
          <Button
            onClick={copyCommand}
            size="small"
            variant="outlined"
            color={copied ? "success" : "primary"}
            sx={{ margin: 0 }}
          >
            <Stack direction="row" alignItems="center" spacing={1}>
              <Iconify icon="gravity-ui:copy"></Iconify>
              <Typography variant="body1">
                {copied ? "Copied" : "Copy"}
              </Typography>
            </Stack>
          </Button>
        </Stack>
      </Stack>
    </Container>
  );
}
