import { Box, Typography } from "@mui/material";

import HomeIcon from "@mui/icons-material/Home";
import FaceRetouchingNaturalIcon from "@mui/icons-material/FaceRetouchingNatural";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import TipsAndUpdatesIcon from "@mui/icons-material/TipsAndUpdates";
import TurnedInIcon from "@mui/icons-material/TurnedIn";

import { useApp } from "../AppProvider";
import { useNavigate } from "react-router";

const navbaricons = [
  {
    icon: <HomeIcon />,
    label: "Home",
    link: "/",
  },
  {
    icon: <TipsAndUpdatesIcon />,
    label: "Tips & Tricks",
    link: "/tipsandtricks",
  },
  {
    icon: <FaceRetouchingNaturalIcon />,
    label: "AI Chatbot",
    link: "/aichatbot",
  },
  {
    icon: <TurnedInIcon />,
    label: "Saved",
    link: "/saved",
  },
  {
    icon: <AccountCircleIcon />,
    label: "Profile",
    link: "/profile",
  },
];

export default function NavBar({ isMobile }) {
  const { isDark } = useApp();
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "row", md: "column" },
        justifyContent: "space-between",
        alignItems: "center",
        padding: 1,
        // borderTop: isMobile ? "1px solid #ccc" : undefined,
        // borderRight: !isMobile ? "1px solid #ccc" : undefined,
        position: "sticky",
        // { xs: "column-reverse", md: "row" }
        bottom: { xs: "0", md: undefined },
        top: { xs: undefined, md: 0 },
        zIndex: 1200,
        width: { xs: "100%", md: "64px" },
        // height: isMobile ? "auto" : "100vh",
        height: { xs: "64px", md: "100vh" },
        background: "white",
      }}
    >
      {navbaricons.map((icon) => (
        <Box
          key={icon.label}
          sx={{
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
            flex: 1,
            paddingY: 1,
          }}
          onClick={() => navigate(icon.link)}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 1,
              color: isDark ? "dark.main" : "light.main",
            }}
          >
            {icon.icon}
          </Box>
        </Box>
      ))}
    </Box>
  );
}
