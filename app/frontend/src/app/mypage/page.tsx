"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { Lecture } from "@/interface/Lecture";

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
    <main className="min-h-screen bg-gradient-to-br from-[#0f0f0f] to-[#1a1a1a] text-white p-8">
      <motion.h1
        className="text-5xl font-extrabold mb-10 text-center text-yellow-300 drop-shadow-lg"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        あなたがAIに教えた講義履歴
      </motion.h1>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="animate-spin w-12 h-12 text-white" />
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
                <Card className="bg-[#222] border border-gray-700 shadow-xl hover:shadow-yellow-400/30 transition-shadow">
                  <CardContent className="p-6 space-y-2">
                    <p className="text-sm text-gray-400">{lecture.id}</p>
                    <h2 className="text-xl font-bold text-pink-400">
                      {lecture.problem_statement}
                    </h2>
                    <p className="text-base text-white">
                      {lecture.user_answer}
                    </p>
                    <p className="text-sm text-emerald-400">
                      評価：{lecture.evaluation}
                    </p>
                    <p className="text-xs text-gray-500">
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
