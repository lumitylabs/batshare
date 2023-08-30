import React from "react";
import Divider from "../general/Divider";
import { BorderNFT } from "./BorderNFT";
import SwitchButton from "./SwitchButton";

interface MyAchievementsFragmentProps {
  isOn: boolean;
  handleToggle: () => void;
}

const MyAchievementsFragment: React.FC<MyAchievementsFragmentProps> = (
  props
) => {
  return (
    <div className="flex flex-col border w-full border-gray-300 rounded-[12px] ">
      <div className="flex items-center justify-between px-16 py-10">
        <div className="flex flex-col">
          <h1 className="font-BeVietnamPro font-bold text-[26px] tracking-[-0.04em]">
            Achievements
          </h1>
          <h2 className="font-BeVietnamPro font-regular text-[16px] leading-[14px] text-[#828282] tracking-[-0.04em]">
            Explore your rewards and mint them
          </h2>
        </div>

        <div className="flex gap-2 items-center">
          <span className="font-BeVietnamPro font-regular text-[16px] leading-[14px] text-[#828282] tracking-[-0.04em]">
            See Mint
          </span>
          <SwitchButton isOn={props.isOn} onToggle={props.handleToggle} />
        </div>
      </div>
      <Divider classParameters={"border-gray-200"}></Divider>

      <div className="flex justify-center p-16">
        <div className="grid grid-cols-3 gap-10 w-full mx-auto place-items-center">
          <BorderNFT type={"Mint"} img_nft={"nft_donate"}></BorderNFT>
          <BorderNFT type={"Mint"} img_nft={"nft_donate"}></BorderNFT>
          <BorderNFT type={"Obtained"} img_nft={"nft_donate"}></BorderNFT>
          <BorderNFT type={"Obtained"} img_nft={"nft_donate"}></BorderNFT>
          <BorderNFT type={"Obtained"} img_nft={"nft_donate"}></BorderNFT>
          <BorderNFT type={"Obtained"} img_nft={"nft_donate"}></BorderNFT>
        </div>
      </div>
    </div>
  );
};

export default MyAchievementsFragment;
