import { Box, Container, Stack } from "@mui/material";
import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";
import SummandIntro from "@/src/sections/intro/summand-intro";
import HowToInstall from "@/src/sections/intro/how-to-install";
import WhatIsSummand from "@/src/sections/intro/what-is-summand";
import HowItWorks from "@/src/sections/intro/how-it-works";
import Features from "@/src/sections/intro/features";
import WhatPeopleSay from "@/src/sections/intro/what-people-say";

// ----------------------------------------------------------------------

const IndexLayout = dynamic(() => import("../src/layouts/index"));

export default function AppView() {
  const pathname = usePathname()?.replace("/", "");

  const Layout = IndexLayout;

  return (
    <Layout>
      <Container maxWidth="lg">
        <Stack direction="column">
          <SummandIntro></SummandIntro>
          <Stack sx={{ marginTop: 15 }}>
            <HowToInstall></HowToInstall>
          </Stack>
          <Stack sx={{ marginTop: 20 }}>
            <WhatIsSummand></WhatIsSummand>
          </Stack>
          <Stack sx={{ marginTop: 25 }}>
            <HowItWorks></HowItWorks>
          </Stack>
          <Stack sx={{ marginTop: 25 }}>
            <Features></Features>
          </Stack>
        </Stack>
      </Container>
      <Stack sx={{ marginTop: 20, marginBottom: 10 }}>
        <WhatPeopleSay></WhatPeopleSay>
      </Stack>
    </Layout>
  );
}
