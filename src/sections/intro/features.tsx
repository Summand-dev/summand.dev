import { useTheme } from "@emotion/react";
import { Container, Stack, Typography, Grid } from "@mui/material";
import styles from "@/styles/Index.module.css";
import GradientCard from "@/src/components/card/gradient-card";
import Iconify from "@/src/components/iconify";
import { useMemo } from "react";

export default function Features() {
  const theme = useTheme();
  const features = useMemo(() => {
    return [
      {
        name: "Short Command",
        icon: "tabler:packages",
      },
      {
        name: "Easy to Learn",
        icon: "material-symbols:toys-and-games-outline",
      },
      { name: "Open Source", icon: "ri:open-source-line" },
      { name: "No Cost", icon: "mingcute:pig-money-line" },
    ];
  }, []);
  return (
    <Container maxWidth="lg">
      <Stack direction="column" alignItems="center" spacing={3}>
        <Typography variant="h4" color="text.primary" textAlign="center">
          Features
        </Typography>
        <Grid container justifyContent="center">
          {features.map((feature, index) => (
            <Grid item key={index}>
              <Stack
                sx={{
                  width: 130,
                  alignSelf: "center",
                  margin: 3,
                }}
              >
                <GradientCard>
                  <Stack
                    direction="column"
                    alignItems="center"
                    sx={{
                      backgroundColor: theme.palette.background.neutral,
                      paddingX: 2,
                      paddingY: 3,
                    }}
                    spacing={2}
                  >
                    <Iconify icon={feature.icon} width={40}></Iconify>
                    <Typography
                      variant="caption"
                      color="text.primary"
                      textAlign="center"
                    >
                      {feature.name}
                    </Typography>
                  </Stack>
                </GradientCard>
              </Stack>
            </Grid>
          ))}
        </Grid>
      </Stack>
    </Container>
  );
}
