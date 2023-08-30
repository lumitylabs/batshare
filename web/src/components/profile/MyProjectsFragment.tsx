import React, { useEffect, useState } from "react";
import Divider from "../general/Divider";
import MulticolorComponent from "../general/manager/svg-manager/MulticolorComponent";
import MyProjectCard from "./MyProjectCard";
import { getUserProjects } from "../../model/calls";
import { useMetaMask } from "../../model/useMetaMask";
import Skeleton from "react-loading-skeleton";

interface MyProjectsFragmentProps {}

const MyProjectsFragment: React.FC<MyProjectsFragmentProps> = () => {
  const { wallet } = useMetaMask();
  const [projects, setProjects] = useState<any>({});
  const [userWallet, setUserWallet] = useState(
    "0x0000000000000000000000000000000000000000"
  );

  useEffect(() => {
    if (wallet.accounts.length > 0) {
      setUserWallet(wallet.accounts[0]);
    }
  }, [wallet]);

  useEffect(() => {
    if (userWallet != "0x0000000000000000000000000000000000000000") {
      getUserProjects({ wallet: userWallet }).then((data: any) => {
        setProjects(data);
      });
    }
  }, [userWallet]);

  return (
    <div className="flex flex-col border w-full border-gray-300 rounded-[12px] ">
      <div className="flex items-center justify-between px-16 py-10">
        <div className="flex flex-col">
          <h1 className="font-BeVietnamPro font-bold text-[26px] tracking-[-0.04em]">
            My Projects
          </h1>
          <h2 className="font-BeVietnamPro font-regular text-[16px] leading-[14px] text-[#828282] tracking-[-0.04em]">
            After each round, notify your donors and redeem your Bats
          </h2>
        </div>

        <div className="flex gap-2 items-center">
          <div className="flex items-center gap-3 border py-3 px-[60px] border-gray-300 rounded-[12px] cursor-pointer  hover:bg-blue-50">
            <div>
              <MulticolorComponent
                name={"SearchIcon"}
                baseColor={"#9C9C9C"}
                selectedColor={"#9C9C9C"}
                isSelected={false}
                classParameters={"w-[20px] h-[20px] "}
              ></MulticolorComponent>
            </div>
            <span className="font-BeVietnamPro font-regular text-[16px] leading-[14px] text-[#b4b4b4] tracking-[-0.04em] ">
              Search for a project...
            </span>
          </div>
          <div className="flex border border-gray-300 py-[11px] px-3 rounded-[12px] hover:bg-blue-50 cursor-pointer">
            <MulticolorComponent
              name={"FilterIcon"}
              baseColor={"#9C9C9C"}
              selectedColor={"#9C9C9C"}
              isSelected={false}
              classParameters={"w-[20px] h-[20px] "}
            ></MulticolorComponent>
          </div>
        </div>
      </div>
      <Divider classParameters={"border-gray-200"}></Divider>

      <div className="flex justify-center p-10">
        <div className="grid grid-cols-2 gap-20 w-full mx-auto place-items-center">
          {projects != null && Object.keys(projects).length === 0
            ? Array.from({ length: 2 }, (_, index) => (
                <Skeleton height={320} width={640} borderRadius={12} key={index}></Skeleton>
              ))
            : projects != null && Object.keys(projects).map((key) => (
                <MyProjectCard title={projects[key].title}
                category={projects[key].category} 
                round={projects[key].round}
                donations={projects[key].donations}
                raised={projects[key].raised}
                total={projects[key].total}
                nft_img={projects[key].nft_image}
                  
                ></MyProjectCard>
              ))}
        </div>
      </div>
    </div>
  );
};

export default MyProjectsFragment;
