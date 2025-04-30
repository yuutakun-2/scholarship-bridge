import { Box, Typography } from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";
import PersonIcon from "@mui/icons-material/Person";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useNavigate } from "react-router";

const adminNavItems = [
  {
    icon: <SchoolIcon />,
    label: "Scholarships",
    link: "/admin/scholarships",
  },
  {
    icon: <AddCircleIcon />,
    label: "Create Scholarship",
    link: "/admin/scholarships/create",
  },
  {
    icon: <PersonIcon />,
    label: "Users",
    link: "/admin/users",
  },
];

export default function AdminNavBar() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        alignItems: "center",
        padding: 4,
        borderTop: "1px solid #ccc",
        position: "sticky",
        top: 0,
        zIndex: 1200,
        height: "100vh",
      }}
    >
      {adminNavItems.map((item) => (
        <Box
          key={item.label}
          sx={{
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            cursor: "pointer",
          }}
          onClick={() => navigate(item.link)}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 1,
              color: "primary.main",
            }}
          >
            {item.icon}
            <Typography variant="caption">{item.label}</Typography>
          </Box>
        </Box>
      ))}
    </Box>
  );
}
