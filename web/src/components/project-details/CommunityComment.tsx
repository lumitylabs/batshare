import ImgComponent from "../general/manager/img-manager/ImgComponent";
import { motion } from "framer-motion";
import Divider from "../general/Divider";

export function CommunityComment() {
  return (
    <div>
      <Divider></Divider>
      <div className="flex p-10 ">
        <div className="flex flex-col w-full gap-10">
          <div className="flex w-full  gap-2">
            <ImgComponent name={"avatar"} type={"update-avatar"}></ImgComponent>
            <div className="flex flex-col pt-6 justify-center w-full gap-2">
              <div className="flex justify-between">
                <div className="flex flex-col">
                  <span className="font-BeVietnamPro text-[16px] font-medium leading-[14px] text-[#828282] tracking-[-0.05em]">
                    Collaborator
                  </span>
                  <span className="font-BeVietnamPro text-[20px] font-semibold text[#090808] tracking-[-0.05em]">
                    lucianofbn
                  </span>
                </div>

                <span className="font-BeVietnamPro font-regular text-[14px] leading-[14px] text-[#878787] tracking-[-0.05em]">
                  <span className="font-semibold leading-[14px]">15</span> days
                  ago
                </span>
              </div>
              <div className="flex flex-col gap-2">
                <p className="font-BeVietnamPro mt-2 font-regular text-[18px] text-[#141414] tracking-[-0.01em]">
                  Utilizing blockchain technology to ensure transparent tracking
                  and management of carbon emissions, the 'Blockchain & CO2'
                  project aims to create a verifiable and secure system to
                  foster accountability and sustainability.
                </p>
                <div className="flex justify-end select-none">
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    whileHover={{ scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-center justify-center w-[100px] border rounded-full py-2 px-6 border-gray-300 hover:bg-gray-50"
                  >
                    <span className="font-BeVietnamPro text-[15px] font-regular text-[#E15050]">
                      Delete
                    </span>
                  </motion.button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
