import { useTheme } from "@emotion/react";
import { Box, Card, Container, Grid, Stack, Typography } from "@mui/material";
import architecture from "@/public/images/how.png";
import MultiGradientCard from "@/src/components/card/multi-gradient-card";
import styles from "@/styles/Index.module.css";
import Image from "next/image";

export default function HowItWorks() {
  const theme = useTheme();
  return (
    <Container maxWidth="lg">
      <Stack direction="column" alignItems="center" spacing={5}>
        <Typography variant="h4" color="text.primary" textAlign="center">
          How it works
        </Typography>
        <Grid container direction="row" spacing={0} alignItems="center">
          <Grid item xs={12} md={6} alignItems="center">
            <Stack
              direction="column"
              height={220}
              width={1}
              sx={{
                flexGrow: 1,
                position: "relative",
                aspectRatio: 12 / 12,
              }}
            >
              <Image
                alt="summand architecture"
                src={architecture}
                fill
                style={{
                  objectFit: "contain",
                }}
              ></Image>
            </Stack>
          </Grid>
          <Grid item xs={12} md={6} alignItems="center" paddingTop={10}>
            <MultiGradientCard>
              <Stack sx={{ padding: 4 }}>
                <Typography
                  variant="body2"
                  color="text.primary"
                  textAlign="center"
                >
                  A command line interface that uses natural language processing
                  to understand and execute commands in plain English. This
                  would make it easier for non-technical users to interact with
                  the command line and perform tasks without needing to memorize
                  specific commands or syntax. Additionally, it could
                  incorporate machine learning algorithms to suggest commands
                  based on previous usage patterns and context.
                </Typography>
              </Stack>
            </MultiGradientCard>
          </Grid>
        </Grid>
      </Stack>
    </Container>
  );
}
