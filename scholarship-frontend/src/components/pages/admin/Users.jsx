import { Box, Typography, Button } from "@mui/material";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export default function Users() {
  const queryClient = useQueryClient();

  // Fetch all users (admin only)
  async function fetchUsers() {
    const token = localStorage.getItem("token");
    const res = await fetch(
      "https://scholarship-backend-main-0w7sk7.laravel.cloud/api/v1/admin/user",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!res.ok) throw new Error("Failed to fetch users");
    const json = await res.json();
    return json.data || [];
  }

  // Delete a user (admin only)
  async function deleteUser(id) {
    const token = localStorage.getItem("token");
    const res = await fetch(
      `https://scholarship-backend-main-0w7sk7.laravel.cloud/api/v1/admin/user/delete/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!res.ok) throw new Error("Failed to delete user");
    return res.json();
  }

  const {
    data: users,
    isLoading: usersLoading,
    isError: usersError,
  } = useQuery({
    queryKey: ["admin-users"],
    queryFn: fetchUsers,
  });

  const deleteUserMutation = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries(["admin-users"]);
    },
  });

  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
        All Users
      </Typography>
      {usersLoading ? (
        <Typography>Loading users...</Typography>
      ) : usersError ? (
        <Typography color="error">Failed to load users.</Typography>
      ) : users && Array.isArray(users) && users.length > 0 ? (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          {users.map((user) => (
            <Box
              key={user.id}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                p: 1,
                border: "1px solid #eee",
                borderRadius: 1,
                background: "#fafafa",
              }}
            >
              <Box>
                <Typography sx={{ fontWeight: 500 }}>{user.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {user.email}
                </Typography>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ mt: 0.5, display: "block" }}
                >
                  Role: {user.role}
                </Typography>
              </Box>
              <Button
                variant="outlined"
                color="error"
                size="small"
                disabled={deleteUserMutation.isLoading}
                onClick={() => deleteUserMutation.mutate(user.id)}
              >
                Remove
              </Button>
            </Box>
          ))}
        </Box>
      ) : (
        <Typography>No users found.</Typography>
      )}
    </Box>
  );
}
