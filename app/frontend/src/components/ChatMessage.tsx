import React from "react";

type ChatMessageProps = {
  message: string;
  isUser?: boolean;
};

const ChatMessage: React.FC<ChatMessageProps> = ({ message, isUser }) => (
  <div
    className={`w-full flex ${isUser ? "justify-end" : "justify-start"} mb-2`}
  >
    <div
      className={`max-w-[70%] px-4 py-2 rounded-lg shadow text-base whitespace-pre-line ${
        isUser
          ? "bg-blue-500 text-white rounded-br-none"
          : "bg-gray-200 dark:bg-zinc-800 text-gray-900 dark:text-gray-100 rounded-bl-none"
      }`}
    >
      {message}
    </div>
  </div>
);

export default ChatMessage;
