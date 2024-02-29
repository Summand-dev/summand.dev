import { useTheme } from "@emotion/react";
import { Container, Stack, Typography } from "@mui/material";
import styles from "@/styles/Index.module.css";
import GradientCard from "@/src/components/card/gradient-card";
import Image from "next/image";
import withoutImage from "@/public/images/without.gif";
import withImage from "@/public/images/with.gif";

export default function WhatIsSummand() {
  const theme = useTheme();
  return (
    <Container maxWidth="lg">
      <Stack direction="column" alignItems="center" spacing={4}>
        <Typography variant="h4" color="text.primary" textAlign="center">
          What is summand?
        </Typography>
        <Typography variant="caption" color="text.primary" textAlign="center">
          A command line interface that uses natural language processing to
          understand and execute commands in plain English. This would make it
          easier for non-technical users to interact with the command line and
          perform tasks without needing to memorize specific commands or syntax.
          Additionally, it could incorporate machine learning algorithms to
          suggest commands based on previous usage patterns and context.
        </Typography>
        <Stack
          direction={{
            xs: "column",
            md: "row",
          }}
          spacing={5}
          width={1}
        >
          <Stack
            sx={{ flexGrow: 1 }}
            width={1}
            direction="column"
            spacing={3}
            alignItems="center"
          >
            <Typography
              variant="body1"
              color="text.primary"
              textAlign="center"
              sx={{ fontWeight: "bold" }}
            >
              Without Summand
            </Typography>
            <Stack sx={{ width: 1 }}>
              <GradientCard borderRadius={3} aspectRatio={16 / 11}>
                <Image alt="without summand" src={withoutImage} fill></Image>
              </GradientCard>
            </Stack>
          </Stack>
          <Stack
            sx={{ flexGrow: 1 }}
            width={1}
            direction="column"
            spacing={3}
            alignItems="center"
          >
            <Typography
              variant="body1"
              color="text.primary"
              textAlign="center"
              sx={{ fontWeight: "bold" }}
            >
              With Summand
            </Typography>
            <Stack sx={{ width: 1 }}>
              <GradientCard borderRadius={3} aspectRatio={16 / 11}>
                <Image alt="without summand" src={withImage} fill></Image>
              </GradientCard>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Container>
  );
}
