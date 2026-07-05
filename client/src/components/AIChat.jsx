import { useState } from "react";
import axios from "axios";

const AIChat = () => {

  const [question, setQuestion] = useState("");

  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text: "Hi 👋 Ask me any coding question.",
    },
  ]);

  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {

    if (!question.trim()) return;

    const userMessage = {
      role: "user",
      text: question,
    };

    setMessages((prev) => [...prev, userMessage]);

    setQuestion("");

    try {

      setLoading(true);

      const response = await axios.post(
        "https://ai-coding-interview-assistant-1.onrender.com/api/ai/chat",
        {
          question,
        }
      );

      const aiMessage = {
        role: "assistant",
        text: response.data.reply,
      };

      setMessages((prev) => [...prev, aiMessage]);

    } catch (error) {

      console.log(error);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: "AI failed to respond.",
        },
      ]);

    } finally {

      setLoading(false);

    }
  };

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-2xl h-[700px] flex flex-col">

      {/* HEADER */}
      <div className="p-4 border-b border-gray-800">

        <h1 className="text-2xl font-bold text-white">
          AI Assistant
        </h1>

      </div>

      {/* CHAT AREA */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">

        {messages.map((msg, index) => (

          <div
            key={index}
            className={`max-w-[85%] p-4 rounded-2xl ${
              msg.role === "user"
                ? "bg-blue-600 ml-auto"
                : "bg-gray-800"
            }`}
          >
            <p className="text-white whitespace-pre-wrap">
              {msg.text}
            </p>

          </div>

        ))}

        {loading && (
          <div className="bg-gray-800 p-4 rounded-2xl w-fit">
            AI is typing...
          </div>
        )}

      </div>

      {/* INPUT */}
      <div className="p-4 border-t border-gray-800 flex gap-3">

        <input
          type="text"
          placeholder="Ask coding question..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="flex-1 bg-black border border-gray-700 rounded-xl px-4 py-3 outline-none text-white"
        />

        <button
          onClick={sendMessage}
          className="bg-blue-600 hover:bg-blue-700 px-5 rounded-xl"
        >
          Send
        </button>

      </div>

    </div>
  );
};

export default AIChat;
