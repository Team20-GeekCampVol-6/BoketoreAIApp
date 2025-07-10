import React, { useState } from "react";

const Sidebar: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  return (
    <div
      className={`fixed top-0 left-0 h-full w-85 bg-white dark:bg-zinc-900 shadow-lg z-50 transform transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-zinc-700">
        <h2 className="text-xl font-bold">無限講義AIについて</h2>
        <button onClick={onClose} className="text-2xl font-bold">×</button>
      </div>
      <div className="p-4 text-gray-700 dark:text-gray-200 text-sm">
        <p>
          <b>無限講義AI</b>は、あなたが入力したテーマに基づいて、AIが無限にポンコツな回答をしてくるアプリです。<br />
          先生になったつもりで、どんなテーマでもAIに教えてあげましょう！
        </p>
        <ul className="mt-4 list-disc list-inside">
          <li>テーマを入力して送信すると、AIがポンコツな回答を始めます。</li>
          <li>何度でもテーマを変えて楽しめます。</li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
