"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Wifi, Cloud, Terminal, Sparkles, Mic, Bot } from "lucide-react";

export default function AiAssistant() {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [conversation, setConversation] = useState([]);
  const [networkStatus, setNetworkStatus] = useState(true);
  const [isListening, setIsListening] = useState(false);

  // Network status checker
  useEffect(() => {
    const handleOnline = () => setNetworkStatus(true);
    const handleOffline = () => setNetworkStatus(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  // Voice recognition
  const startVoiceInput = () => {
    if ("SpeechRecognition" in window || "webkitSpeechRecognition" in window) {
      setIsListening(true);
      const Recognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new Recognition();

      recognition.onresult = (e) => {
        const transcript = e.results[0][0].transcript;
        setQuery(transcript);
        setIsListening(false);
      };

      recognition.start();
    } else {
      alert("Speech recognition not supported in this browser");
      setIsListening(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    try {
      const userMessage = { type: "user", content: query };
      setConversation((prev) => [...prev, userMessage]);

      const res = await fetch("/api/gemini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });

      if (!res.ok) throw new Error("Network response was not ok");

      const data = await res.json();
      const aiMessage = {
        type: "ai",
        content: data.response,
        timestamp: new Date().toLocaleTimeString(),
      };

      setConversation((prev) => [...prev, aiMessage]);
      setQuery("");
    } catch (error) {
      console.error("Error:", error);
      setConversation((prev) => [
        ...prev,
        {
          type: "error",
          content: "Failed to get response. Please check your network connection.",
        },
      ]);
    }
    setLoading(false);
  };

  const handleQuickAction = async (query) => {
    if (!query.trim()) return;

    setLoading(true);
    try {
      const userMessage = { type: "user", content: query };
      setConversation((prev) => [...prev, userMessage]);

      const res = await fetch("/api/gemini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });

      if (!res.ok) throw new Error("Network response was not ok");

      const data = await res.json();
      const aiMessage = {
        type: "ai",
        content: data.response,
        timestamp: new Date().toLocaleTimeString(),
      };
      setConversation((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("Error:", error);
      setConversation((prev) => [
        ...prev,
        {
          type: "error",
          content: "Failed to get response. Please check your network connection.",
        },
      ]);
    }
    setLoading(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="mt-12 bg-gradient-to-br from-indigo-100 to-blue-50 p-6 rounded-2xl shadow-xl border border-indigo-50"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-indigo-600 rounded-lg">
          <Bot className="h-6 w-6 text-white" />
        </div>
        <div>
          <h3 className="text-2xl font-bold text-indigo-900">Network AI Assistant</h3>
          <div className="flex items-center gap-2 mt-1">
            <div
              className={`w-2 h-2 rounded-full ${networkStatus ? "bg-green-500" : "bg-red-500"
                }`}
            />
            <span className="text-sm text-indigo-600">
              {networkStatus ? "Connected" : "Offline"}
            </span>
          </div>
        </div>
      </div>

      <div className="mb-6 h-96 overflow-y-auto rounded-xl bg-white shadow-inner p-4 space-y-4">
        <AnimatePresence>
          {conversation.map((msg, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: msg.type === "user" ? 20 : -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"
                }`}
            >
              <div
                className={`max-w-3xl p-4 rounded-2xl ${msg.type === "user"
                    ? "bg-indigo-600 text-white"
                    : msg.type === "error"
                      ? "bg-red-100 text-red-800"
                      : "bg-indigo-50 text-indigo-900"
                  }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  {msg.type === "ai" && <Sparkles className="h-4 w-4" />}
                  {msg.type === "error" && <Cloud className="h-4 w-4" />}
                  <span className="text-sm font-medium">
                    {msg.type === "user"
                      ? "You"
                      : msg.type === "error"
                        ? "Network Error"
                        : "AI Assistant"}
                  </span>
                  {msg.timestamp && (
                    <span className="text-xs opacity-70">{msg.timestamp}</span>
                  )}
                </div>
                <div className="prose prose-indigo max-w-none">{msg.content}</div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ask about networking concepts, configurations, or troubleshooting..."
            className="w-full p-4 pr-16 border-2 border-indigo-200 rounded-xl bg-white text-indigo-900 placeholder-indigo-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
          />
          <div className="absolute right-2 top-2 flex gap-2">
            <button
              type="button"
              onClick={startVoiceInput}
              className="p-2 hover:bg-indigo-100 rounded-lg transition-colors"
              disabled={isListening}
            >
              <Mic
                className={`h-5 w-5 ${isListening ? "text-red-500 animate-pulse" : "text-indigo-500"
                  }`}
              />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading || !networkStatus}
            className="col-span-2 bg-indigo-600 text-white p-4 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="h-5 w-5 border-2 border-white border-t-transparent rounded-full"
                />
                Analyzing Network Patterns...
              </>
            ) : (
              <>
                <Terminal className="h-5 w-5" />
                Ask Network Assistant
              </>
            )}
          </motion.button>
        </div>
      </form>

      <div className="mt-6 grid grid-cols-2 gap-4">
        <motion.button
          whileHover={{ scale: 1.02 }}
          className="p-3 bg-white rounded-xl border-2 border-indigo-100 text-indigo-900 hover:border-indigo-200 flex flex-col items-center"
          onClick={async () => {
            const query = "Explain DNS resolution process";
            setQuery(query);
            await handleQuickAction(query);
          }}
        >
          <Wifi className="h-5 w-5 mb-2" />
          <span className="text-sm font-medium">DNS Explained</span>
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.02 }}
          className="p-3 bg-white rounded-xl border-2 border-indigo-100 text-indigo-900 hover:border-indigo-200 flex flex-col items-center"
          onClick={async () => {
            const query = "How to troubleshoot packet loss?";
            setQuery(query);
            await handleQuickAction(query);
          }}
        >
          <Cloud className="h-5 w-5 mb-2" />
          <span className="text-sm font-medium">Fix Packet Loss</span>
        </motion.button>
      </div>
    </motion.div>
  );
}