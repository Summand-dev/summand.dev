import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Main from "./main";
import Header from "./header";
import Footer from "./footer";
import { useRouter } from "next/router";

export const viewport = {
  themeColor: 'black',
  initialScale: 1,
  width: "device-width",
  maximumScale: 1,
}

export default function IndexLayout({ children }) {
  const [openNav, setOpenNav] = useState(false);

  const router = useRouter();

  return (
    <>
      <div className="background-shapes">
        <Box
          sx={{
            position: "absolute",
            top: "-100vh",
            width: "200vh",
            height: "200vh",
            left: 0,
            opacity: 0.1,
            background: "rgb(147,37,103)",
            background:
              "radial-gradient(circle, rgba(144,48,219,1) 0%, rgba(144,48,219,1) 12%, rgba(0,0,0,0) 70%, rgba(0,0,0,0) 100%)",
          }}
        ></Box>
        <Box
          sx={{
            position: "absolute",
            top: "-110vh",
            right: 0,
            width: "180vh",
            height: "180vh",
            opacity: 0.1,
            background: "rgb(147,37,103)",
            background:
              "radial-gradient(circle, rgba(147,37,103,1) 0%, rgba(147,37,103,1) 5%, rgba(0,0,0,0) 70%, rgba(0,0,0,0) 100%)",
          }}
        ></Box>
      </div>
      <Header onOpenNav={() => setOpenNav(true)} />

      <Box
        sx={{
          minHeight: 1,
          display: "flex",
          flexDirection: { xs: "column", lg: "row" },
        }}
      >
        <Main>{children}</Main>
      </Box>

      <Footer></Footer>
    </>
  );
}

IndexLayout.propTypes = {
  children: PropTypes.node,
};
