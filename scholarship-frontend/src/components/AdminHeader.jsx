import { IconButton, Box, Typography } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import { useApp } from "../AppProvider";

export default function AdminHeader() {
  const { auth } = useApp();

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
        backgroundColor: "white",
      }}
    >
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
            backgroundColor: "primary.main",
            padding: 1,
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
          }}
        >
          {auth ? auth.name : "Guest"}
        </Typography>
      </Box>
    </Box>
  );
}
