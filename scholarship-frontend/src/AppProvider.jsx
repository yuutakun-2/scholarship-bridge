import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import AppRouter from "./AppRouter";
import { useState, useContext, createContext, useEffect } from "react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient();
const AppContext = createContext();

export function useApp() {
  return useContext(AppContext);
}

const theme = createTheme({
  palette: {
    dark: {
      main: "#a6140c",
      soft: "#a1423d",
    },
    light: {
      main: "#000080",
      soft: "#5454d1",
    },
  },
});

export default function AppProvider() {
  const [isDark, setIsDark] = useState(true);
  const [auth, setAuth] = useState(null);

  const postLogin = async (data) => {
    const token = localStorage.getItem("token");
    const headers = {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    };

    const res = await fetch(
      // scholarship-backend-main-0w7sk7.laravel.cloud
      // "http://localhost:8000/api/v1/login",
      "https://scholarship-backend-main-0w7sk7.laravel.cloud/api/v1/login",
      {
        method: "POST",
        headers,
        body: JSON.stringify(data),
      }
    );
    if (!res.ok) {
      throw new Error("Network response was not ok.");
    }
    return res.json();
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    if (token && user) {
      setAuth(JSON.parse(user));
    } else {
      setAuth(null);
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }
  }, []);

  return (
    <AppContext.Provider
      value={{ isDark, setIsDark, auth, setAuth, postLogin }}
    >
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <AppRouter />
          <CssBaseline />
        </ThemeProvider>
      </QueryClientProvider>
    </AppContext.Provider>
  );
}
