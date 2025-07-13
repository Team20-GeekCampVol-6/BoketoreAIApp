"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { Lecture } from "@/interface/Lecture";
import Link from "next/link"; // ← 追加：トップページへのリンクのため

export default function MyPage() {
  const [lectures, setLectures] = useState<Lecture[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(async () => {
      const res = await fetch("http://localhost:8000/api/lectures");
      const lecturesData = res.ok ? await res.json() : null;
      console.log(lecturesData);

      setLectures(lecturesData);
      setLoading(false);
    }, 800);
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-white to-gray-100 text-gray-900 p-8">
      {/* タイトルとリンク部分 */}
      <motion.h1
        className="text-5xl font-extrabold mb-6 text-center text-gray-800 drop-shadow-sm"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        あなたがAIに教えた講義履歴
      </motion.h1>
      <div className="flex justify-center mb-10">
        <Link href="/">
          <button className="bg-blue-600 text-white font-semibold px-6 py-2 rounded-lg shadow-md hover:bg-blue-500 transition duration-200">
            ← 講義ページへ戻る
          </button>
        </Link>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="animate-spin w-12 h-12 text-gray-700" />
        </div>
      ) : (
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          {lectures?.length > 0 ? (
            lectures.map((lecture) => (
              <motion.div
                key={lecture.id}
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.2 }}
              >
                <Card className="bg-white border border-gray-300 shadow-md hover:shadow-blue-200 transition-shadow">
                  <CardContent className="p-6 space-y-3">
                    <p className="text-sm text-gray-500">ID: {lecture.id}</p>
                    <h2 className="text-xl font-bold text-pink-600 whitespace-pre-line">
                      {lecture.problem_statement}
                    </h2>
                    <p className="text-gray-800 whitespace-pre-line">
                      <span className="font-semibold text-gray-600">あなたの回答：</span>
                      {lecture.user_answer}
                    </p>
                    <p className="text-gray-800 whitespace-pre-line">
                      <span className="font-semibold text-gray-600">模範解答：</span>
                      {lecture.model_answer}
                    </p>
                    <p className="text-green-600 font-medium">
                      評価：{lecture.evaluation}
                    </p>
                    <p className="text-sm text-blue-700 whitespace-pre-line">
                      AIコメント：{lecture.ai_response}
                    </p>
                    <p className="text-xs text-gray-400">
                      {new Date(lecture.created_at).toLocaleString("ja-JP")}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))
          ) : (
            <p className="text-center col-span-full text-lg">
              履歴がまだありません。
            </p>
          )}
        </motion.div>
      )}
    </main>
  );
}