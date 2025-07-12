"use client";
import React, { useState, useRef, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import ChatMessage from "../components/ChatMessage";
import InputForm from "../components/InputForm";

const initialMessages = [
  {
    message: "こんにちは！どんなテーマでもどうぞ！",
    isUser: false,
  },
];

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [messages, setMessages] = useState(initialMessages);
  const [loading, setLoading] = useState(false);
  const [theme, setTheme] = useState("");
  const [lectureData, setLectureData] = useState({
    problemStatement: "",
    modelAnswer: "",
    userAnswer: "",
    evaluation: "",
    aiResponse: "",
  });
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async (text: string) => {
    setMessages((prev) => [...prev, { message: text, isUser: true }]);
    setLoading(true);
    // API連携部分（仮実装）
    setTimeout(async () => {
      if (!theme) {
        setTheme(text);
        const res = await fetch(
          `http://localhost:8000/api/problem?theme=${text}`
        );
        const problemJson = await res.json();
        console.log(problemJson);

        setMessages((prev) => [
          ...prev,
          {
            message: `${
              problemJson
                ? problemJson["problemStatement"]
                : "AIの返答がありません"
            }`,
            isUser: false,
          },
        ]);
        setLectureData({
          problemStatement: problemJson["problemStatement"],
          modelAnswer: problemJson["modelAnswer"],
          userAnswer: "",
          evaluation: "",
          aiResponse: "",
        });
        setLoading(false);
      } else {
        const res = await fetch("http://localhost:8000/api/evaluate", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            problem_statement: lectureData.problemStatement,
            model_answer: lectureData.modelAnswer,
            user_answer: text,
          }),
        });
        const evaluateJson = await res.json();
        console.log(evaluateJson);

        setMessages((prev) => [
          ...prev,
          {
            message: `${
              evaluateJson
                ? `評価：${evaluateJson["evaluation"]}\n
                コメント：${evaluateJson["ai_response"]}`
                : "AIの返答がありません"
            }`,
            isUser: false,
          },
        ]);
        setLoading(false);
      }
    }, 1200);
  };

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-zinc-900">
      {/* サイドバー */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* メイン */}
      <div className="flex flex-col flex-1 h-full max-w-3xl mx-auto relative">
        {/* ヘッダー */}
        <header className="flex items-center justify-between px-4 py-4 border-b border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 sticky top-0 z-10">
          <div className="flex items-center gap-2">
            <button
              className="text-2xl font-bold px-2 py-1 rounded hover:bg-gray-100 dark:hover:bg-zinc-800"
              onClick={() => setSidebarOpen(true)}
              aria-label="アプリ説明を開く"
            >
              ≡
            </button>
            <h1 className="text-2xl font-bold tracking-tight">無限講義AI</h1>
          </div>
        </header>

        {/* チャットエリア */}
        <main className="flex-1 overflow-y-auto px-4 py-6 bg-gray-50 dark:bg-zinc-900">
          {messages.map((msg, idx) => (
            <ChatMessage key={idx} message={msg.message} isUser={msg.isUser} />
          ))}
          {loading && <ChatMessage message="AIが考え中..." />}
          <div ref={chatEndRef} />
        </main>

        {/* 入力欄 */}
        <div className="w-full">
          <InputForm onSend={handleSend} disabled={loading} />
        </div>
      </div>
    </div>
  );
}
