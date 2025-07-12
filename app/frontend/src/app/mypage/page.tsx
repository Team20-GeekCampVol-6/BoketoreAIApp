'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

const mockLectures = [
  {
    id: "lecture_id_789",
    problem_statement: "関ヶ原の戦いって、武田信玄が…",
    user_answer: "いや、その頃には信玄はもういないよ…",
    evaluation: "perfect",
    created_at: "2025-07-05T13:30:00Z"
  },
  {
    id: "lecture_id_456",
    problem_statement: "モナ・リザの作者はピカソですよね！",
    user_answer: "違うよ、レオナルド・ダ・ヴィンチだよ。",
    evaluation: "good",
    created_at: "2025-07-04T18:00:00Z"
  },
  {
    id: "lecture_id_123",
    problem_statement: "地球は平らって本当？",
    user_answer: "いや、地球は丸いよ。科学的に証明されてる。",
    evaluation: "correct",
    created_at: "2025-07-03T09:15:00Z"
  },
  {
    id: "lecture_id_234",
    problem_statement: "電気ってどうやって生まれるの？",
    user_answer: "発電所で燃料や自然エネルギーを使って生み出されるんだ。",
    evaluation: "great",
    created_at: "2025-07-02T10:00:00Z"
  },
  {
    id: "lecture_id_345",
    problem_statement: "日本の首都は大阪？",
    user_answer: "違う、東京が日本の首都だよ。",
    evaluation: "perfect",
    created_at: "2025-07-01T14:00:00Z"
  },
  {
    id: "lecture_id_567",
    problem_statement: "人間の体って何個の骨があるの？",
    user_answer: "大人の体には206個の骨があるよ。",
    evaluation: "good",
    created_at: "2025-07-06T08:45:00Z"
  },
  {
    id: "lecture_id_678",
    problem_statement: "月には空気があるの？",
    user_answer: "ほとんどないから人間は呼吸できないよ。",
    evaluation: "perfect",
    created_at: "2025-07-07T17:30:00Z"
  },
  {
    id: "lecture_id_890",
    problem_statement: "リンゴはなぜ落ちるの？",
    user_answer: "重力のせいで地球に引っ張られて落ちるんだ。",
    evaluation: "perfect",
    created_at: "2025-07-08T19:20:00Z"
  }
];

export default function MyPage() {
  const [lectures, setLectures] = useState<typeof mockLectures | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLectures(mockLectures);
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
                    <h2 className="text-xl font-bold text-pink-400">{lecture.problem_statement}</h2>
                    <p className="text-base text-white">{lecture.user_answer}</p>
                    <p className="text-sm text-emerald-400">評価：{lecture.evaluation}</p>
                    <p className="text-xs text-gray-500">{new Date(lecture.created_at).toLocaleString('ja-JP')}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))
          ) : (
            <p className="text-center col-span-full text-lg">履歴がまだありません。</p>
          )}
        </motion.div>
      )}
    </main>
  );
}