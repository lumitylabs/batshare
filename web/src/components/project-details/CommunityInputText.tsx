import { ChangeEvent } from "react";
import ImgComponent from "../general/manager/img-manager/ImgComponent";
import InputTextArea from "../new-project/InputTextArea";
import { motion } from "framer-motion";

export function CommunityInputText() {
  return (
    <div className="flex p-10 ">
      <div className="flex flex-col w-full gap-10">
        <div className="flex w-full gap-2">
          <ImgComponent name={"avatar"} type={"update-avatar"}></ImgComponent>
          <div className="flex flex-col pt-6 w-full gap-5">
            <div className="flex flex-col">
              <span className="font-BeVietnamPro text-[16px] font-medium leading-[14px] text-[#828282] tracking-[-0.05em]">
                Collaborator
              </span>
              <span className="font-BeVietnamPro text-[20px] font-semibold text[#090808] tracking-[-0.05em]">
                lucianofbn
              </span>
            </div>

            <div className="flex flex-col gap-2">
              <InputTextArea
                placeholder={
                  "Share your comment or question about the project..."
                }
                name={""}
                onChange={function (e: ChangeEvent<HTMLTextAreaElement>): void {
                  throw new Error("Function not implemented.");
                }}
              ></InputTextArea>
              <div className="flex justify-end">
                <motion.button
                  whileHover={{ scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center shadow-md justify-center w-[100px] border rounded-full py-2 px-6 border-gray-300 hover:bg-blue-50 hover:shadow-sm"
                >
                  Comment
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
