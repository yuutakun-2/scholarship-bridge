import { Box, Typography, IconButton, Button } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";

import { useNavigate } from "react-router";
import { useApp } from "../../AppProvider";

export default function Profile() {
  const { isDark, auth, setAuth } = useApp();
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
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
        <PersonIcon
          fontSize="large"
          sx={{
            color: "white",
          }}
        />
      </IconButton>
      <Typography
        variant="h6"
        sx={{
          fontWeight: "bold",
        }}
      >
        {auth ? auth.name : "Guest User"}
      </Typography>
      <Box
        sx={{
          display: "flex",
          gap: 2,
        }}
      >
        {auth ? (
          <Button
            variant="contained"
            onClick={() => {
              setAuth(null);
              localStorage.removeItem("token");
              localStorage.removeItem("user");
            }}
            sx={{
              backgroundColor: isDark ? "dark.main" : "light.main",
              color: "white",
            }}
          >
            Logout
          </Button>
        ) : (
          <Box
            sx={{
              display: "flex",
              gap: 2,
            }}
          >
            <Button
              variant="contained"
              onClick={() => navigate("/login")}
              sx={{
                backgroundColor: isDark ? "dark.main" : "light.main",
                color: "white",
              }}
            >
              Login
            </Button>
            <Button
              variant="outlined"
              onClick={() => navigate("/register")}
              sx={{
                backgroundColor: isDark ? "dark.main" : "light.main",
                color: "white",
              }}
            >
              Register
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
}
