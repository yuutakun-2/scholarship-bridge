import { Box } from "@mui/material";
import { Outlet } from "react-router";
import AdminHeader from "../AdminHeader";
import AdminNavBar from "../AdminNavBar";

export default function AdminLayout() {
  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        position: "relative",
      }}
    >
      <AdminNavBar />

      <Box sx={{ flexGrow: 1 }}>
        <AdminHeader />

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
