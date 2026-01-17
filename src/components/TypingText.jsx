import { motion } from "framer-motion";

const TypingText = ({ text }) => {
  return (
    <div className="flex items-center overflow-hidden whitespace-nowrap">
      {/* Typing text */}
      <motion.span
        className="inline-block text-[#001489] font-medium text-sm sm:text-base"
        initial={{ width: 0 }}
        animate={{ width: "100%" }}
        transition={{
          duration: text.length * 0.08,
          ease: "linear",
          repeat: Infinity,
          repeatType: "loop",
          repeatDelay: 1.5,
        }}
        style={{
          overflow: "hidden",
          whiteSpace: "nowrap",
        }}
      >
        {text}
      </motion.span>

      {/* Blinking cursor */}
      <motion.span
        className="ml-1 inline-block w-[2px] h-4 bg-[#001489]"
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.8, repeat: Infinity }}
      />
    </div>
  );
};

export default TypingText;
