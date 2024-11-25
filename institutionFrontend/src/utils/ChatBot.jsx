import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { TextField, Button, Box, Typography, IconButton, Tooltip } from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import CloseIcon from "@mui/icons-material/Close";
import SendIcon from "@mui/icons-material/Send";
import MicIcon from "@mui/icons-material/Mic";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import "./Bot.css";
import Skeleton from '@mui/material/Skeleton';
import ChatBotMessageSkeleton from "../component/Skeletons/ChatBot";

const ChatBot = () => {
  const [messages, setMessages] = useState([]);
  const [sentByVoice, setSentByVoice] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [voices, setVoices] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const chatContainerRef = useRef(null);

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = SpeechRecognition ? new SpeechRecognition() : null;
  const synth = window.speechSynthesis;

  const loadVoices = () => {
    const availableVoices = synth.getVoices();
    if (availableVoices.length > 0) {
      setVoices(availableVoices);
    } else {
      setTimeout(loadVoices, 100);
    }
  };

  useEffect(() => {
    const availableVoices = synth.getVoices();
    if (availableVoices.length > 0) {
      setVoices(availableVoices);
    } else {
      setTimeout(loadVoices, 100);
    }

    if (synth.onvoiceschanged !== undefined) {
      synth.onvoiceschanged = loadVoices;
    }
  }, []);

  const startListening = () => {
    if (recognition && !isListening) {
      setIsListening(true);
      recognition.start();
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setUserInput(transcript);
        setSentByVoice(true);
        sendMessage(transcript);
      };

      recognition.onerror = (event) => {
        console.error("Speech recognition error: ", event.error);
        setIsListening(false); 
      };

      recognition.onend = () => {
        setIsListening(false);
      };
    }
  };

  const sendMessage = async (message) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { text: message, sender: "user" },
    ]);
    setIsLoading(true);

    try {
      const response = await axios.post('http://localhost:5005/webhooks/rest/webhook', {
        sender: "user",
        message: message,
      });

      const rasaMessages = response.data.map((msg) => ({
        text: msg.text,
        sender: "bot",
      }));

      setMessages((prevMessages) => [...prevMessages, ...rasaMessages]);

      if (sentByVoice) {
        rasaMessages.forEach((msg) => speakMessage(msg.text));
        setSentByVoice(false);
      }
    } catch (error) {
      console.error("Error sending message to Rasa:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const speakMessage = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-GB';
    const voices = speechSynthesis.getVoices();
    const selectedVoice = voices.find(voice => voice.name === 'Microsoft George - English (United Kingdom)');
    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }

    utterance.pitch = 1;
    utterance.rate = 1;
    speechSynthesis.speak(utterance);
  };

  const sendMessageFn = () => {
    sendMessage(userInput);
    setUserInput('');
  };

  return (
    <div>
      {/* Floating Chat Button */}
      {!isChatOpen && (
        <Tooltip title="Chat with us!" arrow>
          <IconButton
            aria-label="Open chat"
            onClick={() => setIsChatOpen(true)}
            sx={{
              position: "fixed",
              bottom: 20,
              right: 20,
              backgroundColor: "#008080",
              color: "#fff",
              padding: 2,
              borderRadius: "50%",
              boxShadow: "0px 6px 12px rgba(0, 128, 128, 0.3)",
              transition: "all 0.3s ease-in-out",
              "&:hover": {
                backgroundColor: "#004d40",
                transform: "scale(1.1)",
              },
            }}
          >
            <ChatIcon fontSize="medium" />
          </IconButton>
        </Tooltip>
      )}

      {/* Chat Box */}
      {isChatOpen && (
        <Box
          sx={{
            position: "fixed",
            bottom: 80,
            right: 20,
            maxWidth: 400,
            width: "90%",
            height: "550px",
            boxShadow: "0px 10px 30px rgba(0, 128, 128, 0.2)",
            backgroundColor: "#ffffff",
            borderRadius: "16px",
            zIndex: 1000,
            display: "flex",
            flexDirection: "column",
            animation: "fadeIn 0.4s ease-in-out",
          }}
        >
          {/* Header with Close Button */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: 1,
              backgroundColor: "#008080",
              color: "#ffffff",
              borderRadius: "16px 16px 0 0",
            }}
          >
            <Typography variant="h6" sx={{ paddingLeft: 2 }}>Chat with us</Typography>
            <IconButton
              aria-label="Close chat"
              onClick={() => setIsChatOpen(false)}
              sx={{ color: "#ffffff" }}
            >
              <CloseIcon />
            </IconButton>
          </Box>

          {/* Messages Container */}
          <Box
            ref={chatContainerRef}
            sx={{
              flex: 1,
              overflowY: "auto",
              padding: 2,
              backgroundColor: "#f9f9f9",
            }}
          >
            {messages.map((msg, index) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  justifyContent: msg.sender === "user" ? "flex-end" : "flex-start",
                  mb: 1,
                }}
              >
                <Box
                  sx={{
                    maxWidth: "75%",
                    padding: "10px 15px",
                    borderRadius: "16px",
                    backgroundColor: msg.sender === "user" ? "#e0f7fa" : "#c8e6c9",
                    boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.1)",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px"
                  }}
                >
                  <Typography variant="body2" color="textPrimary">{msg.text}</Typography>
                  {msg.sender === "bot" && (
                    <IconButton onClick={() => speakMessage(msg.text)} sx={{ color: "#008080" }}>
                      <VolumeUpIcon fontSize="small" />
                    </IconButton>
                  )}
                </Box>
              </Box>
            ))}

            {/* Skeleton Loader for last message */}
            {isLoading && (
              <Box sx={{ display: "flex", justifyContent: "flex-start", mb: 1 }}>
                <Box>
                  <ChatBotMessageSkeleton/>
                </Box>
              </Box>
            )}
          </Box>

          {/* Input and Send Button */}
          <Box sx={{ display: "flex", padding: 1, backgroundColor: "#e0f2f1", borderTop: "1px solid #008080" }}>
            <TextField
              variant="outlined"
              fullWidth
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Type a message..."
              sx={{
                borderRadius: "16px",
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "#008080" },
                  "&:hover fieldset": { borderColor: "#004d40" },
                },
              }}
            />
            <Tooltip title="Speak your message" arrow>
              <IconButton
                onClick={startListening}
                disabled={isListening}
                color={isListening ? "secondary" : "primary"}
                sx={{ marginLeft: 1 }}
              >
                <MicIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Send message" arrow>
              <IconButton onClick={sendMessageFn} sx={{ marginLeft: 1 }}>
                <SendIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
      )}
    </div>
  );
};

export default ChatBot;
