import { Box, IconButton } from "@mui/material";
import { useApp } from "../AppProvider";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import LightbulbOutlinedIcon from "@mui/icons-material/LightbulbOutlined";

export default function ThemeSwitcher() {
  const { isDark, setIsDark } = useApp();
  return (
    <Box>
      {isDark ? (
        <IconButton
          onClick={() => setIsDark(false)}
          sx={{
            borderRadius: "50%",
            backgroundColor: isDark ? "dark.main" : "light.main",
            padding: 1,
          }}
        >
          <LightbulbIcon sx={{ color: "white" }} />
        </IconButton>
      ) : (
        <IconButton
          onClick={() => setIsDark(true)}
          sx={{
            borderRadius: "50%",
            backgroundColor: isDark ? "dark.main" : "light.main",
            padding: 1,
          }}
        >
          <LightbulbOutlinedIcon sx={{ color: "white" }} />
        </IconButton>
      )}
    </Box>
  );
}
