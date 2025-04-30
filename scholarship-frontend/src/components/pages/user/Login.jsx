import { Box, Typography, Button, Alert, OutlinedInput } from "@mui/material";
import { useForm } from "react-hook-form";
import { useApp } from "../../../AppProvider";
import { useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";

export default function Login() {
  const { setAuth, postLogin } = useApp();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const login = useMutation({
    mutationFn: postLogin,
    onSuccess: (fetchedData) => {
      if (fetchedData && fetchedData.data && fetchedData.data.user) {
        setAuth(fetchedData.data.user);
        localStorage.setItem("token", fetchedData.token);
        localStorage.setItem("user", JSON.stringify(fetchedData.data.user));
        navigate("/");
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
    <Box>
      <Typography variant="h3" sx={{ mb: 3 }}>
        Login
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
        ></OutlinedInput>
        {errors.email && <Typography>This field is required</Typography>}

        <OutlinedInput
          sx={{ mb: 2 }}
          fullWidth
          placeholder="Password"
          type="password"
          {...register("password", { required: true })}
        ></OutlinedInput>
        {errors.password && <Typography>This field is required</Typography>}

        <Button type="submit" variant="contained" fullWidth>
          Submit
        </Button>
      </form>
    </Box>
  );
}
