import { useEffect, useState } from "react";
import { useParams } from "react-router";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CircularProgress,
  Container,
  Link,
  Divider,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Alert,
  Snackbar,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useApp } from "../../AppProvider";
import BookmarkIcon from "@mui/icons-material/Bookmark";

export default function ScholarshipDetail() {
  const [scholarship, setScholarship] = useState(null);
  const [loading, setLoading] = useState(true);
  const [newComment, setNewComment] = useState("");
  const [postingComment, setPostingComment] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [commentToDelete, setCommentToDelete] = useState(null);
  const { isDark } = useApp();
  const { id } = useParams();

  const token = localStorage.getItem("token");

  async function saveScholarship(scholarshipId) {
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user.id;
    const response = await fetch(
      `https://scholarship-backend-main-0w7sk7.laravel.cloud/api/v1/scholarship/save/${scholarshipId}/${userId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  }

  useEffect(() => {
    const fetchScholarship = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://scholarship-backend-main-0w7sk7.laravel.cloud/api/v1/showOne/${id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const res = await response.json();
        setScholarship(res.data[0]);
      } catch (error) {
        console.error("Error fetching scholarship:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchScholarship();
  }, [id]);

  const handlePostComment = async () => {
    if (!newComment.trim()) return;

    try {
      setPostingComment(true);
      setError(null);

      const response = await fetch(
        `https://scholarship-backend-main-0w7sk7.laravel.cloud/api/v1/comment`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            message: newComment.trim(),
            // You might want to get this from user context or auth state
            scholarship_id: id,
          }),
        }
      );

      const data = await response.json();

      if (data.success) {
        // Refresh the scholarship data to get the new comment
        const updatedScholarshipResponse = await fetch(
          `https://scholarship-backend-main-0w7sk7.laravel.cloud/api/v1/showOne/${id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const updatedData = await updatedScholarshipResponse.json();
        setScholarship(updatedData.data[0]);
        setNewComment("");
        setSuccessMessage("Comment posted successfully!");
      } else {
        setError(data.message || "Failed to post comment");
      }
    } catch (error) {
      console.error("Error posting comment:", error);
      setError("Failed to post comment. Please try again.");
    } finally {
      setPostingComment(false);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      setError(null);
      const response = await fetch(
        `https://scholarship-backend-main-0w7sk7.laravel.cloud/api/v1/comment/${commentId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (data.success) {
        // Refresh the scholarship data to update comments
        const updatedScholarshipResponse = await fetch(
          `https://scholarship-backend-main-0w7sk7.laravel.cloud/api/v1/showOne/${id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const updatedData = await updatedScholarshipResponse.json();
        setScholarship(updatedData.data[0]);
        setSuccessMessage("Comment deleted successfully!");
      } else {
        setError(data.message || "Failed to delete comment");
      }
    } catch (error) {
      console.error("Error deleting comment:", error);
      setError("Failed to delete comment. Please try again.");
    } finally {
      setDeleteDialogOpen(false);
      setCommentToDelete(null);
    }
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

  if (!scholarship) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h5" color="error">
          Scholarship not found
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      <Card sx={{ mb: 4, border: "1px solid", borderColor: "divider" }}>
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
          <Typography
            variant="h4"
            sx={{
              color: isDark ? "dark.main" : "light.main",
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
                sx={{
                  color: "black",
                }}
              >
                Level:
              </Box>{" "}
              {scholarship.program}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              <Box
                component="span"
                fontWeight="bold"
                sx={{
                  color: "black",
                }}
              >
                Scholarship Type:
              </Box>{" "}
              {scholarship.category}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              <Box
                component="span"
                fontWeight="bold"
                sx={{
                  color: "black",
                }}
              >
                Country:
              </Box>{" "}
              {scholarship.country}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              <Box
                component="span"
                fontWeight="bold"
                sx={{
                  color: "black",
                }}
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
              Deadline: {new Date(scholarship.deadline).toLocaleDateString()}
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
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
              <Button
                sx={{
                  paddingX: 2,
                  paddingY: 1,
                  backgroundColor: "white",
                  borderRadius: "10%",
                  border: "1px solid black",
                }}
                onClick={() => saveScholarship(scholarship.id)}
                variant="h6"
              >
                <BookmarkIcon />
                Save
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>

      <Card sx={{ mt: 4, border: "1px solid", borderColor: "divider" }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Comments
          </Typography>

          {/* Comment Input */}
          <Box sx={{ mb: 3 }}>
            <TextField
              fullWidth
              multiline
              rows={3}
              variant="outlined"
              placeholder="Write a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              disabled={postingComment}
              sx={{ mb: 2 }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handlePostComment}
              disabled={postingComment || !newComment.trim()}
            >
              {postingComment ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Post Comment"
              )}
            </Button>
          </Box>

          {/* Comments List */}
          {loading ? (
            <Box display="flex" justifyContent="center" my={2}>
              <CircularProgress size={24} />
            </Box>
          ) : scholarship?.comments?.length > 0 ? (
            <List>
              {scholarship.comments.map((comment) => (
                <ListItem
                  key={comment.id}
                  alignItems="flex-start"
                  secondaryAction={
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={() => {
                        setCommentToDelete(comment);
                        setDeleteDialogOpen(true);
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  }
                >
                  <ListItemAvatar>
                    <Avatar>{comment.user?.name?.[0] || "U"}</Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Typography variant="subtitle1" component="span">
                        {comment.user?.name || "Anonymous User"}
                      </Typography>
                    }
                    secondary={
                      <>
                        <Typography
                          component="span"
                          variant="body2"
                          color="text.primary"
                          sx={{ display: "block", mb: 1 }}
                        >
                          {comment.message}
                        </Typography>
                        <Typography
                          component="span"
                          variant="caption"
                          color="text.secondary"
                        >
                          {new Date(comment.created_at).toLocaleString()}
                        </Typography>
                      </>
                    }
                  />
                </ListItem>
              ))}
            </List>
          ) : (
            <Typography variant="body1" color="text.secondary" align="center">
              No comments yet. Be the first to comment!
            </Typography>
          )}
        </CardContent>
      </Card>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => {
          setDeleteDialogOpen(false);
          setCommentToDelete(null);
        }}
      >
        <DialogTitle>Delete Comment</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete this comment? This action cannot be
            undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setDeleteDialogOpen(false);
              setCommentToDelete(null);
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={() => handleDeleteComment(commentToDelete?.id)}
            color="error"
            variant="contained"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Error and Success Messages */}
      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={() => setError(null)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={() => setError(null)} severity="error">
          {error}
        </Alert>
      </Snackbar>

      <Snackbar
        open={!!successMessage}
        autoHideDuration={6000}
        onClose={() => setSuccessMessage("")}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={() => setSuccessMessage("")} severity="success">
          {successMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
}
