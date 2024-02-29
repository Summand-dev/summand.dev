import { Box } from "@mui/material";
import { usePWAStore, pages } from "../../src/hooks/use-pwa";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import dynamic from "next/dynamic";

// ----------------------------------------------------------------------

const DashboardLayout = dynamic(() => import("@/src/layouts/dashboard"), {
  ssr: false,
});

export default function AppView() {
  const page = usePWAStore((state) => state.page);
  const setPage = usePWAStore((state) => state.setPage);
  const pathname = usePathname()?.replace("/", "");

  const Layout = DashboardLayout;

  useEffect(() => {
    setPage(pathname, "");
  }, []);

  return (
    <Layout>
      <Box component={pages[page].component}></Box>
    </Layout>
  );
}
