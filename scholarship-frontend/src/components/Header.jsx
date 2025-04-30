import { IconButton, Box, Typography } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import SearchIcon from "@mui/icons-material/Search";
import ThemeSwitcher from "./ThemeSwitcher";
import { useApp } from "../AppProvider";
import { useNavigate } from "react-router";

export default function Header() {
  const navigate = useNavigate();
  const { isDark, auth } = useApp();

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 2,
        width: "100%",
        position: "sticky",
        top: 0,
        zIndex: 1100,
        height: "64px",
        paddingX: { xs: 0, md: 2 },
        backgroundColor: "white",
      }}
    >
      <Typography
        variant="h6"
        sx={{
          fontWeight: "bold",
        }}
      >
        Scholarship-Bridge
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 2,
        }}
      >
        <IconButton
          sx={{
            borderRadius: "50%",
            backgroundColor: isDark ? "dark.main" : "light.main",
            padding: 1,
          }}
        >
          <SearchIcon
            sx={{
              color: "white",
            }}
            onClick={() => {
              navigate("/search");
            }}
          />
        </IconButton>
        <ThemeSwitcher />
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: 2,
            gap: 2,
          }}
        >
          <IconButton
            sx={{
              borderRadius: "50%",
              backgroundColor: isDark ? "dark.main" : "light.main",
              padding: 1,
            }}
            onClick={() => {
              navigate("/profile");
            }}
          >
            <PersonIcon
              sx={{
                color: "white",
              }}
            />
          </IconButton>
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              display: { xs: "none", md: "block" },
            }}
          >
            {auth ? auth.name : "Guest User"}
          </Typography>
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              display: { xs: "none", md: "block" },
            }}
            onClick={() => navigate("/admin/login")}
          >
            Route to Admin
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
