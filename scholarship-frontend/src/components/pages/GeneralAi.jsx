import {
  Box,
  TextField,
  Button,
  Paper,
  Avatar,
  Typography,
} from "@mui/material";
import { useState, useEffect } from "react";
import SendIcon from "@mui/icons-material/Send";
import { useApp } from "../../AppProvider";

export default function Tipsandtricks() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const [loadingHistory, setLoadingHistory] = useState(true);
  const { auth } = useApp();

  // Fetch chat history when component mounts
  useEffect(() => {
    const timer = setTimeout(() => {
      if (auth?.id) {
        fetchChatHistory();
      }
    }, 2000); // 2 seconds

    return () => clearTimeout(timer);
  }, [auth]);

  const fetchChatHistory = async () => {
    try {
      setLoadingHistory(true);

      const response = await fetch(
        `https://scholarship-backend-main-0w7sk7.laravel.cloud/api/v1/ai/general/history/${auth.id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch chat history");
      }

      const data = await response.json();

      setMessages(
        data.map((item) => {
          return {
            id: item.id,
            text: item.message,
            sender: item.type === 1 ? "user" : "bot",
          };
        })
      );
    } catch (error) {
      console.error("Error fetching chat history:", error);
      // show an error message to the user
    } finally {
      setLoadingHistory(false);
    }
  };

  const sendMessageToAPI = async (messageText) => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://scholarship-backend-main-0w7sk7.laravel.cloud/api/v1/ai/general/${auth.id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            message: messageText,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      const data = await response.json();

      // Add bot response from API to messages
      setMessages((prev) => [
        ...prev,
        {
          id: prev.length + 2,
          text:
            data.message ||
            "Thank you for your message. I'll get back to you soon.",
          sender: "bot",
        },
      ]);
    } catch (error) {
      console.error("Error sending message:", error);
      // Optionally show error message to user
    } finally {
      setLoading(false);
    }
  };

  const handleSend = async () => {
    if (message.trim()) {
      // First add user message to UI
      const userMessage = {
        id: messages.length + 1,
        text: message,
        sender: "user",
      };
      setMessages((prev) => [...prev, userMessage]);

      // Store message and clear input
      const messageToSend = message;
      setMessage("");

      // Then send to API
      await sendMessageToAPI(messageToSend);
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 700,
        mx: "auto",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        py: 1,
      }}
    >
      <Paper elevation={1} sx={{ textAlign: "center", width: "100%" }}>
        <Typography
          variant="h5"
          sx={{ fontWeight: 700, fontSize: 22, letterSpacing: 0.5, mt: 0.5 }}
        >
          🤖 AI Chatbot
        </Typography>
      </Paper>
      <Paper
        elevation={3}
        sx={{
          flex: 1,
          width: "100%",
          minHeight: 0,
          display: "flex",
          flexDirection: "column",
          maxHeight: `calc(100vh - 90px)`,
        }}
      >
        <Box
          sx={{
            flex: 1,
            p: 2,
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
            gap: 1,
            minHeight: 0,
          }}
        >
          {loadingHistory ? (
            <Box sx={{ textAlign: "center", color: "gray", py: 2 }}>
              Loading chat history...
            </Box>
          ) : messages.length === 0 ? (
            <Box sx={{ textAlign: "center", color: "gray", py: 2 }}>
              No messages yet. Start a conversation!
            </Box>
          ) : (
            messages.map((msg) => (
              <Box
                key={msg.id + Math.random()}
                sx={{
                  display: "flex",
                  justifyContent:
                    msg.sender === "user" ? "flex-end" : "flex-start",
                  alignItems: "flex-start",
                  gap: 1,
                  marginBottom: 1,
                }}
              >
                {msg.sender === "bot" && (
                  <Avatar
                    sx={{
                      bgcolor: "#1976d2",
                      width: 32,
                      height: 32,
                      flexShrink: 0,
                    }}
                  >
                    B
                  </Avatar>
                )}
                <Paper
                  elevation={1}
                  sx={{
                    p: 1.5,
                    maxWidth: "75%",
                    backgroundColor:
                      msg.sender === "user" ? "#1976d2" : "#f5f5f5",
                    color: msg.sender === "user" ? "white" : "black",
                    borderRadius: 2,
                    wordBreak: "break-word",
                    whiteSpace: "pre-wrap",
                    overflowWrap: "break-word",
                    "& p": {
                      margin: 0,
                      lineHeight: 1.4,
                    },
                  }}
                >
                  {msg.text.split("\n").map((line, i) => (
                    <p key={i}>{line}</p>
                  ))}
                </Paper>
                {msg.sender === "user" && (
                  <Avatar
                    sx={{
                      bgcolor: "#4caf50",
                      width: 32,
                      height: 32,
                      flexShrink: 0,
                    }}
                  >
                    U
                  </Avatar>
                )}
              </Box>
            ))
          )}
        </Box>

        <Box
          sx={{
            borderTop: "1px solid #e0e0e0",
            display: "flex",
            gap: 1,
            backgroundColor: "#fff",
          }}
        >
          <TextField
            fullWidth
            size="small"
            placeholder="Type a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            multiline
            maxRows={4}
            disabled={loading}
            sx={{
              "& .MuiInputBase-root": {
                backgroundColor: "#fff",
                height: "60px",
                overflow: "auto",
                "& textarea": {
                  height: "100% !important",
                  overflow: "auto !important",
                  "&::-webkit-scrollbar": {
                    width: "8px",
                  },
                  "&::-webkit-scrollbar-thumb": {
                    backgroundColor: "rgba(0,0,0,0.2)",
                    borderRadius: "4px",
                  },
                  "&::-webkit-scrollbar-track": {
                    backgroundColor: "transparent",
                  },
                },
              },
            }}
          />
          <Button
            variant="contained"
            endIcon={<SendIcon />}
            onClick={handleSend}
            disabled={loading}
            sx={{ flexShrink: 0 }}
          >
            {loading ? "Sending..." : "Send"}
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}
