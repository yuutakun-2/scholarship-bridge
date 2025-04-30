import {
  Box,
  Typography,
  Button,
  Alert,
  OutlinedInput,
  CircularProgress,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useApp } from "../../../AppProvider";
import { useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";

async function postAdminLogin(data) {
  const res = await fetch(
    "https://scholarship-backend-main-0w7sk7.laravel.cloud/api/v1/login",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Login failed");
  }
  return res.json();
}

export default function AdminLogin() {
  const navigate = useNavigate();
  const { setAuth } = useApp();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const login = useMutation({
    mutationFn: postAdminLogin,
    onSuccess: (fetchedData) => {
      if (fetchedData && fetchedData.data && fetchedData.data.user) {
        setAuth(fetchedData.data.user);
        localStorage.setItem("token", fetchedData.token);
        localStorage.setItem("user", JSON.stringify(fetchedData.data.user));
        navigate("/admin/scholarships");
      } else {
        console.error("Invalid response format:", fetchedData);
      }
    },
    onError: (error) => {
      console.error("Login error:", error);
    },
  });

  const submit = (data) => {
    login.mutate(data);
  };

  return (
    <Box sx={{ maxWidth: "400px", mx: "auto", mt: 4 }}>
      <Typography variant="h3" sx={{ mb: 3 }}>
        Admin Login
      </Typography>
      {login.isError && (
        <Alert severity="error">Invalid email and password.</Alert>
      )}
      <form onSubmit={handleSubmit(submit)}>
        <OutlinedInput
          sx={{ mb: 2 }}
          fullWidth
          placeholder="email"
          {...register("email", { required: true })}
        />
        {errors.email && <Typography>This field is required</Typography>}

        <OutlinedInput
          sx={{ mb: 2 }}
          fullWidth
          placeholder="Password"
          type="password"
          {...register("password", { required: true })}
        />
        {errors.password && <Typography>This field is required</Typography>}

        <Button
          type="submit"
          variant="contained"
          fullWidth
          disabled={login.isLoading}
          sx={{ position: "relative" }}
        >
          {login.isLoading ? (
            <>
              <CircularProgress
                size={24}
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  marginTop: "-12px",
                  marginLeft: "-12px",
                  color: "white",
                }}
              />
              <span style={{ visibility: "hidden" }}>Submit</span>
            </>
          ) : (
            "Submit"
          )}
        </Button>
      </form>
    </Box>
  );
}
