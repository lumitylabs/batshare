import { motion } from "framer-motion";
import ImgComponent from "../general/manager/img-manager/ImgComponent";

export function UpdateSection() {
  return (
    <div className="flex mt-5 flex-col border border-gray-300 p-10 rounded-[12px]">
      <div className="flex justify-center flex-col">
        <div className="flex items-center gap-2">
          <ImgComponent name={"avatar"} type={"update-avatar"}></ImgComponent>

          <div className="flex justify-between w-full">
            <div className="flex gap-14">
              <div className="flex flex-col">
                <span className="font-BeVietnamPro text-[16px] font-medium leading-[14px] text-[#828282] tracking-[-0.05em]">
                  Update #1
                </span>
                <span className="font-BeVietnamPro text-[20px] font-semibold text[#090808] tracking-[-0.05em]">
                  lucianofbn
                </span>

                <div className="flex gap-1 items-center">
                  <ImgComponent
                    name={"heart_ic"}
                    type={"icon-buttons"}
                  ></ImgComponent>
                  <span className="font-BeVietnamPro font-semibold text-[16px] text-[#878787] tracking-[-0.05em]">
                    2k
                  </span>

                  <div className="inline-flex px-4 py-1 ml-2 bg-[#E8E8E5] rounded-full">
                    <span className="font-BeVietnamPro font-regular text-[16px] text-[#878787] tracking-[-0.05em]">
                      <span className="font-semibold">15</span> days ago
                    </span>
                  </div>
                </div>
              </div>
              {/*gallery*/}
              <div className="flex justify-center items-center gap-2">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  transition={{ ease: "easeInOut", duration: 0.1 }}
                  className="cursor-pointer"
                >
                  <ImgComponent
                    name={"imgdetails"}
                    type={"update-gallery"}
                  ></ImgComponent>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.1 }}
                  transition={{ ease: "easeInOut", duration: 0.1 }}
                  className="cursor-pointer"
                >
                  <ImgComponent
                    name={"imgdetails"}
                    type={"update-gallery"}
                  ></ImgComponent>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.1 }}
                  transition={{ ease: "easeInOut", duration: 0.1 }}
                  className="cursor-pointer"
                >
                  <ImgComponent
                    name={"imgdetails"}
                    type={"update-gallery"}
                  ></ImgComponent>
                </motion.div>
              </div>
            </div>

            <div className="flex flex-col justify-center">
              <div className="flex items-center justify-center">
                <div className="flex border-l mr-[120px] h-[60px] border-gray-300" />
                <div className="flex flex-col gap-2">
                  <span className="text-right font-BeVietnamPro font-regular text-[16px] text-[#878787] tracking-[-0.05em]">
                    Raised
                  </span>
                  <div className="flex items-center gap-2">
                    <ImgComponent
                      name={"batlogo"}
                      type={"bat-icon"}
                    ></ImgComponent>
                    <span className="font-BeVietnamPro text-[24px] font-bold text[#090808] leading-[24px] tracking-[-0.05em]">
                      30
                    </span>
                    <span className="font-BeVietnamPro text-[24px] font-regular text[#4D4A4A] leading-[23px] tracking-[-0.05em]">
                      BAT
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="font-BeVietnamPro mt-6 text-[20px] font-semibold text[#090808] tracking-[-0.05em]">
        Update Title
      </div>
      <div className="flex w-full gap-10 justify-between">
        <div className="flex">
          <p className="font-BeVietnamPro mt-2 font-regular text-[18px] text-[#141414] tracking-[-0.01em]">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
          </p>
        </div>

        <div className="flex">
          <div className="relative w-[180px] h-[180px] rounded-[12px] overflow-hidden shadow-lg">
            <div
              className={`absolute inset-0 bg-gradient-to-tl  from-[#C98AFF] via-[rgb(212,242,255)] to-[#71BDFF] `}
            ></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <ImgComponent name={"nft_donate"} type={"nft-update"} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
