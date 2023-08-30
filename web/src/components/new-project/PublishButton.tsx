import { motion } from "framer-motion";
import { SpinAnimation } from "../general/SpinAnimation";

export default function PublishButton(props: {
  onClick: any;
  isLoading: boolean;
  status: string;
}) {
  return (
    <div>
      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={props.onClick}
        whileHover={{
          scale: 0.95,
        }}
        transition={{
          duration: 0.2,
        }}
        className={`flex  w-[260px] py-[10px] px-4  justify-center rounded-[10px] bg-gradient-to-r shadow-xl hover:shadow-lg ${
          props.isLoading
            ? "bg-[#d4d4d4]"
            : "from-[#C98AFF] to-[#71BDFF]  hover:from-[#71BDFF] hover:to-[#C98AFF]"
        }`}
      >
        <span className="font-BalooDa2 font-medium text-[20px] text-white flex gap-2 justify-center items-center">
          {props.status}
          {props.isLoading ? <SpinAnimation></SpinAnimation> : <></>}
        </span>
      </motion.button>
    </div>
  );
}
