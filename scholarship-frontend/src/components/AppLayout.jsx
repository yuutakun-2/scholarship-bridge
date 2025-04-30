import { Box, useMediaQuery } from "@mui/material";
import { Outlet } from "react-router";

import Header from "./Header";
import NavBar from "./NavBar";

export default function AppLayout() {
  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        position: "relative",
        flexDirection: { xs: "column-reverse", md: "row" },
      }}
    >
      <NavBar />

      <Box sx={{ flexGrow: 1 }}>
        <Header />

        <Box
          sx={{
            overflowY: "auto",
            paddingX: 2,
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}
