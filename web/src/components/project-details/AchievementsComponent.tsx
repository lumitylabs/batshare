import ImgComponent from "../general/manager/img-manager/ImgComponent";
import { motion } from "framer-motion";
import DonateModal from "./DonateModal";
import { useState } from "react";

export function AchievementsComponent() {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  return (
    <>
      <DonateModal
        modalIsOpen={modalIsOpen}
        setModalIsOpen={setModalIsOpen}
      ></DonateModal>

      <div className="flex flex-col border w-[30%] h-[310px] border-gray-300 px-10 py-5 rounded-[12px]">
        <div className="flex justify-between">
          <span className="font-BeVietnamPro font-bold text-[26px] tracking-[-0.05em]">
            Achievements
          </span>

          <div className="flex items-center gap-1">
            <ImgComponent
              name={"heart_ic"}
              type={"icon-buttons"}
            ></ImgComponent>
            <span className="font-BeVietnamPro font-bold text-[18px] tracking-[-0.05em]">
              4K
            </span>
          </div>
        </div>
        <div className="flex justify-center mb-4 items-center w-[150px] p-1 rounded-full bg-[#D2FFC8]">
          <span className="font-BeVietnamPro font-regular text-[15px] tracking-[-0.05em] text-[#115900]">
            <span className="font-BeVietnamPro font-bold text-[15px] tracking-[-0.05em]">
              12
            </span>{" "}
            days remaining
          </span>
        </div>
        <div className="flex flex-col">
          <div className="flex flex-row">
            <motion.div
              initial={{
                rotateX: 0,
                rotateY: 0,
                scale: 1,
                translateY: 0,
              }}
              whileHover={{
                rotateX: 0,
                rotateY: 5,
                scale: 1.02,
                translateY: -2,
                // Ajuste este valor para tornar o movimento mais sutil
                transition: {
                  duration: 0.3,
                },
              }}
              animate={{
                rotateY: [0, 20, 0, -20, 0],
                scale: [1, 1.01, 1, 1.01, 1],
                translateY: [0, -2, 0, -2, 0], // Ajuste este valor também
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
              }}
              className="relative p-[5px] w-[165px]"
            >
              <div className="absolute inset-0 rounded-[12px] bg-gradient-to-r from-[#C98AFF] via-[rgb(212,242,255)] to-[#71BDFF] shadow-2xl"></div>
              <ImgComponent name={"nft_donate"} type={"nft-donate"} />
            </motion.div>
            <div className="flex flex-col justify-center flex-grow">
              <div className="flex justify-center gap-3 pl-3">
                <div className="flex flex-col w-[48%]">
                  <div className="flex flex-start">
                    <span className="font-BeVietnamPro font-medium text-[#828282] text-[15px] tracking-[-0.04em]">
                      15-Day Raised
                    </span>
                  </div>

                  <div className="flex items-center justify-start border-2 bg-[#FCFCFF] border-[#C98AFF] rounded-[8px]">
                    <div className="flex px-2 items-center justify-center">
                      <ImgComponent
                        name={"batlogo"}
                        type={"icons-button"}
                      ></ImgComponent>
                    </div>

                    <div className="border w-px h-[40px] border-[#C98AFF]"></div>

                    <span className="ml-1 font-BeVietnamPro text-black font-bold text-[20px] tracking-[-0.05em]">
                      30.00
                    </span>
                  </div>
                </div>

                <div className="flex flex-col w-[48%]">
                  <div className="flex flex-start">
                    <span className="font-BeVietnamPro font-medium text-[#828282] text-[15px] tracking-[-0.04em]">
                      Total
                    </span>
                  </div>

                  <div className="flex items-center justify-start border-2 bg-[#FFFDDA] border-[#FFE662] rounded-[8px]  ">
                    <div className="flex px-2 items-center justify-center">
                      <ImgComponent
                        name={"batlogo"}
                        type={"icons-button"}
                      ></ImgComponent>
                    </div>

                    <div className="border w-px h-[40px] border-[#FFE662]"></div>

                    <span className="ml-1 font-BeVietnamPro text-black font-bold text-[20px] tracking-[-0.05em]">
                      30.00
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col">
                <div className="flex justify-center mt-[26px] ml-2">
                  <motion.button
                    onClick={() => setModalIsOpen(true)}
                    whileHover={{
                      scale: 0.95,
                    }}
                    transition={{
                      duration: 0.2,
                    }}
                    className="flex  w-[310px] py-[10px] px-4  justify-center rounded-[10px] bg-gradient-to-r shadow-xl from-[#C98AFF] to-[#71BDFF]  hover:from-[#71BDFF] hover:to-[#C98AFF] hover:shadow-lg "
                  >
                    <span className="font-BalooDa2 font-medium text-[20px] text-white">
                      Donate
                    </span>
                  </motion.button>
                </div>
                <div className="flex mt-1 justify-center">
                  <p className="font-thin italic">
                    Donate and unlock this{" "}
                    <span className="font-bold">NFT</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
