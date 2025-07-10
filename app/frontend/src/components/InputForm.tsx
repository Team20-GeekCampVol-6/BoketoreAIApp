import React, { useState } from "react";

type InputFormProps = {
  onSend: (message: string) => void;
  disabled?: boolean;
};

const InputForm: React.FC<InputFormProps> = ({ onSend, disabled }) => {
  const [input, setInput] = useState("");

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    onSend(input);
    setInput("");
  };

  return (
    <form
      onSubmit={handleSend}
      className="flex items-center gap-2 w-full px-2 py-2 border-t border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-900"
    >
      <input
        type="text"
        className="flex-1 px-4 py-2 rounded border border-gray-300 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
        placeholder="テーマを入力してください..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        disabled={disabled}
      />
      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
        disabled={disabled || !input.trim()}
      >
        送信
      </button>
    </form>
  );
};

export default InputForm;
