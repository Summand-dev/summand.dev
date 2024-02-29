import { useTheme } from "@emotion/react";
import { Box, Card, Container, Stack, Typography } from "@mui/material";
import styles from "@/styles/Index.module.css";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { bgBlur } from "@/src/theme/css";
import { useMemo } from "react";

export default function WhatPeopleSay() {
  const theme = useTheme();
  const comments = useMemo(() => {
    return [
      {
        name: "Katia",
        text: `Open-source products have become increasingly popular in
                  recent years due to their accessibility and affordability.
                  These products are developed by a community of developers who
                  work collaboratively to create software that is free and open
                  to the public.`,
      },
      {
        name: "Katia",
        text: `Open-source products have become increasingly popular in
                  recent years due to their accessibility and affordability.
                  These products are developed by a community of developers who
                  work collaboratively to create software that is free and open
                  to the public.`,
      },
      {
        name: "Katia",
        text: `Open-source products have become increasingly popular in
                  recent years due to their accessibility and affordability.
                  These products are developed by a community of developers who
                  work collaboratively to create software that is free and open
                  to the public.`,
      },
      {
        name: "Katia",
        text: `Open-source products have become increasingly popular in
                  recent years due to their accessibility and affordability.
                  These products are developed by a community of developers who
                  work collaboratively to create software that is free and open
                  to the public.`,
      },
      {
        name: "Katia",
        text: `Open-source products have become increasingly popular in
                  recent years due to their accessibility and affordability.
                  These products are developed by a community of developers who
                  work collaboratively to create software that is free and open
                  to the public.`,
      },
    ];
  }, []);
  return (
    <Container maxWidth="xl">
      <Stack direction="column" width={1} alignItems="center" spacing={5}>
        <Typography variant="h4" color="text.primary" textAlign="center">
          What people say
        </Typography>
        <Stack width={1}>
          <Splide
            aria-label="People comments about summand"
            options={{
              type: "loop",
              perPage: 3,
              focus: "center",
              pagination: false,
              snap: true,
              trimSpace: true,
              breakpoints: {
                800: {
                  perPage: 1,
                },
              },
            }}
          >
            {comments.map((comment, index) => (
              <SplideSlide key={index}>
                <Card
                  sx={{
                    margin: 2,
                    border: 1,
                    borderColor: theme.palette.background.neutral,
                    borderRadius: 2,
                    ...bgBlur({
                      color: theme.palette.background.paper,
                      opacity: 0.5,
                      blur: 7,
                    }),
                  }}
                >
                  <Stack sx={{ padding: 4 }}>
                    <Typography
                      variant="body1"
                      color="text.primary"
                      textAlign="center"
                    >
                      {comment.name}
                    </Typography>

                    <Typography
                      variant="body2"
                      color="text.primary"
                      textAlign="center"
                    >
                      {comment.text}
                    </Typography>
                  </Stack>
                  <Box
                    className="blur"
                    sx={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: 1,
                      height: 1,
                      ...bgBlur({
                        color: theme.palette.background.paper,
                        opacity: 0.4,
                        blur: 2,
                      }),
                    }}
                  ></Box>
                </Card>
              </SplideSlide>
            ))}
          </Splide>
        </Stack>
      </Stack>
    </Container>
  );
}
