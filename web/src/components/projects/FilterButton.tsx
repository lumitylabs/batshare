import { motion } from "framer-motion";
import ImgComponent from "../general/manager/img-manager/ImgComponent";

export function FilterButton() {
  return (
    <motion.button
      whileHover={{ scale: 0.95 }}
      transition={{ ease: "easeInOut", duration: 0.3 }}
      className="flex justify-center items-center h-[50px] w-[50px] bg-[#fff]/20 rounded-[12px] shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)]"
    >
      <ImgComponent name={"filter_ic"} type={"icons-button"}></ImgComponent>
    </motion.button>
  );
}
