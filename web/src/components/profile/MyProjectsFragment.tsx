import React from "react";
import Divider from "../general/Divider";
import MulticolorComponent from "../general/manager/svg-manager/MulticolorComponent";
import MyProjectCard from "./MyProjectCard";

interface MyProjectsFragmentProps {
  isOn: boolean;
  handleToggle: () => void;
}

const MyProjectsFragment: React.FC<MyProjectsFragmentProps> = () => {
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
          <MyProjectCard
            project={{
              category: "TESTE",
              creator: "teste",
              description: "teste",
              nft_id: "nft_donate",
              nft_image: "nft_donate",
              status: "teste",
              title: "teste",
            }}
            url={""}
          ></MyProjectCard>

          <MyProjectCard
            project={{
              category: "TESTE",
              creator: "teste",
              description: "teste",
              nft_id: "nft_donate",
              nft_image: "nft_donate",
              status: "teste",
              title: "teste",
            }}
            url={""}
          ></MyProjectCard>

          <MyProjectCard
            project={{
              category: "TESTE",
              creator: "teste",
              description: "teste",
              nft_id: "nft_donate",
              nft_image: "nft_donate",
              status: "teste",
              title: "teste",
            }}
            url={""}
          ></MyProjectCard>
        </div>
      </div>
    </div>
  );
};

export default MyProjectsFragment;
