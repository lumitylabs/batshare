import { motion } from "framer-motion";
import ImgComponent from "../general/manager/img-manager/ImgComponent";
import { useState } from "react";

interface BorderNFTProps {
  type: "Obtained" | "Mint";
  img_nft: string;
}

export function BorderNFT({ type, img_nft }: BorderNFTProps) {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const gradientColors =
    type === "Mint"
      ? "from-[#EAEAEA] to-[#DFDFDF]"
      : "from-[#22ECFF] to-[#C98AFF]";
  const showMintButton = type === "Mint";

  return (
    <div className="relative w-[360px] h-[360px] rounded-[12px] overflow-hidden shadow-lg">
      <div
        className={`absolute inset-0 bg-gradient-to-tl ${gradientColors}`}
      ></div>
      <div className="absolute inset-0 flex items-center justify-center">
        <ImgComponent name={img_nft} type={"nft-achievements"} />
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-1/5 bg-black opacity-30 rounded-b-[12px]"></div>

      <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
        <div className="flex flex-col justify-center pb-[2px]">
          <div className="flex gap-2">
            <span className="font-BeVietnamPro font-regular text-[14px] text-[#fff]/50">
              Enviroment
            </span>
            <span className="font-BeVietnamPro font-regular text-[14px] text-[#fff]/60">
              #12
            </span>
          </div>
          <div className="flex">
            <h2 className="font-BeVietnamPro font-regular text-[16px] leading-[16px]">
              Blockchain & CO2
            </h2>
          </div>
        </div>
      </div>

      {showMintButton && (
        <div className="absolute bottom-1 right-0 p-4">
          <motion.button
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            whileHover={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="flex items-center justify-center bg-white px-6 py-2 rounded-full"
          >
            <span
              className={`font-BalooDa2 font-semibold text-[18px] leading-[18px] tracking-[-0.03em] bg-clip-text text-transparent ${
                isHovered
                  ? "bg-gradient-to-r to-[#7E49AB] from-[#626CC2]"
                  : "bg-gradient-to-r to-[#626CC2] from-[#7E49AB]"
              } hover:to-[#7E49AB] hover:from-[#626CC2] line-clamp-1`}
            >
              MINT
            </span>
          </motion.button>
        </div>
      )}
    </div>
  );
}
