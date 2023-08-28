import { motion } from "framer-motion";

export default function PublishButton() {
  return (
    <div>
      <motion.button
        whileHover={{
          scale: 0.95,
        }}
        transition={{
          duration: 0.2,
        }}
        className="flex  w-[260px] py-[10px] px-4  justify-center rounded-[10px] bg-gradient-to-r shadow-xl from-[#C98AFF] to-[#71BDFF]  hover:from-[#71BDFF] hover:to-[#C98AFF] hover:shadow-lg "
      >
        <span className="font-BalooDa2 font-medium text-[20px] text-white">
          Publish
        </span>
      </motion.button>
    </div>
  );
}
