import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CircularProgress,
  Container,
  Chip,
  IconButton,
} from "@mui/material";
import { useNavigate } from "react-router";
import { useApp } from "../../AppProvider";

import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";

export default function Home() {
  const [scholarships, setScholarships] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { isDark } = useApp();
  // const [savedScholarships, setSavedScholarships] = useState([]);

  // async function saveScholarship(scholarshipId) {
  //   const userId = auth.id;
  //   const token = localStorage.getItem("token");
  //   const response = await fetch(
  //     `https://scholarship-backend-main-0w7sk7.laravel.cloud/api/v1/scholarship/save/${scholarshipId}/${userId}`,
  //     {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${token}`,
  //       },
  //     }
  //   );
  //   const res = await response.json();
  //   if (res.ok) {
  //     window.alert("Saved scholarship!");
  //   } else throw new Error("Error saving scholarships");
  // }

  // const deleteSavedScholarship = async (scholarshipId) => {
  //   const userId = auth.id;
  //   const token = localStorage.getItem("token");
  //   const response = await fetch(
  //     `https://scholarship-backend-main-0w7sk7.laravel.cloud/api/v1/scholarship/save/${scholarshipId}/${userId}`,
  //     {
  //       method: "DELETE",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${token}`,
  //       },
  //     }
  //   );
  //   const res = await response.json();
  //   fetchSavedScholarships();
  //   if (!res.ok) console.error("Error deleting saved scholarships:", error);
  // };

  // const fetchSavedScholarships = async () => {
  //   const userId = auth.id;
  //   const token = localStorage.getItem("token");
  //   const response = await fetch(
  //     `https://scholarship-backend-main-0w7sk7.laravel.cloud/api/v1/scholarship/save/${userId}`,
  //     {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${token}`,
  //       },
  //     }
  //   );
  //   const res = await response.json();
  //   console.log("res : ", res);
  //   console.log("res.data : ", res.data);
  //   // set response scholarshipIds inside savedScholarships array (check)
  //   setSavedScholarships(res.data);
  //   // console.log("savedScholarships : ", savedScholarships);
  //   if (!res.ok) console.error("Error fetching saved scholarships:", error);
  // };

  useEffect(() => {
    // fetchSavedScholarships();
    const fetchScholarships = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "https://scholarship-backend-main-0w7sk7.laravel.cloud/api/v1/showAll",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const res = await response.json();

        setScholarships(res.data);
      } catch (error) {
        console.error("Error fetching scholarships:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchScholarships();
  }, []);

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" color="black" fontWeight="bold" gutterBottom>
        Available Scholarships
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 3,
          justifyContent: "center",
        }}
      >
        {scholarships.map((scholarship) => (
          <Card
            key={scholarship.id}
            sx={{
              display: "flex",
              flexDirection: "column",
              transition: "transform 0.2s",
              border: "1px solid",
              borderColor: isDark ? "dark.main" : "light.main",
              borderRadius: 4,
              "&:hover": {
                transform: "scale(1.02)",
                boxShadow: 3,
                cursor: "pointer",
              },
              position: "relative",
              width: { xs: "80vw", md: "30vw" },
            }}
            onClick={() => navigate(`/showOne/${scholarship.id}`)}
          >
            <Box
              component="img"
              src={scholarship.photo_link}
              alt="Scholar Photo"
              sx={{
                width: "100%",
                height: 192,
                objectFit: "cover",
              }}
            />
            <CardContent sx={{ px: 3, py: 2 }}>
              <Typography
                variant="h6"
                fontWeight="bold"
                gutterBottom
                sx={{ mb: 1 }}
              >
                {scholarship.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {scholarship.category}
              </Typography>
            </CardContent>
            <Box
              sx={{
                px: 3,
                pt: 1,
                pb: 2,
                display: "flex",
                flexWrap: "wrap",
                gap: 1,
              }}
            >
              <Chip
                label={scholarship.field}
                sx={{
                  bgcolor: isDark ? "dark.soft" : "light.soft",
                  color: "yellow.800",
                  fontSize: "0.75rem",
                  fontWeight: 500,
                  borderRadius: "9999px",
                }}
                size="small"
              />
            </Box>
          </Card>
        ))}
      </Box>
    </Container>
  );
}
