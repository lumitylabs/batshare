import { motion } from "framer-motion";
import ImgComponent from "../general/manager/img-manager/ImgComponent";
import { useInView } from "framer-motion";
import { useRef } from "react";

interface InfoCardProps {
  title: string;
  paragraph: string;
  nameImg: string;
  position: "left" | "right";
}

export function InfoCard({
  title,
  paragraph,
  nameImg,
  position,
}: InfoCardProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const side = position == "left" ? -1 : 1;
  const slide = 250;
  return (
    <div
      ref={ref}
      className="flex gap-20 max-w-[1400px] justify-center items-center"
    >
      <div
        className={`flex gap-6 flex-col max-w-[900px] ${
          position === "left" ? "order-2" : "order-1"
        }`}
      >
        <motion.h2
          className="font-BeVietnamPro font-semibold text-[40px] tracking-[-0.04em]"
          initial={{ opacity: 0, translateX: slide * side }}
          animate={{
            translateX: isInView ? 0 : slide * side,
            opacity: isInView ? 1 : 0,
          }}
          transition={{ ease: "easeInOut", duration: 1.4, delay: 0.03 }}
        >
          {title}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, translateX: slide * side }}
          animate={{
            translateX: isInView ? 0 : slide * side,
            opacity: isInView ? 1 : 0,
          }}
          transition={{ ease: "easeInOut", duration: 1.4, delay: 0.03 }}
          className="font-BeVietnamPro font-regular text-[24px] text-[#303336] tracking-[-0.04em]"
        >
          {paragraph}
        </motion.p>
      </div>
      <motion.div
        initial={{ opacity: 0, translateX: slide * side }}
        animate={{
          translateX: isInView ? 0 : slide * side,
          opacity: isInView ? 1 : 0,
        }}
        transition={{ ease: "easeInOut", duration: 1.4, delay: 0.03 }}
        className={`flex ${position === "left" ? "order-1" : "order-2"}`}
      >
        <ImgComponent name={nameImg} type="info-cards" />
      </motion.div>
    </div>
  );
}
