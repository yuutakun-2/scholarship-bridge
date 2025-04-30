import {
  Box,
  OutlinedInput,
  Typography,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";

const categories = [
  "merit-based",
  "need-based",
  "field-specific",
  "athletic",
  "identity-based",
  "goverment-funded",
  "others",
];
const programs = ["Exchange", "Diploma", "Bachalor", "Master", "Phd", "all"];

const inputFields = [
  {
    name: "title",
    placeholder: "Scholarship Title",
    type: "text",
  },
  {
    name: "description",
    placeholder: "Description",
    type: "text",
    multiline: true,
    rows: 4,
  },
  {
    name: "organization",
    placeholder: "Organization",
    type: "text",
  },
  {
    name: "eligibility",
    placeholder: "Eligibility",
    type: "text",
    multiline: true,
    rows: 3,
  },
  {
    name: "category",
    placeholder: "Category",
    type: "select",
    options: categories,
  },
  {
    name: "program",
    placeholder: "Program",
    type: "select",
    options: programs,
  },
  {
    name: "field",
    placeholder: "Field",
    type: "text",
  },
  {
    name: "country",
    placeholder: "Country",
    type: "text",
  },
  {
    name: "deadline",
    placeholder: "Deadline",
    type: "date",
  },
  {
    name: "apply_link",
    placeholder: "Apply Link",
    type: "text",
  },
  {
    name: "photo_link",
    placeholder: "Photo Link",
    type: "text",
  },
];

async function createScholarship(data) {
  const token = localStorage.getItem("token");
  const res = await fetch(
    "https://scholarship-backend-main-0w7sk7.laravel.cloud/api/v1/scholarship",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    }
  );

  const responseData = await res.json();

  if (!res.ok) {
    throw new Error(responseData.message || "Failed to create scholarship");
  }

  return responseData;
}

export default function Admin() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    organization: "",
    eligibility: "",
    category: "",
    program: "",
    field: "",
    country: "",
    deadline: dayjs().format("YYYY-MM-DD"),
    apply_link: "",
    photo_link: "",
  });

  const [error, setError] = useState(null);
  const queryClient = useQueryClient();

  const addScholarship = useMutation({
    mutationFn: createScholarship,
    onSuccess: () => {
      queryClient.invalidateQueries(["scholarships"]);
      setError(null);
      // Reset form
      setFormData({
        title: "",
        description: "",
        organization: "",
        eligibility: "",
        category: "",
        program: "",
        field: "",
        country: "",
        deadline: dayjs().format("YYYY-MM-DD"),
        apply_link: "",
        photo_link: "",
      });
    },
    onError: (error) => {
      console.error("Scholarship creation error:", error);
      setError(error.message || "Failed to create scholarship");
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDateChange = (newValue) => {
    setFormData((prev) => ({
      ...prev,
      deadline: newValue.format("YYYY-MM-DD"),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addScholarship.mutate(formData);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        padding: 2,
        maxWidth: 700,
        margin: "0 auto",
      }}
    >
      <Typography variant="h5" sx={{ fontWeight: "bold" }}>
        Add scholarship
      </Typography>
      {error && (
        <Typography color="error" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}
      <form onSubmit={handleSubmit}>
        {inputFields.map((field, index) => (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              paddingY: 1,
              ...(field.name === "deadline" && {
                "& .MuiDateCalendar-root": {
                  width: "100%",
                  maxWidth: "400px",
                  margin: "0 auto",
                },
              }),
            }}
            key={index}
          >
            <Typography sx={{ mb: 1 }}>{field.placeholder}</Typography>
            {field.name === "deadline" ? (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DateCalendar"]}>
                  <DemoItem>
                    <DateCalendar
                      value={dayjs(formData.deadline)}
                      onChange={handleDateChange}
                      sx={{
                        "& .MuiPickersCalendarHeader-root": {
                          padding: "8px 0",
                        },
                        "& .MuiDayCalendar-monthContainer": {
                          padding: "0 8px",
                        },
                      }}
                    />
                  </DemoItem>
                </DemoContainer>
              </LocalizationProvider>
            ) : field.type === "select" ? (
              <FormControl fullWidth>
                <Select
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  displayEmpty
                >
                  <MenuItem value="" disabled>
                    Select {field.placeholder}
                  </MenuItem>
                  {field.options.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            ) : (
              <OutlinedInput
                sx={{ flexGrow: 1 }}
                type={field.type}
                name={field.name}
                value={formData[field.name]}
                placeholder={field.placeholder}
                onChange={handleChange}
                multiline={field.multiline}
                rows={field.rows}
              />
            )}
          </Box>
        ))}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
          disabled={addScholarship.isLoading}
        >
          {addScholarship.isLoading ? "Submitting..." : "Submit"}
        </Button>
      </form>
    </Box>
  );
}
