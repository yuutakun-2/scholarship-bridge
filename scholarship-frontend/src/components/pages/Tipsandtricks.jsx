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

const preparationSteps = [
  {
    title: "1. Research Scholarships",
    content: (
      <>
        <Typography>
          Find scholarships you're eligible for, based on academic goals,
          country, major, financial need, etc. Make a spreadsheet to track:
        </Typography>
        <Box component="ul" sx={{ pl: 2, listStyleType: "disc" }}>
          <li>Deadlines</li>
          <li>Required documents</li>
          <li>Application links</li>
        </Box>
        <Typography sx={{ mt: 2 }}>
          🎥 Resources:{" "}
          <a
            href="https://www.youtube.com/watch?v=oCfQ0LzxP5M"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#1976d2", textDecoration: "underline" }}
          >
            Video 1
          </a>
          ,{" "}
          <a
            href="https://youtu.be/d7zqiCrfiUE?si=Gpqzgyop-E5NLkJX"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#1976d2", textDecoration: "underline" }}
          >
            Video 2
          </a>
        </Typography>
      </>
    ),
  },
  {
    title: "2. Prepare Required Documents",
    content: (
      <Box component="ul" sx={{ pl: 2, listStyleType: "disc" }}>
        <li>Academic transcripts</li>
        <li>GED or equivalent results</li>
        <li>CV/Resume</li>
        <li>Passport or ID</li>
        <li>Recommendation letters</li>
        <li>Motivation letter or personal statement</li>
      </Box>
    ),
  },
  {
    title: "3. Academic Writing Skills",
    content: (
      <>
        <Typography>Tips for writing essays or personal statements:</Typography>
        <Box component="ul" sx={{ pl: 2, listStyleType: "disc" }}>
          <li>Clear structure: Introduction, body, conclusion</li>
          <li>Personal but professional tone</li>
          <li>
            Show your story with examples (growth, resilience, motivation)
          </li>
        </Box>
        <Typography sx={{ mt: 2 }}>📝 Example Topics:</Typography>
        <Box component="ul" sx={{ pl: 2, listStyleType: "disc" }}>
          <li>Why you chose your field of study</li>
          <li>Challenges you've overcome</li>
          <li>Your future goals and how the scholarship helps</li>
        </Box>
        <Typography sx={{ mt: 2 }}>
          🎥 More info:{" "}
          <a
            href="https://youtu.be/Cq4J8bPBcck?si=VwTFc9BU0Hu7evEI"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#1976d2", textDecoration: "underline" }}
          >
            Watch Video
          </a>
        </Typography>
      </>
    ),
  },
  {
    title: "4. Email Writing for Scholarships",
    content: (
      <>
        <Typography>Use a formal structure:</Typography>
        <Box
          sx={{
            bgcolor: "grey.100",
            p: 2,
            borderRadius: 1,
            fontSize: "0.875rem",
            mt: 2,
          }}
        >
          <Typography>
            <Box component="span" fontWeight="bold">
              Subject:
            </Box>{" "}
            Inquiry About [Scholarship Name] Application
          </Typography>
          <Typography>Dear [Name or Title],</Typography>
          <Typography>
            My name is [Your Name], and I am writing to inquire about [specific
            info]. I am a passionate student with a background in [brief
            background].
          </Typography>
          <Typography>Thank you for your time and assistance.</Typography>
          <Typography>
            Sincerely, <br />
            [Your Full Name] <br />
            [Your Contact Info]
          </Typography>
        </Box>
        <Typography sx={{ mt: 2 }}>
          📚 Playlist:{" "}
          <a
            href="https://youtube.com/playlist?list=PLMVh6zpgwzyLPkWC3_4HxNo7FZlGWajEH&si=ai_WNcbx9-dx2P3v"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#1976d2", textDecoration: "underline" }}
          >
            Email Writing Videos
          </a>
        </Typography>
      </>
    ),
  },
  {
    title: "5. Get Recommendation Letters",
    content: (
      <>
        <Box component="ul" sx={{ pl: 2, listStyleType: "disc" }}>
          <li>Ask at least 2–3 weeks in advance</li>
          <li>Choose people who know you well</li>
          <li>Give them your resume and scholarship info</li>
        </Box>
        <Typography sx={{ mt: 2 }}>
          📚 More info:{" "}
          <a
            href="https://www.youtube.com/watch?v=Zcpwdcvz3KE"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#1976d2", textDecoration: "underline" }}
          >
            Video
          </a>
          ,{" "}
          <a
            href="https://www.indeed.com/career-advice/career-development/recommendation-letter-for-scholarship"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#1976d2", textDecoration: "underline" }}
          >
            Guide
          </a>
        </Typography>
      </>
    ),
  },
  {
    title: "6. Mock Interviews",
    content: (
      <>
        <Box component="ul" sx={{ pl: 2, listStyleType: "disc" }}>
          <li>Tell us about yourself</li>
          <li>Why this scholarship?</li>
          <li>How will you use your education?</li>
          <li>What are your long-term goals?</li>
        </Box>
        <Typography sx={{ mt: 2 }}>
          You can practice your scholarship interview with our chatbot!
        </Typography>
        <Typography sx={{ mt: 2 }}>
          🎥 Practice:{" "}
          <a
            href="https://www.youtube.com/watch?v=q6323JL8a24"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#1976d2", textDecoration: "underline" }}
          >
            Mock Interview Chatbot
          </a>
        </Typography>
      </>
    ),
  },
  {
    title: "7. Proofread and Review",
    content: (
      <Box component="ul" sx={{ pl: 2, listStyleType: "disc" }}>
        <li>Use Grammarly or ask a mentor to review</li>
        <li>Avoid spelling and grammar mistakes</li>
      </Box>
    ),
  },
  {
    title: "8. Scholarship Mindset",
    content: (
      <Box component="ul" sx={{ pl: 2, listStyleType: "disc" }}>
        <li>
          <Box component="span" fontWeight="bold">
            Acknowledge emotions
          </Box>{" "}
          after rejection—it's okay to feel disappointed.
        </li>
        <li>
          <Box component="span" fontWeight="bold">
            Ask for feedback
          </Box>{" "}
          to improve your next applications.
        </li>
        <li>
          <Box component="span" fontWeight="bold">
            Reflect and learn
          </Box>{" "}
          from the experience.
        </li>
        <li>
          <Box component="span" fontWeight="bold">
            Reframe rejection
          </Box>{" "}
          as a learning step, not failure.
        </li>
        <li>
          <Box component="span" fontWeight="bold">
            Maintain a growth mindset
          </Box>
          : effort leads to success.
        </li>
        <li>
          <Box component="span" fontWeight="bold">
            Set new goals
          </Box>{" "}
          and explore more scholarships.
        </li>
        <li>
          <Box component="span" fontWeight="bold">
            Practice self-care
          </Box>{" "}
          and don't give up!
        </li>
      </Box>
    ),
  },
];

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
        console.log(auth.id);
        fetchChatHistory();
      }
    }, 2000); // 2 seconds

    return () => clearTimeout(timer);
  }, [auth]);

  const fetchChatHistory = async () => {
    try {
      setLoadingHistory(true);

      const response = await fetch(
        `https://scholarship-backend-main-0w7sk7.laravel.cloud/api/v1/ai/history/${auth.id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(response);
      if (!response.ok) {
        throw new Error("Failed to fetch chat history");
      }

      const data = await response.json();
      console.log(data);

      // Assuming the API returns an array of messages in the format we need
      // If not, you'll need to transform the data to match our format
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
      // You might want to show an error message to the user
    } finally {
      setLoadingHistory(false);
    }
  };

  const sendMessageToAPI = async (messageText) => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://scholarship-backend-main-0w7sk7.laravel.cloud/api/v1/ai/question/${auth.id}`,
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
      console.log(response);
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
      className="container"
      sx={{
        display: "flex",
        flexDirection: { xs: "column-reverse", md: "row" },
        paddingX: 2,
      }}
    >
      {/* Scholarship Preparation Section */}
      <Box sx={{ bgcolor: "grey.50", color: "grey.800", p: 3, flex: 1 }}>
        <Box
          sx={{
            maxWidth: "800px",
            mx: "auto",
            "& > *:not(:last-child)": { mb: 4 },
          }}
        >
          <Typography
            variant="h4"
            fontWeight="bold"
            color="primary"
            gutterBottom
          >
            🎯 Scholarship Preparation Guide
          </Typography>

          {preparationSteps.map((step, index) => (
            <Paper key={index} elevation={3} sx={{ p: 3 }}>
              <Typography variant="h6" color="primary" gutterBottom>
                {step.title}
              </Typography>
              {step.content}
            </Paper>
          ))}
        </Box>
      </Box>
      {/* Mock Interview Section */}
      <Box className="mock" sx={{ width: "100%", padding: "20px", flex: 1 }}>
        <Paper
          elevation={3}
          sx={{
            height: "600px",
            display: "flex",
            flexDirection: "column",
            // position: "fixed",
          }}
        >
          <Box
            sx={{
              p: 2,
              backgroundColor: "#f5f5f5",
              borderBottom: "1px solid #e0e0e0",
            }}
          >
            <Typography variant="h6" sx={{ margin: 0 }}>
              Mock Interview
            </Typography>
          </Box>

          <Box
            sx={{
              flex: 1,
              p: 2,
              overflowY: "auto",
              display: "flex",
              flexDirection: "column",
              gap: 1,
            }}
          >
            {!auth ? (
              <Box sx={{ textAlign: "center", color: "gray", py: 2 }}>
                Login to use AI Mock Interview
              </Box>
            ) : loadingHistory ? (
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
              p: 2,
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
              // onKeyPress={(e) => {
              //   if (e.key === "Enter" && !e.shiftKey) {
              //     e.preventDefault();
              //     handleSend();
              //   }
              // }}
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
    </Box>
  );
}
