import React from "react";

import { motion } from "framer-motion";
import MulticolorComponent from "./manager/svg-manager/MulticolorComponent";

interface ReturnProps {
  currencyPage: string;
}

const Return: React.FC<ReturnProps> = (props) => {
  let title = "";
  let backLocation = "";

  switch (props.currencyPage) {
    case "project-details": {
      title = "Back";
      backLocation = "/";
      break;
    }

    case "new-project": {
      title = "Back";
      backLocation = "/";
      break;
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, delay: 0 }}
      whileHover={{ opacity: 0.5, translateX: -10 }}
      className="inline-flex gap-2 items-center justify-center select-none cursor-pointer font-BeVietnamPro font-medium text-[16px] leading-[14px] text-[#090808] tracking-[-0.05em]"
      onClick={() => {
        window.location.href = backLocation;
      }}
    >
      <MulticolorComponent
        name={"ArrowBackIcon"}
        baseColor="#31323B"
        selectedColor="#31323B"
        isSelected={false}
        classParameters="w-6 h-6"
      />
      {title}
    </motion.div>
  );
};

export default Return;
