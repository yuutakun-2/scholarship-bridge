import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CircularProgress,
  Container,
  Button,
  IconButton,
  Snackbar,
  Alert,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";

async function deleteScholarship(id) {
  const token = localStorage.getItem("token");
  const res = await fetch(
    `https://scholarship-backend-main-0w7sk7.laravel.cloud/api/v1/scholarship/delete/${id}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Failed to delete scholarship");
  }

  return res.json();
}

export default function Scholarships() {
  const [scholarships, setScholarships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const navigate = useNavigate();

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

  useEffect(() => {
    fetchScholarships();
  }, []);

  const deleteMutation = useMutation({
    mutationFn: deleteScholarship,
    onSuccess: () => {
      // Show success message first
      setSnackbarMessage("Scholarship deleted successfully!");
      setSnackbarOpen(true);

      // Then refresh the scholarships list
      fetchScholarships();
    },
    onError: (error) => {
      // Show error message
      console.error("Error deleting scholarship:", error);
      setSnackbarMessage("Failed to delete scholarship.");
      setSnackbarOpen(true);
    },
  });

  const handleDelete = (id) => {
    if (window.confirm(`Are you sure you want to delete this scholarship?`)) {
      deleteMutation.mutate(id);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

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
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 4 }}>
        <Typography variant="h4" color="black" fontWeight="bold">
          Scholarships
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/admin/scholarships/create")}
        >
          Create New Scholarship
        </Button>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 3,
          "& > *": {
            flex: "1 1 calc(50% - 12px)",
            minWidth: "300px",
            maxWidth: "100%",
          },
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
              borderColor: "divider",
              borderRadius: 4,
              "&:hover": {
                transform: "scale(1.02)",
                boxShadow: 3,
              },
            }}
          >
            <CardContent>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                }}
              >
                <Typography
                  variant="h5"
                  color="primary"
                  fontWeight="bold"
                  gutterBottom
                >
                  {scholarship.title}
                </Typography>
                <IconButton
                  color="error"
                  onClick={() => handleDelete(scholarship.id)}
                  disabled={deleteMutation.isLoading} // Disable button during deletion
                >
                  {deleteMutation.isLoading ? (
                    <CircularProgress size={24} />
                  ) : (
                    <DeleteIcon />
                  )}
                </IconButton>
              </Box>

              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle1" color="text.secondary">
                  <Box component="span" fontWeight="bold">
                    Category:
                  </Box>{" "}
                  {scholarship.category}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                  <Box component="span" fontWeight="bold">
                    Program:
                  </Box>{" "}
                  {scholarship.program}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                  <Box component="span" fontWeight="bold">
                    Country:
                  </Box>{" "}
                  {scholarship.country}
                </Typography>
              </Box>

              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                {scholarship.description}
              </Typography>

              <Typography variant="subtitle2" color="error">
                Deadline: {new Date(scholarship.deadline).toLocaleDateString()}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>

      {/* Snackbar for confirmation messages */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={deleteMutation.isError ? "error" : "success"}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
}
