import React from "react";
import { motion } from 'framer-motion';

type Evaluation = 'perfect' | 'great' | 'good';
type Props = {
  evaluate: Evaluation;
};

const messageMap: Record<Evaluation, string> = {
  perfect: 'o(`･ω´･+o) ﾄﾞﾔｧ…！',
  great: '（￣＾￣）えっへん',
  good: '\( *´∀`* )/わーい'
};

const perfectAnimationVariants = {
  hidden: { opacity: 0, y: -30, scale: 0.8 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring' as const,
      damping: 3,
      stiffness: 3000,
    },
  },
};

const greatAnimationVariants = {
  hidden: { opacity: 0, y: -30, scale: 0.8 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 0.8,
    transition: {
      type: 'spring' as const,
      damping: 5,
      stiffness: 300,
    },
  },
};

const goodAnimationVariants = {
  hidden: { opacity: 0, y: -30, scale: 0.8 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 0.5,
    transition: {
      type: 'spring' as const,
      damping: 8,
      stiffness: 30,
    },
  },
};

const AnimatedMessage = ({ evaluate }: Props) => {
  const message = messageMap[evaluate] || '評価を選択してください';
  if (evaluate === "perfect"){
    return (
      <motion.h1
        key={evaluate}
        style={{ fontSize: '4rem', fontWeight: 'bold' }}
        variants={perfectAnimationVariants}
        initial="hidden"
        animate="visible"
      >
        {message}
      </motion.h1>
    );
  } else if (evaluate === "great") {
    return (
      <motion.h1
        key={evaluate}
        style={{ fontSize: '4rem', fontWeight: 'bold' }}
        variants={greatAnimationVariants}
        initial="hidden"
        animate="visible"
      >
        {message}
      </motion.h1>
    );
  } else if (evaluate === "good") {
    return (
      <motion.h1
        key={evaluate}
        style={{ fontSize: '4rem', fontWeight: 'bold' }}
        variants={goodAnimationVariants}
        initial="hidden"
        animate="visible"
      >
        {message}
      </motion.h1>
    );
  }

  
};

export default AnimatedMessage;
