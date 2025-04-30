import { Typography, Box, OutlinedInput, Button } from "@mui/material";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";

async function postUser(data) {
  const res = await fetch(
    "https://scholarship-backend-main-0w7sk7.laravel.cloud/api/v1/register",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );
  if (!res.ok) {
    // throw new Error("Network response was not ok.");
    console.log(res);
  }
  return res.json();
}

export default function Register() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const create = useMutation({
    mutationFn: postUser,
    onSuccess: () => {
      navigate("/login");
    },
  });

  const submitRegister = (data) => {
    create.mutate(data);
  };

  return (
    <Box>
      <Typography variant="h3" sx={{ mb: 3 }}>
        Register
      </Typography>
      <form
        onSubmit={handleSubmit(submitRegister)}
        style={{ display: "flex", flexDirection: "column", gap: 8 }}
      >
        <OutlinedInput
          fullWidth
          placeholder="Name"
          {...register("name", { required: true })}
        ></OutlinedInput>
        {errors.name && <Typography>This field is required</Typography>}

        <OutlinedInput
          fullWidth
          placeholder="Email"
          {...register("email", { required: true })}
        ></OutlinedInput>
        {errors.email && <Typography>This field is required</Typography>}

        <OutlinedInput
          fullWidth
          placeholder="Password"
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
