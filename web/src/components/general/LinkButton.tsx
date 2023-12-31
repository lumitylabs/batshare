import { motion } from "framer-motion";
import ImgComponent from "./manager/img-manager/ImgComponent";

export function LinkButton(props: { link: string }) {
  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      className="inline-flex mt-3 items-center gap-2 justify-center border border-[#DFDFDF] rounded-[6px] px-2 py-1 hover:bg-blue-50 cursor-pointer select-none"
    >
      <ImgComponent name={"link_ic"} type={"icons-navbutton"}></ImgComponent>
      <span
        className="font-BalooDa2 font-medium text-[#2F7DCD] text-[16px]"
        onClick={() => window.open(props.link, "_blank", "noreferrer")}
      >
        {props.link}
      </span>
    </motion.button>
  );
}
