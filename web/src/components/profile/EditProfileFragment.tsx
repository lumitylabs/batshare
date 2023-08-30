import React from "react";
import Divider from "../general/Divider";
import { motion } from "framer-motion";
import { InputAvatarImage } from "./InputAvatarImage";
import InputTextLine from "../new-project/InputTextLine";
import InputLink from "../new-project/InputLink";

interface EditProfileFragmentProps {}

const EditProfileFragment: React.FC<EditProfileFragmentProps> = () => {
  return (
    <div className="flex flex-col border w-full border-gray-300 rounded-[12px] ">
      <div className="flex items-center justify-between px-16 py-10">
        <div className="flex flex-col">
          <h1 className="font-BeVietnamPro font-bold text-[26px] tracking-[-0.04em]">
            Edit Profile
          </h1>
          <h2 className="font-BeVietnamPro font-regular text-[16px] leading-[14px] text-[#828282] tracking-[-0.04em]">
            Add an avatar, nickname, and your social media profiles
          </h2>
        </div>

        <div className="flex gap-2 items-center">
          <motion.button
            whileHover={{ scale: 0.95 }}
            transition={{ ease: "easeInOut", duration: 0.3 }}
            className="h-[53px] w-[200px]  bg-[#636BC1] rounded-[12px] shadow-xl  hover:bg-[#7a82dd] "
          >
            <span className=" text-white text-[20px] px-[60px] py-2  font-BalooDa2 font-regular tracking-[-0.05em]">
              Save
            </span>
          </motion.button>
        </div>
      </div>

      <Divider classParameters={"border-gray-200"}></Divider>

      <div className="flex px-16 py-10 gap-24">
        <div className="flex w-[50%] gap-6">
          <div className="h-[220px] w-[220px]">
            <InputAvatarImage
              setProjectImage={function (): void {
                throw new Error("Function not implemented.");
              }}
            ></InputAvatarImage>
          </div>

          <div className="flex w-[50%] items-center">
            <div className="w-full items-center justify-center">
              <InputTextLine
                placeholder={"Name or nickname"}
                name={"@user"}
                onChange={function (
                  e: React.ChangeEvent<HTMLInputElement>
                ): void {
                  throw new Error("Function not implemented.");
                }}
              ></InputTextLine>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-around w-[30%] ">
          <InputLink
            icon={"email_ic"}
            placeholder={"e-mail"}
            onChange={function (e: React.ChangeEvent<HTMLInputElement>): void {
              throw new Error("Function not implemented.");
            }}
            name={""}
          ></InputLink>

          <InputLink
            icon={"x_ic"}
            placeholder={"@user"}
            onChange={function (e: React.ChangeEvent<HTMLInputElement>): void {
              throw new Error("Function not implemented.");
            }}
            name={""}
          ></InputLink>

          <InputLink
            icon={"instagram_ic"}
            placeholder={"@user"}
            onChange={function (e: React.ChangeEvent<HTMLInputElement>): void {
              throw new Error("Function not implemented.");
            }}
            name={""}
          ></InputLink>

          <InputLink
            icon={"discord_ic"}
            placeholder={"@user"}
            onChange={function (e: React.ChangeEvent<HTMLInputElement>): void {
              throw new Error("Function not implemented.");
            }}
            name={""}
          ></InputLink>
        </div>
      </div>
    </div>
  );
};

export default EditProfileFragment;
