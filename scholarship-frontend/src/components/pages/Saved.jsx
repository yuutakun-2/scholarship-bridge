import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Typography,
  Card,
  CardContent,
  CircularProgress,
  Container,
  Link,
  Divider,
} from "@mui/material";
import { useApp } from "../../AppProvider";

export default function Saved() {
  const [savedScholarships, setSavedScholarships] = useState([]);
  const [loading, setLoading] = useState(true);
  const { auth } = useApp();

  const fetchSavedScholarships = async () => {
    try {
      setLoading(true);
      // const userId = auth.id;
      const user = JSON.parse(localStorage.getItem("user"));
      const userId = user.id;
      const token = localStorage.getItem("token");
      const response = await fetch(
        `https://scholarship-backend-main-0w7sk7.laravel.cloud/api/v1/scholarship/save/${userId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const res = await response.json();
      setSavedScholarships(res);
    } catch (error) {
      console.error("Error fetching saved scholarships:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteSavedScholarship = async (scholarshipId) => {
    try {
      setLoading(true);
      const userId = auth.id;
      const token = localStorage.getItem("token");
      const response = await fetch(
        `https://scholarship-backend-main-0w7sk7.laravel.cloud/api/v1/scholarship/save/${scholarshipId}/${userId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const res = await response.json();
      console.log(res);
      fetchSavedScholarships();
    } catch (error) {
      console.error("Error deleting saved scholarships:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSavedScholarships();
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
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" color="black" fontWeight="bold" gutterBottom>
        Saved Scholarships
      </Typography>
      {savedScholarships && savedScholarships.length > 0 ? (
        savedScholarships.map((scholarship) => (
          <Card
            key={scholarship.id}
            sx={{
              mb: 4,
              border: "1px solid",
              borderColor: "divider",
              position: "relative",
            }}
          >
            <CardContent>
              <Box
                component="img"
                src={scholarship.photo_link}
                alt="Scholar Photo"
                sx={{
                  width: "100%",
                  objectFit: "cover",
                }}
              />
              <Button
                sx={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  padding: 4,
                  backgroundColor: "white",
                  borderRadius: "10%",
                  border: "1px solid black",
                }}
                onClick={() => deleteSavedScholarship(scholarship.id)}
                variant="h6"
              >
                Remove
              </Button>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: "bold",
                }}
                gutterBottom
              >
                🎓 {scholarship.title}
              </Typography>
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle1" color="text.secondary">
                  <Box
                    component="span"
                    fontWeight="bold"
                    sx={{ color: "black" }}
                  >
                    Level:
                  </Box>{" "}
                  {scholarship.program}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                  <Box
                    component="span"
                    fontWeight="bold"
                    sx={{ color: "black" }}
                  >
                    Scholarship Type:
                  </Box>{" "}
                  {scholarship.category}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                  <Box
                    component="span"
                    fontWeight="bold"
                    sx={{ color: "black" }}
                  >
                    Country:
                  </Box>{" "}
                  {scholarship.country}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                  <Box
                    component="span"
                    fontWeight="bold"
                    sx={{ color: "black" }}
                  >
                    Organization:
                  </Box>{" "}
                  {scholarship.organization}
                </Typography>
              </Box>
              <Divider sx={{ my: 3 }} />
              <Typography
                variant="h5"
                color="text.primary"
                fontWeight="bold"
                gutterBottom
              >
                Field of Study
              </Typography>
              <Typography variant="body1">{scholarship.field}</Typography>
              <Divider sx={{ my: 3 }} />
              <Typography
                variant="h5"
                color="text.primary"
                fontWeight="bold"
                gutterBottom
              >
                Description
              </Typography>
              <Typography variant="body1">{scholarship.description}</Typography>
              <Divider sx={{ my: 3 }} />
              <Typography
                variant="h5"
                color="text.primary"
                fontWeight="bold"
                gutterBottom
              >
                Eligibility
              </Typography>
              <Typography variant="body1">{scholarship.eligibility}</Typography>
              <Box sx={{ mt: 4 }}>
                <Typography variant="h6" color="error" gutterBottom>
                  Deadline:{" "}
                  {new Date(scholarship.deadline).toLocaleDateString()}
                </Typography>
                <Link
                  href={scholarship.apply_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    display: "inline-block",
                    mt: 2,
                    color: "primary.main",
                    textDecoration: "none",
                    "&:hover": {
                      textDecoration: "underline",
                    },
                  }}
                >
                  Apply Here
                </Link>
              </Box>
            </CardContent>
          </Card>
        ))
      ) : (
        <Typography variant="body1">No saved scholarships found.</Typography>
      )}
    </Container>
  );
}
