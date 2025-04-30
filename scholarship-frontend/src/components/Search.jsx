import { useState, useEffect } from "react";
import { useSearchParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import {
  Box,
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  Chip,
  CircularProgress,
  Container,
} from "@mui/material";

const searchScholarships = async (query) => {
  if (!query) return [];
  const token = localStorage.getItem("token");
  const res = await fetch(
    `https://scholarship-backend-main-0w7sk7.laravel.cloud/api/v1/scholarship/search?search=${query}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const response = await res.json();
  console.log(response);
  if (!res.ok) throw new Error("Failed to search.");

  return response[0];
};

export default function ScholarshipSearch() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("search") || "";
  const [searchTerm, setSearchTerm] = useState(query);
  const navigate = useNavigate();

  const { data: scholarships = [], isLoading } = useQuery({
    queryKey: ["scholarships", query],
    queryFn: () => searchScholarships(query),
    enabled: !!query,
  });

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchParams({ search: searchTerm.trim() });
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchTerm.trim()) {
        setSearchParams({ search: searchTerm.trim() });
      }
      return () => clearTimeout(delayDebounceFn);
    }, 800);
  }, [searchTerm, setSearchParams]);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box
        component="form"
        onSubmit={handleSearch}
        sx={{
          mb: 4,
          display: "flex",
          gap: 2,
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <TextField
          fullWidth
          value={searchTerm}
          autoFocus
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search scholarships..."
          variant="outlined"
          sx={{ flex: 1, minWidth: 200 }}
        />
      </Box>

      {isLoading && (
        <Box display="flex" justifyContent="center" my={4}>
          <CircularProgress />
        </Box>
      )}

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 3,
          justifyContent: "flex-start",
        }}
      >
        {scholarships?.map((scholarship) => (
          <Box
            key={scholarship.title}
            sx={{
              flex: "1 1 320px",
              maxWidth: 400,
              minWidth: 300,
              display: "flex",
            }}
            onClick={() => {
              navigate(`/showOne/${scholarship.id}`);
            }}
          >
            <Card
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                height: "100%",
              }}
            >
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {scholarship.title}
                </Typography>
                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                  gutterBottom
                >
                  {scholarship.organization}
                </Typography>
                <Box sx={{ mb: 2 }}>
                  <Chip
                    label={scholarship.category}
                    color="primary"
                    size="small"
                    sx={{ mr: 1 }}
                  />
                  <Chip
                    label={scholarship.program}
                    color="secondary"
                    size="small"
                  />
                </Box>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    mb: 2,
                    display: "-webkit-box",
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}
                >
                  {scholarship.description}
                </Typography>
                <Box
                  sx={{
                    mt: "auto",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="caption" color="text.secondary">
                    Deadline:{" "}
                    {new Date(scholarship.deadline).toLocaleDateString()}
                  </Typography>
                  <Button
                    href={scholarship.apply_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    color="primary"
                  >
                    Apply Now
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Box>
        ))}
      </Box>

      {scholarships?.length == 0 && searchTerm && !isLoading && (
        <Box textAlign="center" mt={4}>
          <Typography color="text.secondary">No scholarships found</Typography>
        </Box>
      )}
    </Container>
  );
}
