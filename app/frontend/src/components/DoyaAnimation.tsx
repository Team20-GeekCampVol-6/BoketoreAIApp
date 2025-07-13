import React from "react";
import { motion } from "framer-motion";
import { Evaluation } from "@/interface/Lecture";

type Props = {
  evaluate: Evaluation;
};

const messageMap: Record<Evaluation, string> = {
  perfect: "o(`･ω´･+o) ﾄﾞﾔｧ…！",
  great: "（￣＾￣）えっへん",
  good: "( *´∀`* )/わーい",
  bad: "（；^ω^）うーん、もう少し頑張ろう",
};

const animationVariants = {
  hidden: { opacity: 0, y: -30, scale: 0.8 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring" as const,
      damping: 15,
      stiffness: 300,
    },
  },
};

const DoyaAnimation = ({ evaluate }: Props) => {
  const message = messageMap[evaluate] || "評価を選択してください";
  console.log("message:", message);

  return (
    <motion.h1
      key={evaluate}
      className="text-7xl font-bold text-black dark:text-white text-center mb-9"
      variants={animationVariants}
      initial="hidden"
      animate="visible"
    >
      {message}
    </motion.h1>
  );
};

export default DoyaAnimation;
