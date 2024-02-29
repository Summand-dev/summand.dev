import { useEffect, useState } from "react";
import PropTypes from "prop-types";

import Box from "@mui/material/Box";

import Nav from "./nav";
import Main from "./main";
import Header from "./header";
import { useAuthStore } from "../../hooks/use-auth";
import { useRouter } from "next/router";

// ----------------------------------------------------------------------

export default function DashboardLayout({ children }) {
  const [openNav, setOpenNav] = useState(false);

  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated()) {
      router.replace("/login");
    }
  }, []);

  if (isAuthenticated()) {
    return (
      <>
        <Header onOpenNav={() => setOpenNav(true)} />

        <Box
          sx={{
            minHeight: 1,
            display: "flex",
            flexDirection: { xs: "column", lg: "row" },
          }}
        >
          <Main>{children}</Main>
          <Nav openNav={openNav} onCloseNav={() => setOpenNav(false)} />
        </Box>
      </>
    );
  } else {
    return <></>;
  }
}

DashboardLayout.propTypes = {
  children: PropTypes.node,
};
