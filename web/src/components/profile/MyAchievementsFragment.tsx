import React, { useEffect, useState } from "react";
import Divider from "../general/Divider";
import { BorderNFT } from "./BorderNFT";
import SwitchButton from "./SwitchButton";
import { getInventory } from "../../model/calls";
import { useMetaMask } from "../../model/useMetaMask";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'

interface MyAchievementsFragmentProps {
  isOn: boolean;
  handleToggle: () => void;
}

const MyAchievementsFragment: React.FC<MyAchievementsFragmentProps> = (
  props
) => {
  const { wallet } = useMetaMask();
  const [inventory, setInventory] = useState<any>({});
  const [userWallet, setUserWallet] = useState(
    "0x0000000000000000000000000000000000000000"
  );

  useEffect(() => {
    if (wallet.accounts.length > 0) {
      setUserWallet(wallet.accounts[0]);
    }
  }, [wallet]);



  useEffect(() => {
    if(userWallet != "0x0000000000000000000000000000000000000000"){
      getInventory({wallet:userWallet}).then((data:any) => {
        setInventory(data);
      });
    }
    
  }
  , [userWallet]);

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
        {Object.keys(inventory).length === 0
                  ? 
                    Array.from({ length: 3 }, (_, index) => (
                      <Skeleton height={360} width={360} borderRadius={12} key={index}></Skeleton>
                    ))
                  : Object.keys(inventory).map((key) => (
                    <BorderNFT type={"Mint"} img_nft={inventory[key].image} category={inventory[key].category} title={inventory[key].title} round={inventory[key].round}></BorderNFT>
                    ))}
          
          
        </div>
      </div>
    </div>
  );
};

export default MyAchievementsFragment;
